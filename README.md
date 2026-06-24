# Speaking Najdi — practice app

A web app for practicing spoken Najdi Arabic: multiple choice, reading
comprehension, and speaking questions, with level-based bilingual feedback.
Companion to the "Speaking Najdi" book — same color palette (DEEP_TEAL,
GOLD, RUST), same teaching philosophy (walk through the pattern, don't just
show a table).

## Current status: Beginner level only

Per the agreed v1 scope, only the **Beginner** level has a real question
bank right now (32 questions across vocabulary, verbs+pronouns,
nouns/adjectives+pronouns, and tenses — all three question types: MCQ,
reading, speaking). Intermediate and Advanced are wired into the level
selector and quiz engine already, but have empty question banks
(`QUESTION_BANKS.intermediate = []` in `src/components/Quiz.jsx`) until
Beginner is confirmed solid.

Every grammar fact behind these questions (verb prefixes a-/ti-/yi-/ni-,
suffixes -een/-oon, the eight possessive suffixes, adjective gender
agreement) is taken directly from the book's already-verified content in
Chapters 1, 5, and 6. The specific questions, sentences, and vocabulary are
newly written for the app and do not duplicate the book's own examples.

## What's real vs. what needs your setup

**Works right now, no setup needed:**
- Full quiz flow: MCQ, reading, and speaking question types
- Level selection and switching
- Bilingual feedback logic (Beginner always shows English)
- Speech recognition via the browser's Web Speech API (Chrome/Edge only —
  Safari and Firefox don't support it)

**Needs your Supabase project to work:**
- Sign-up / sign-in
- Saving progress across sessions/devices

Until you create a Supabase project and fill in `.env`, the app skips
straight past the sign-in screen and lets you click through everything —
useful for testing, but nothing is actually saved.

## Setting up Supabase (free)

1. Go to [supabase.com](https://supabase.com) and sign up (free, no credit
   card needed for the free tier).
2. Create a new project. Pick any name/region; remember the database
   password it asks you to set (you likely won't need it directly, but
   keep it somewhere safe).
3. Once the project is ready, go to **Settings → API** in the left
   sidebar. Copy the **Project URL** and the **anon public** key.
4. In this project folder, copy `.env.example` to `.env` and paste those
   two values in:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
5. In the Supabase dashboard, go to the **SQL Editor**, paste in the
   contents of `supabase_schema.sql` from this folder, and run it. This
   creates the `profiles`, `progress`, and `level_stats` tables with
   row-level security so users can only see their own data.
6. Restart the dev server (`npm run dev`) if it was already running, so it
   picks up the new `.env` values.

That's it — sign-up/sign-in and progress-saving will now work for real.

## Running locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Deploying for free (Vercel)

We'll do this together when you're ready — broad strokes:
1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com), sign up with your GitHub
   account, and import the repository.
3. Vercel auto-detects it's a Vite app — no config needed.
4. Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as
   Environment Variables in the Vercel project settings (same values as
   your `.env` file — Vercel doesn't read `.env` files from the repo for
   security reasons, you re-enter them in their dashboard).
5. Deploy. You get a free `*.vercel.app` URL.

## On the pronunciation scoring (read this before trusting the number)

The "Pronunciation Clarity" score shown after a speaking question is
**not** a true accent/pronunciation accuracy score. It's a blend of:
- how closely your transcribed speech matched the expected answer (70%
  weight)
- the browser's own confidence in its transcription (30% weight)

This tells you "how clearly the system understood you," not "how native
your Najdi accent sounded." A correct but mumbled answer can score low; a
wrong-but-clearly-enunciated answer can score high on clarity while still
being marked wrong on content. Real phoneme-level pronunciation scoring
(like dedicated language apps use) needs a different, usually paid,
service — see "If browser ASR proves too unreliable" below.

Also worth knowing: browser speech recognition is trained mostly on
Modern Standard Arabic and major dialects, not Najdi specifically.
Najdi-specific sounds may not transcribe cleanly. We use lenient/fuzzy
text matching to reduce false "wrong" results, but this is a real
limitation, not a solved problem.

### If browser ASR proves too unreliable

Fallback path, not yet implemented: send the recorded audio to a hosted
Whisper API instead of relying on the browser's built-in recognizer.
Whisper tends to handle Arabic dialects better, but it costs a small
amount per request (not free) and needs a backend endpoint to call it from
(can't call most paid APIs directly from the browser safely, since that
would expose your API key). Cross this bridge only if testing shows the
free browser-based approach isn't good enough.

## Open design questions (need your input before building further)

### 1. Intermediate level: when does English fade out?

The quiz engine has a placeholder (`showEnglish` in `Quiz.jsx`) that
currently always shows English for every level except Advanced. Ideas for
a real Intermediate threshold, to discuss:

- **Streak-based**: English shows by default; after N correct answers in
  a row (e.g. 5), English hides for the rest of the session. Resets if the
  user gets one wrong.
- **Rolling-accuracy-based**: track accuracy over the last N questions
  (e.g. last 10); once it crosses a threshold (e.g. 80%), switch to
  Arabic-only for the rest of that session.
- **Category-based**: English fades out one category at a time as the
  user shows mastery in it (e.g. vocabulary goes Arabic-only first, while
  tenses still shows English, since tenses are harder).
- **Manual toggle**: let the user turn English off themselves whenever
  they feel ready, with the app suggesting it once a threshold is hit
  rather than forcing it.

My instinct is rolling-accuracy-based is the most honest signal (streaks
are easy to get lucky on, manual toggle doesn't push anyone), but this is
your call.

### 2. "Graduating" a level — moving from Beginner to Intermediate

Not yet implemented. Ideas to discuss:

- **Volume + accuracy threshold**: e.g. answer at least 40 questions at
  this level with ≥80% accuracy.
- **Coverage-based**: must get at least one question correct in every
  category at this level (not just a raw accuracy number, so someone can't
  "graduate" while still weak in one category).
- **Spaced-repetition-based**: track per-question-type mastery over time
  (not just a single session), only count a question as "mastered" once
  answered correctly on 2+ separate days, not just once.
- **No hard gate at all**: let users move between levels freely (already
  true in the current build), and treat "graduation" as a soft suggestion
  ("You're doing well here — want to try Intermediate?") rather than a
  lock.

Given the app's stated goal is confidence and fluency rather than passing
a test, I'd lean toward the soft-suggestion model with a coverage+accuracy
check behind the suggestion — but again, your call once Beginner content
is validated with real use.

### 3. Advanced level's long-sentence questions

Not yet built. Once Beginner is confirmed solid, Advanced will need a
distinct question subtype for full-sentence production (not just
single-word/short-phrase answers), likely graded more leniently on exact
wording and more strictly on whether the core grammar (tense, agreement)
is right.
