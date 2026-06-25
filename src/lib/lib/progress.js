import { supabase, supabaseConfigured } from "../lib/supabaseClient";

/**
 * Records a single answered question. Silently no-ops if Supabase isn't
 * configured yet (e.g. during local development before deployment), so the
 * quiz flow still works without a backend connected.
 */
export async function recordAnswer({ userId, level, questionId, correct, pronunciationScore }) {
  if (!supabaseConfigured || !userId) return { skipped: true };

  const { error } = await supabase.from("progress").insert({
    user_id: userId,
    level,
    question_id: questionId,
    correct,
    pronunciation_score: pronunciationScore ?? null,
  });
  if (error) console.error("Failed to record answer:", error);
  return { skipped: false, error };
}

/**
 * Fetches summary stats per level for the current user (questions
 * attempted, correct count, running accuracy) — used to decide whether a
 * user has "graduated" a level. See README for graduation criteria options.
 */
export async function fetchLevelProgress(userId, level) {
  if (!supabaseConfigured || !userId) {
    return { attempted: 0, correct: 0, accuracy: 0 };
  }

  const { data, error } = await supabase
    .from("progress")
    .select("correct")
    .eq("user_id", userId)
    .eq("level", level);

  if (error) {
    console.error("Failed to fetch progress:", error);
    return { attempted: 0, correct: 0, accuracy: 0 };
  }

  const attempted = data.length;
  const correct = data.filter((r) => r.correct).length;
  const accuracy = attempted > 0 ? correct / attempted : 0;
  return { attempted, correct, accuracy };
}

/** Updates the user's currently-selected level in their profile. */
export async function setCurrentLevel(userId, level) {
  if (!supabaseConfigured || !userId) return;
  const { error } = await supabase
    .from("profiles")
    .upsert({ id: userId, current_level: level });
  if (error) console.error("Failed to set current level:", error);
}
