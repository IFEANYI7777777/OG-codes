-- 1. Auth: managed by Supabase Auth; no extra table required here.

-- 2. Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 3. Portfolios
create table if not exists public.portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  slug text unique not null,
  title text not null,
  data jsonb not null default '{}'::jsonb,
  published boolean default false,
  views bigint default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.portfolios enable row level security;

create policy "Public portfolios readable"
  on public.portfolios for select
  using (published = true);

create policy "Users manage own portfolios"
  on public.portfolios for all
  using (auth.uid() = user_id);

-- 4. Analytics events
create table if not exists public.analytics (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid references public.portfolios on delete cascade not null,
  event text not null,
  ip text,
  user_agent text,
  referrer text,
  created_at timestamptz default now()
);

alter table public.analytics enable row level security;

create policy "Users can view own analytics"
  on public.analytics for select
  using (
    exists (
      select 1 from public.portfolios p
      where p.id = analytics.portfolio_id and p.user_id = auth.uid()
    )
  );

-- 5. Storage bucket for avatars/projects/images
insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;

create policy "Public can view images"
  on storage.objects for select
  using (bucket_id = 'portfolio-images');

create policy "Users can upload images"
  on storage.objects for insert
  with check (
    bucket_id = 'portfolio-images'
    and auth.uid() is not null
  );
