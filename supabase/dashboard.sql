-- Schema additions for the MN Retro Tech developer dashboard.
-- Run inside the Supabase SQL editor or via `supabase db` CLI.

-- Enable pgcrypto for UUID generation if not already enabled.
create extension if not exists "pgcrypto";

-- Page views table ----------------------------------------------------------
create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  referrer text,
  session_id uuid,
  user_agent text,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.page_views enable row level security;

create index if not exists page_views_created_at_idx on public.page_views (created_at desc);
create index if not exists page_views_path_idx on public.page_views (path);

create policy "Allow dashboard roles to read page views"
  on public.page_views
  for select
  using (
    coalesce((auth.jwt() -> 'app_metadata' ->> 'role'), (auth.jwt() -> 'user_metadata' ->> 'role'), '') in ('admin', 'developer')
  );

-- Error logs table ----------------------------------------------------------
create table if not exists public.error_logs (
  id uuid primary key default gen_random_uuid(),
  level text not null default 'error' check (level in ('debug', 'info', 'warn', 'error', 'fatal')),
  message text not null,
  stack text,
  context jsonb default '{}',
  source text,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.error_logs enable row level security;

create index if not exists error_logs_created_at_idx on public.error_logs (created_at desc);
create index if not exists error_logs_level_idx on public.error_logs (level);

create policy "Allow dashboard roles to read error logs"
  on public.error_logs
  for select
  using (
    coalesce((auth.jwt() -> 'app_metadata' ->> 'role'), (auth.jwt() -> 'user_metadata' ->> 'role'), '') in ('admin', 'developer')
  );

-- Aggregation function ------------------------------------------------------
create or replace function public.dashboard_page_views_daily(
  from_date date default (timezone('utc', now()) - interval '14 days')::date,
  to_date date default timezone('utc', now())::date
)
returns table(day date, view_count bigint)
language sql
security definer
set search_path = public
as $$
  select
    date_trunc('day', created_at)::date as day,
    count(*) as view_count
  from public.page_views
  where created_at >= coalesce(from_date::timestamptz, timezone('utc', now()) - interval '14 days')
    and created_at < (coalesce(to_date::timestamptz, timezone('utc', now())::date + interval '1 day'))
  group by 1
  order by 1;
$$;

revoke all on function public.dashboard_page_views_daily(date, date) from public;
grant execute on function public.dashboard_page_views_daily(date, date) to authenticated;

create or replace function public.dashboard_top_referrers(
  limit_count integer default 10,
  from_date date default (timezone('utc', now()) - interval '14 days')::date,
  to_date date default timezone('utc', now())::date
)
returns table(referrer text, view_count bigint)
language sql
security definer
set search_path = public
as $$
  select
    coalesce(nullif(referrer, ''), 'Direct / Unknown') as referrer,
    count(*) as view_count
  from public.page_views
  where referrer is not null
    and created_at >= coalesce(from_date::timestamptz, timezone('utc', now()) - interval '14 days')
    and created_at < (coalesce(to_date::timestamptz, timezone('utc', now())::date + interval '1 day'))
  group by 1
  order by view_count desc
  limit greatest(limit_count, 1);
$$;

revoke all on function public.dashboard_top_referrers(integer, date, date) from public;
grant execute on function public.dashboard_top_referrers(integer, date, date) to authenticated;

-- Blog posts table ----------------------------------------------------------
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  date timestamptz not null default timezone('utc', now()),
  description text not null default '',
  author text not null default 'MNRTC',
  tags text[] default array[]::text[],
  content text not null default '',
  content_markdown text not null default '',
  published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id)
);

alter table public.blog_posts enable row level security;

create index if not exists blog_posts_slug_idx on public.blog_posts (slug);
create index if not exists blog_posts_date_idx on public.blog_posts (date desc);
create index if not exists blog_posts_published_idx on public.blog_posts (published);

-- Public can read published posts
create policy "Public can read published blog posts"
  on public.blog_posts
  for select
  using (published = true);

-- Dashboard roles can read all posts
create policy "Dashboard roles can read all blog posts"
  on public.blog_posts
  for select
  using (
    coalesce((auth.jwt() -> 'app_metadata' ->> 'role'), (auth.jwt() -> 'user_metadata' ->> 'role'), '') in ('admin', 'developer')
  );

-- Dashboard roles can insert posts
create policy "Dashboard roles can insert blog posts"
  on public.blog_posts
  for insert
  with check (
    coalesce((auth.jwt() -> 'app_metadata' ->> 'role'), (auth.jwt() -> 'user_metadata' ->> 'role'), '') in ('admin', 'developer')
  );

-- Dashboard roles can update posts
create policy "Dashboard roles can update blog posts"
  on public.blog_posts
  for update
  using (
    coalesce((auth.jwt() -> 'app_metadata' ->> 'role'), (auth.jwt() -> 'user_metadata' ->> 'role'), '') in ('admin', 'developer')
  );

-- Dashboard roles can delete posts
create policy "Dashboard roles can delete blog posts"
  on public.blog_posts
  for delete
  using (
    coalesce((auth.jwt() -> 'app_metadata' ->> 'role'), (auth.jwt() -> 'user_metadata' ->> 'role'), '') in ('admin', 'developer')
  );

-- Function to update updated_at timestamp
create or replace function public.update_blog_post_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create trigger update_blog_posts_updated_at
  before update on public.blog_posts
  for each row
  execute function public.update_blog_post_updated_at();

-- Events table ----------------------------------------------------------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date not null,
  time text not null default '',
  location text not null default '',
  description text not null default '',
  status text not null default 'upcoming' check (status in ('upcoming', 'past', 'tba')),
  published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id)
);

alter table public.events enable row level security;

create index if not exists events_date_idx on public.events (date desc);
create index if not exists events_status_idx on public.events (status);
create index if not exists events_published_idx on public.events (published);

-- Public can read published events
create policy "Public can read published events"
  on public.events
  for select
  using (published = true);

-- Dashboard roles can read all events
create policy "Dashboard roles can read all events"
  on public.events
  for select
  using (
    coalesce((auth.jwt() -> 'app_metadata' ->> 'role'), (auth.jwt() -> 'user_metadata' ->> 'role'), '') in ('admin', 'developer')
  );

-- Dashboard roles can insert events
create policy "Dashboard roles can insert events"
  on public.events
  for insert
  with check (
    coalesce((auth.jwt() -> 'app_metadata' ->> 'role'), (auth.jwt() -> 'user_metadata' ->> 'role'), '') in ('admin', 'developer')
  );

-- Dashboard roles can update events
create policy "Dashboard roles can update events"
  on public.events
  for update
  using (
    coalesce((auth.jwt() -> 'app_metadata' ->> 'role'), (auth.jwt() -> 'user_metadata' ->> 'role'), '') in ('admin', 'developer')
  );

-- Dashboard roles can delete events
create policy "Dashboard roles can delete events"
  on public.events
  for delete
  using (
    coalesce((auth.jwt() -> 'app_metadata' ->> 'role'), (auth.jwt() -> 'user_metadata' ->> 'role'), '') in ('admin', 'developer')
  );

-- Function to update updated_at timestamp for events
create or replace function public.update_event_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create trigger update_events_updated_at
  before update on public.events
  for each row
  execute function public.update_event_updated_at();


