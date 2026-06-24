-- Schema for the Najdi Arabic speaking app.
-- Run this in the Supabase SQL editor once your project is created.
--
-- Supabase's built-in `auth.users` table already handles sign-up/sign-in,
-- so we don't need our own users table — just a profile/progress table
-- that references it.

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  current_level text default 'beginner' check (current_level in ('beginner', 'intermediate', 'advanced')),
  created_at timestamp with time zone default now()
);

create table if not exists public.progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  level text not null check (level in ('beginner', 'intermediate', 'advanced')),
  question_id text not null,
  correct boolean not null,
  pronunciation_score numeric,
  answered_at timestamp with time zone default now()
);

create table if not exists public.level_stats (
  user_id uuid references auth.users on delete cascade not null,
  level text not null check (level in ('beginner', 'intermediate', 'advanced')),
  questions_attempted integer default 0,
  questions_correct integer default 0,
  avg_pronunciation_score numeric,
  updated_at timestamp with time zone default now(),
  primary key (user_id, level)
);

-- Row Level Security: users can only see/edit their own data.
alter table public.profiles enable row level security;
alter table public.progress enable row level security;
alter table public.level_stats enable row level security;

create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can view own progress" on public.progress
  for select using (auth.uid() = user_id);
create policy "Users can insert own progress" on public.progress
  for insert with check (auth.uid() = user_id);

create policy "Users can view own level stats" on public.level_stats
  for select using (auth.uid() = user_id);
create policy "Users can insert own level stats" on public.level_stats
  for insert with check (auth.uid() = user_id);
create policy "Users can update own level stats" on public.level_stats
  for update using (auth.uid() = user_id);
