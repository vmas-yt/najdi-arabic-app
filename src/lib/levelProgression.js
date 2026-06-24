/**
 * levelProgression.js
 *
 * Two related but separate pieces of logic:
 *
 * 1. English visibility per level (the "fade-out" behavior):
 *    - beginner: always show English. No rolling accuracy, no toggle.
 *    - intermediate: rolling-accuracy-driven by default. A manual toggle
 *      lets the user override this — when the toggle is ON, English is
 *      forced hidden and rolling-accuracy evaluation PAUSES (it keeps
 *      tracking answers in the background but stops being the thing that
 *      decides visibility) until the user turns the toggle back OFF, at
 *      which point rolling accuracy resumes deciding.
 *    - advanced: always Arabic-only. No rolling accuracy, no toggle needed
 *      (English never shows except in wrong-answer explanations).
 *
 * 2. Graduation suggestion (soft, not a hard gate):
 *    A coverage + accuracy check that produces a one-time-per-session
 *    suggestion banner ("you're doing well — want to try the next
 *    level?"). It never blocks access to any level; the person can always
 *    move freely via the level selector. This is intentionally a
 *    suggestion engine, not a gate, per the project's stated goal of
 *    building confidence rather than passing a test.
 */

// ---------------------------------------------------------------------
// 1. Rolling-accuracy English visibility
// ---------------------------------------------------------------------

const ROLLING_WINDOW = 10; // look at the last N answers
const ROLLING_ACCURACY_THRESHOLD = 0.8; // 80% correct in that window -> hide English

/**
 * Given the session's answer history (array of booleans, true = correct,
 * in chronological order) for the current level, decide whether English
 * should currently be visible under the rolling-accuracy rule alone (the
 * manual toggle is applied separately, on top of this).
 *
 * Returns true (show English) until there have been at least
 * ROLLING_WINDOW answers AND the accuracy over the most recent
 * ROLLING_WINDOW answers is at or above the threshold.
 */
export function rollingAccuracyShowsEnglish(answerHistory) {
  if (answerHistory.length < ROLLING_WINDOW) return true;
  const recent = answerHistory.slice(-ROLLING_WINDOW);
  const correctCount = recent.filter(Boolean).length;
  const accuracy = correctCount / recent.length;
  return accuracy < ROLLING_ACCURACY_THRESHOLD;
}

/**
 * Combines level, manual toggle state, and rolling accuracy into the
 * final "should English show right now" decision.
 *
 * @param {string} level - "beginner" | "intermediate" | "advanced"
 * @param {boolean} manualHideEnglish - the user's manual toggle state.
 *   true = user has manually forced English off (toggle "on" in the UI,
 *   meaning "hide English is on").
 * @param {boolean[]} answerHistory - chronological correct/incorrect
 *   record for the current level, current session.
 */
export function shouldShowEnglish(level, manualHideEnglish, answerHistory) {
  if (level === "beginner") return true;
  if (level === "advanced") return false;
  // intermediate
  if (manualHideEnglish) return false; // manual override pauses rolling accuracy
  return rollingAccuracyShowsEnglish(answerHistory);
}

// ---------------------------------------------------------------------
// 2. Graduation suggestion (coverage + accuracy, soft suggestion only)
// ---------------------------------------------------------------------

const GRADUATION_MIN_PER_CATEGORY_CORRECT = 1; // at least 1 correct in every category
const GRADUATION_MIN_TOTAL_ATTEMPTED = 15; // don't suggest too early in a session
const GRADUATION_ACCURACY_THRESHOLD = 0.75; // 75% overall accuracy

/**
 * Given per-category attempt records for the current level, current
 * session, decide whether to show a "ready for the next level?" banner.
 *
 * @param {Object} categoryStats - shape: { [category]: { attempted, correct } }
 * @returns {boolean}
 */
export function shouldSuggestGraduation(categoryStats) {
  const categories = Object.keys(categoryStats);
  if (categories.length === 0) return false;

  let totalAttempted = 0;
  let totalCorrect = 0;
  for (const cat of categories) {
    const { attempted, correct } = categoryStats[cat];
    totalAttempted += attempted;
    totalCorrect += correct;
    if (correct < GRADUATION_MIN_PER_CATEGORY_CORRECT) {
      return false; // coverage requirement not met for this category yet
    }
  }

  if (totalAttempted < GRADUATION_MIN_TOTAL_ATTEMPTED) return false;
  const accuracy = totalCorrect / totalAttempted;
  return accuracy >= GRADUATION_ACCURACY_THRESHOLD;
}

export const NEXT_LEVEL = {
  beginner: "intermediate",
  intermediate: "advanced",
  advanced: null,
};
