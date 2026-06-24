import { useEffect, useMemo, useState } from "react";
import { beginnerQuestions } from "../data/questionBank.beginner";
import { intermediateQuestions } from "../data/questionBank.intermediate";
import { listenAndGrade, speechRecognitionSupported } from "../lib/speechRecognition";
import { recordAnswer } from "../lib/progress";
import { useAuth } from "../context/AuthContext";
import { shouldShowEnglish, shouldSuggestGraduation, NEXT_LEVEL } from "../lib/levelProgression";

// Per-level English-visibility rule — see levelProgression.js for the full
// logic. Summary: beginner always shows English; advanced never does;
// intermediate is driven by rolling accuracy over the last 10 answers,
// with a manual toggle that overrides (and pauses) that rolling logic.
const QUESTION_BANKS = {
  beginner: beginnerQuestions,
  intermediate: intermediateQuestions,
  advanced: [], // populated in a later pass
};

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz({ level, onBackToLevels, onAdvanceLevel }) {
  const { user } = useAuth();
  const questions = useMemo(() => shuffle(QUESTION_BANKS[level] || []), [level]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [speakResult, setSpeakResult] = useState(null);
  const [listening, setListening] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);

  // Rolling-accuracy + manual-toggle English visibility (intermediate only;
  // see levelProgression.js). answerHistory is chronological, this session,
  // this level only — resets if the user changes level and comes back.
  const [answerHistory, setAnswerHistory] = useState([]);
  const [manualHideEnglish, setManualHideEnglish] = useState(false);

  // Graduation suggestion (soft, coverage + accuracy based; see
  // levelProgression.js). categoryStats accumulates this session.
  const [categoryStats, setCategoryStats] = useState({});
  const [graduationDismissed, setGraduationDismissed] = useState(false);

  const q = questions[index];

  const showEnglish = shouldShowEnglish(level, manualHideEnglish, answerHistory);
  const nextLevel = NEXT_LEVEL[level];
  const showGraduationBanner =
    nextLevel && !graduationDismissed && shouldSuggestGraduation(categoryStats);

  useEffect(() => {
    setSelected(null);
    setAnswered(false);
    setSpeakResult(null);
  }, [index]);

  // Reset per-level session tracking when the level changes.
  useEffect(() => {
    setAnswerHistory([]);
    setManualHideEnglish(false);
    setCategoryStats({});
    setGraduationDismissed(false);
  }, [level]);

  if (!q) {
    return (
      <div className="quiz-done">
        <h2>No questions available for this level yet.</h2>
        <button onClick={onBackToLevels}>Back to levels</button>
      </div>
    );
  }

  function trackAnswer(correct, category) {
    setAnswerHistory((h) => [...h, correct]);
    setCategoryStats((stats) => {
      const prev = stats[category] || { attempted: 0, correct: 0 };
      return {
        ...stats,
        [category]: {
          attempted: prev.attempted + 1,
          correct: prev.correct + (correct ? 1 : 0),
        },
      };
    });
  }

  function handleMcqSelect(i) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    const correct = i === q.correctIndex;
    setSessionTotal((t) => t + 1);
    if (correct) setSessionCorrect((c) => c + 1);
    trackAnswer(correct, q.category);
    recordAnswer({
      userId: user?.id,
      level,
      questionId: q.id,
      correct,
    });
  }

  async function handleSpeak() {
    if (!speechRecognitionSupported) {
      setSpeakResult({ error: "Speech recognition isn't supported in this browser. Try Chrome or Edge." });
      return;
    }
    setListening(true);
    try {
      const result = await listenAndGrade(q.expectedAnswer.ar, { lang: "ar-SA" });
      setSpeakResult(result);
      setAnswered(true);
      setSessionTotal((t) => t + 1);
      if (result.isCorrect) setSessionCorrect((c) => c + 1);
      trackAnswer(result.isCorrect, q.category);
      recordAnswer({
        userId: user?.id,
        level,
        questionId: q.id,
        correct: result.isCorrect,
        pronunciationScore: result.clarityScore,
      });
    } catch (err) {
      setSpeakResult({ error: err.message });
    } finally {
      setListening(false);
    }
  }

  function handleNext() {
    setIndex((i) => (i + 1) % questions.length);
  }

  function handleSkip() {
    // Skipping does not count as an attempt — no history/stats change.
    setIndex((i) => (i + 1) % questions.length);
  }

  const isCorrect =
    q.type === "speaking" ? speakResult?.isCorrect : selected === q.correctIndex;

  return (
    <div className="quiz">
      <div className="quiz-topbar">
        <button className="link-button" onClick={onBackToLevels}>
          ← Change level
        </button>
        <div className="quiz-topbar-right">
          {level === "intermediate" && (
            <label className="english-toggle">
              <input
                type="checkbox"
                checked={manualHideEnglish}
                onChange={(e) => setManualHideEnglish(e.target.checked)}
              />
              Hide English manually
            </label>
          )}
          <span className="quiz-progress">
            {sessionCorrect}/{sessionTotal} correct this session
          </span>
        </div>
      </div>

      {showGraduationBanner && (
        <div className="graduation-banner">
          <p>
            You're doing well at this level — want to try{" "}
            <strong>{nextLevel}</strong>?
          </p>
          <div className="graduation-banner-actions">
            <button
              className="next-button"
              onClick={() => onAdvanceLevel && onAdvanceLevel(nextLevel)}
            >
              Try {nextLevel}
            </button>
            <button className="link-button" onClick={() => setGraduationDismissed(true)}>
              Not yet, keep practicing here
            </button>
          </div>
        </div>
      )}

      <div className="quiz-card">
        <span className="quiz-category">{q.category.replaceAll("_", " ")}</span>

        {/* PROMPT */}
        <div className="quiz-prompt">
          {q.prompt.ar && <p className="arabic-text">{q.prompt.ar}</p>}
          {q.prompt.translit && <p className="translit-text">{q.prompt.translit}</p>}
          {(showEnglish || !q.prompt.ar) && q.prompt.en && (
            <p className="english-text">{q.prompt.en}</p>
          )}
        </div>

        {/* MCQ / READING */}
        {(q.type === "mcq" || q.type === "reading") && (
          <div className="quiz-options">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              const isRight = answered && i === q.correctIndex;
              const isWrongPick = answered && isSelected && i !== q.correctIndex;
              return (
                <button
                  key={i}
                  className={`quiz-option ${isRight ? "correct" : ""} ${
                    isWrongPick ? "incorrect" : ""
                  }`}
                  onClick={() => handleMcqSelect(i)}
                  disabled={answered}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {/* SPEAKING */}
        {q.type === "speaking" && (
          <div className="quiz-speaking">
            <button onClick={handleSpeak} disabled={listening || answered} className="mic-button">
              {listening ? "Listening..." : answered ? "Answered" : "🎤 Tap to speak"}
            </button>
            {!answered && (
              <button onClick={handleSkip} className="link-button skip-button">
                Skip for now
              </button>
            )}

            {speakResult?.error && <div className="notice notice-error">{speakResult.error}</div>}

            {speakResult && !speakResult.error && (
              <div className="speak-result">
                <p>You said: "{speakResult.transcript || "(nothing recognized)"}"</p>
                <p className="clarity-score">
                  Pronunciation Clarity: {Math.round(speakResult.clarityScore * 100)}%
                  <span className="clarity-note">
                    {" "}
                    (how clearly the system understood you — not a full accent score)
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* FEEDBACK */}
        {answered && (
          <div className={`feedback ${isCorrect ? "feedback-correct" : "feedback-incorrect"}`}>
            <p className="feedback-headline">{isCorrect ? "✓ Correct!" : "✗ Not quite"}</p>

            {q.type === "speaking" && (
              <p className="expected-answer">
                Expected: <span className="arabic-text">{q.expectedAnswer.ar}</span>{" "}
                <span className="translit-text">({q.expectedAnswer.translit})</span>
                {showEnglish && <span className="english-text"> — {q.expectedAnswer.en}</span>}
              </p>
            )}

            {!isCorrect && (
              <div className="explanation">
                <p className="english-text">{q.explanation.en}</p>
                <p className="arabic-text">{q.explanation.ar}</p>
              </div>
            )}
            {/* Beginner level: always show explanation bilingually, even on correct answers */}
            {isCorrect && showEnglish && (
              <div className="explanation explanation-muted">
                <p className="english-text">{q.explanation.en}</p>
                <p className="arabic-text">{q.explanation.ar}</p>
              </div>
            )}

            <button className="next-button" onClick={handleNext}>
              Next question →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
