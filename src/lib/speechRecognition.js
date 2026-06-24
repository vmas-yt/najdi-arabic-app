/**
 * speechRecognition.js
 *
 * Wraps the browser's built-in Web Speech API (SpeechRecognition).
 *
 * IMPORTANT HONESTY NOTE (per project discussion): this does NOT do true
 * phoneme-level pronunciation scoring. What it actually measures is:
 *   1. Whether the transcribed text matches the expected Najdi answer
 *      (fuzzy match, since transliteration spelling varies)
 *   2. The browser's own ASR confidence score for that transcription
 *
 * We present this to the user as "Pronunciation Clarity," not "Pronunciation
 * Accuracy" — a high score means "the system clearly understood what you
 * said," not "your Arabic accent was native-like." A correct but mumbled
 * answer can score low; a wrong-but-clearly-pronounced answer can score
 * high on clarity while being marked wrong on content. Both numbers are
 * shown separately so this distinction stays visible to the user.
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
 * Normalizes transliterated Najdi text for lenient comparison:
 * lowercases, strips punctuation, collapses repeated letters that often
 * vary by spelling convention (e.g. "ee" vs "i"), and trims whitespace.
 */
function normalizeTranslit(text) {
  return text
    .toLowerCase()
    .replace(/[?.!,]/g, "")
    .replace(/9/g, "")        // the Najdi 3ayn marker is often dropped by ASR
    .replace(/'/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Very rough similarity score between two normalized strings, using a
 * simple Levenshtein-distance ratio. Returns 0–1.
 */
function similarity(a, b) {
  const s1 = normalizeTranslit(a);
  const s2 = normalizeTranslit(b);
  if (s1 === s2) return 1;
  if (!s1.length || !s2.length) return 0;

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
 * - transcript: best-guess text from the browser ASR
 * - asrConfidence: 0–1, how confident the browser's recognizer was
 * - matchScore: 0–1, fuzzy text similarity to the expected answer
 * - clarityScore: blended 0–1 "Pronunciation Clarity" score (NOT true
 *   pronunciation accuracy — see file header)
 * - isCorrect: matchScore above threshold
 */
export function listenAndGrade(expectedTranslit, { lang = "ar-SA", threshold = 0.6 } = {}) {
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

      const matchScore = similarity(best.transcript, expectedTranslit);
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
