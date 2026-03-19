-- =============================================================
-- Hicham Nostik Live Q&A — Supabase Schema
-- Run this in the Supabase SQL Editor to set up the database.
-- =============================================================

-- 1. Questions table
create table if not exists public.questions (
  id          uuid primary key default gen_random_uuid(),
  content     text not null,
  topic       text not null default 'other',
  gender      text not null default 'other',
  is_vip      boolean not null default false,
  status      text not null default 'unread' check (status in ('unread', 'read', 'answered')),
  created_at  timestamptz not null default now()
);

create index if not exists questions_created_at_idx on public.questions (created_at desc);

alter table public.questions enable row level security;

create policy "anon_insert_only"
  on public.questions for insert to anon with check (true);

create policy "admin_select"
  on public.questions for select to authenticated using (true);

create policy "admin_update"
  on public.questions for update to authenticated using (true) with check (true);

create policy "admin_delete"
  on public.questions for delete to authenticated using (true);

-- 2. Settings table (admin-configurable key-value store)
create table if not exists public.settings (
  key   text primary key,
  value text not null
);

insert into public.settings (key, value)
  values ('max_length', '250')
  on conflict (key) do nothing;

alter table public.settings enable row level security;

create policy "anyone_can_read_settings"
  on public.settings for select to anon, authenticated using (true);

create policy "admin_update_settings"
  on public.settings for update to authenticated using (true) with check (true);

-- 3. Sessions table (Live Sessions Redesign)
create table if not exists public.sessions (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  is_active   boolean not null default false,
  created_at  timestamptz not null default now(),
  closed_at   timestamptz
);

create index if not exists sessions_created_at_idx on public.sessions (created_at desc);

alter table public.sessions enable row level security;
create policy "anyone_can_read_sessions"
  on public.sessions for select to anon, authenticated using (true);
create policy "admin_all_sessions"
  on public.sessions for all to authenticated using (true) with check (true);

-- Link questions to sessions
-- Note: existing rows will have session_id = null
alter table public.questions add column if not exists session_id uuid references public.sessions(id);
create index if not exists questions_session_id_idx on public.questions(session_id);
