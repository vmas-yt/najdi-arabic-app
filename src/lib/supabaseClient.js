import { createClient } from "@supabase/supabase-js";

// These come from environment variables so real keys are never committed to
// source control. Until you create a real Supabase project, these will be
// undefined and auth/progress-saving will not work — the rest of the app
// (question flow, ASR, feedback) still works fine without them.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = supabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
