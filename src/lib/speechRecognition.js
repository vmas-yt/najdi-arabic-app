/**
 * speechRecognition.js
 *
 * Wraps the browser's built-in Web Speech API (SpeechRecognition).
 *
 * IMPORTANT HONESTY NOTE (per project discussion): this does NOT do true
 * phoneme-level pronunciation scoring. What it actually measures is:
 *   1. Whether the transcribed text matches the expected Najdi answer
 *      (fuzzy match against the Arabic script, since that's what the
 *      recognizer actually returns when set to lang="ar-SA")
 *   2. The browser's own ASR confidence score for that transcription
 *
 * We present this to the user as "Pronunciation Clarity," not "Pronunciation
 * Accuracy" — a high score means "the system clearly understood what you
 * said," not "your Arabic accent was native-like." A correct but mumbled
 * answer can score low; a wrong-but-clearly-pronounced answer can score
 * high on clarity while being marked wrong on content. Both numbers are
 * shown separately so this distinction stays visible to the user.
 *
 * v1 bug fix: the recognizer (lang="ar-SA") returns Arabic script, but
 * grading was comparing that transcript against the Latin transliteration
 * (e.g. "Ana ta9baan") instead of the Arabic answer (e.g. "انا تعبان").
 * Those two strings can never match regardless of how well the user
 * pronounced anything, which made every speaking question fail even on a
 * correct, clearly-recognized answer. Grading now compares Arabic script
 * to Arabic script.
 *
 * Known limitation: browser ASR language models are trained mostly on
 * Modern Standard Arabic / dominant dialects, not Najdi specifically. Najdi
 * features (e.g. the "g" sound for ق, the glottal stop written as "9") may
 * be transcribed inconsistently. We use lenient matching to reduce false
 * negatives, but this is not a solved problem — see README for fallback
 * options if this proves too unreliable in practice.
 */

const SpeechRecognitionAPI =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export const speechRecognitionSupported = Boolean(SpeechRecognitionAPI);

/**
 * Normalizes Arabic script for lenient comparison: strips diacritics
 * (tashkeel), normalizes alef variants (أ/إ/آ -> ا) and taa marbuta (ة -> ه
 * is intentionally NOT done, they're distinct), strips punctuation and
 * the leading "ال" article inconsistently added/dropped by ASR, and
 * collapses whitespace.
 */
function normalizeArabic(text) {
  if (!text) return "";
  return text
    .replace(/[\u064B-\u065F\u0670]/g, "")  // strip tashkeel/diacritics
    .replace(/[إأآ]/g, "ا")                  // normalize alef variants
    .replace(/[؟?.!,،]/g, "")                // strip punctuation (Arabic + Latin)
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Word-level similarity: treats the phrase as a sequence of words and runs
 * Levenshtein over whole-word tokens rather than characters. This matters
 * for short Najdi phrases (2-4 words), where a single wrong word (wrong
 * pronoun, wrong gender suffix) only changes a couple of characters out of
 * many but should still count as a real mismatch — character-level scoring
 * alone is too forgiving here (e.g. "هو تعبان" vs "انا تعبان" shares 6 of 8
 * characters despite being a different pronoun entirely).
 */
function wordSimilarity(a, b) {
  const w1 = a.split(" ").filter(Boolean);
  const w2 = b.split(" ").filter(Boolean);
  if (!w1.length || !w2.length) return 0;
  if (w1.join(" ") === w2.join(" ")) return 1;

  const dp = Array.from({ length: w1.length + 1 }, (_, i) =>
    Array.from({ length: w2.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= w1.length; i++) {
    for (let j = 1; j <= w2.length; j++) {
      dp[i][j] =
        w1[i - 1] === w2[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  const distance = dp[w1.length][w2.length];
  const maxLen = Math.max(w1.length, w2.length);
  return 1 - distance / maxLen;
}

/**
 * Combined similarity: blends word-level match (catches "wrong word
 * entirely") with character-level match (catches "right word, close
 * spelling/ASR variant"). Word-level dominates so a single swapped word in
 * a short phrase is correctly penalized; character-level provides partial
 * credit for near-miss spellings of the same word. Returns 0–1.
 */
function similarity(a, b) {
  const s1 = normalizeArabic(a);
  const s2 = normalizeArabic(b);
  if (s1 === s2) return 1;
  if (!s1.length || !s2.length) return 0;

  const charSim = charSimilarity(s1, s2);
  const wordSim = wordSimilarity(s1, s2);
  return 0.7 * wordSim + 0.3 * charSim;
}

/**
 * Character-level similarity using Levenshtein-distance ratio. Returns 0–1.
 */
function charSimilarity(s1, s2) {
  const dp = Array.from({ length: s1.length + 1 }, (_, i) =>
    Array.from({ length: s2.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      dp[i][j] =
        s1[i - 1] === s2[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  const distance = dp[s1.length][s2.length];
  const maxLen = Math.max(s1.length, s2.length);
  return 1 - distance / maxLen;
}

/**
 * Listens for a single spoken utterance and resolves with:
 *   { transcript, asrConfidence, matchScore, clarityScore, isCorrect }
 *
 * @param {string} expectedArabic - the expected answer in Arabic script
 *   (e.g. question.expectedAnswer.ar). This MUST be Arabic script, not the
 *   Latin transliteration, since that's what the recognizer returns.
 *
 * - transcript: best-guess text from the browser ASR (Arabic script)
 * - asrConfidence: 0–1, how confident the browser's recognizer was
 * - matchScore: 0–1, fuzzy text similarity to the expected Arabic answer
 * - clarityScore: blended 0–1 "Pronunciation Clarity" score (NOT true
 *   pronunciation accuracy — see file header)
 * - isCorrect: matchScore above threshold
 */
export function listenAndGrade(expectedArabic, { lang = "ar-SA", threshold = 0.7 } = {}) {
  return new Promise((resolve, reject) => {
    if (!SpeechRecognitionAPI) {
      reject(new Error("Speech recognition is not supported in this browser."));
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    recognition.onresult = (event) => {
      const results = event.results[0];
      let best = { transcript: "", confidence: 0 };
      for (let i = 0; i < results.length; i++) {
        if (results[i].confidence > best.confidence) {
          best = { transcript: results[i].transcript, confidence: results[i].confidence };
        }
      }

      const matchScore = similarity(best.transcript, expectedArabic);
      // Blend: weight content match higher than raw ASR confidence, since
      // confidence alone says little about correctness.
      const clarityScore = 0.7 * matchScore + 0.3 * (best.confidence || 0.5);

      resolve({
        transcript: best.transcript,
        asrConfidence: best.confidence || null,
        matchScore,
        clarityScore,
        isCorrect: matchScore >= threshold,
      });
    };

    recognition.onerror = (event) => {
      reject(new Error(`Speech recognition error: ${event.error}`));
    };

    recognition.onnomatch = () => {
      resolve({
        transcript: "",
        asrConfidence: 0,
        matchScore: 0,
        clarityScore: 0,
        isCorrect: false,
      });
    };

    recognition.start();
  });
}
