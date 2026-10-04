create extension if not exists pgcrypto;

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(trim(full_name)) between 2 and 100),
  email text not null unique check (email = lower(trim(email)) and char_length(email) <= 254),
  phone text not null check (char_length(phone) between 10 and 20),
  college text not null check (char_length(trim(college)) between 2 and 150),
  branch text not null check (char_length(trim(branch)) between 2 and 100),
  graduation_year integer not null check (graduation_year between 2025 and 2032),
  source text,
  campus_code text,
  referral_code text not null unique check (referral_code ~ '^AI60-[A-Z0-9]{9}$'),
  referred_by text references public.registrations(referral_code),
  created_at timestamptz not null default now(),
  constraint no_self_referral check (referred_by is null or referred_by <> referral_code)
);

create index if not exists registrations_referred_by_idx on public.registrations(referred_by);
create index if not exists registrations_created_at_idx on public.registrations(created_at);
create index if not exists registrations_college_idx on public.registrations(college);

alter table public.registrations enable row level security;
-- No anon/authenticated policies: personal records are accessed only by the server with its service role key.
revoke all on public.registrations from anon, authenticated;
