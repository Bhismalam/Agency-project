-- Fase 2 foundation: content tables, access rules (RLS) and storage buckets.
-- Run once in Supabase → SQL Editor (or `npx supabase db push`).

-- ───────────────────────── Types ─────────────────────────
create type public.vertical as enum ('build', 'grow');
create type public.access_role as enum ('owner', 'member');
create type public.post_status as enum ('draft', 'published');
create type public.program_status as enum ('open', 'closed');
create type public.application_status as enum ('new', 'reviewed', 'accepted', 'rejected');

-- ───────────────────────── Tables ─────────────────────────
create table public.divisions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  vertical public.vertical not null,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

-- A member is a public profile. It gets a login only once the owner invites
-- their email; user_id is linked automatically when that account is created.
create table public.members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users (id) on delete set null,
  email text unique check (email = lower(email)),
  access_role public.access_role not null default 'member',
  is_active boolean not null default true,
  slug text not null unique,
  name text not null,
  role_title text not null default '',
  division_id uuid references public.divisions (id) on delete set null,
  photo_path text,
  tagline text not null default '',
  bio text not null default '',
  skills text[] not null default '{}',
  -- [{ "title": "...", "context": "...", "period": "..." }]
  experience jsonb not null default '[]',
  is_published boolean not null default false,
  sort int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  vertical public.vertical not null,
  name text not null,
  tag text not null default '',
  summary text not null default '',
  description text not null default '',
  result text not null default '',
  cover_path text,
  is_published boolean not null default false,
  sort int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (vertical, slug)
);

-- Who worked on which project (powers "Projects I led" on profile pages).
create table public.project_members (
  project_id uuid not null references public.projects (id) on delete cascade,
  member_id uuid not null references public.members (id) on delete cascade,
  primary key (project_id, member_id)
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  vertical public.vertical not null,
  excerpt text not null default '',
  body text not null default '', -- Markdown
  author_id uuid references public.members (id) on delete set null,
  status public.post_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null default '',
  description text not null default '',
  status public.program_status not null default 'closed',
  deadline text not null default '',
  duration text not null default '',
  location text not null default '',
  requirements text[] not null default '{}',
  benefits text[] not null default '{}',
  sort int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs (id) on delete cascade,
  name text not null,
  email text not null,
  portfolio_url text,
  message text not null default '',
  cv_path text,
  status public.application_status not null default 'new',
  created_at timestamptz not null default now()
);

create index on public.members (division_id);
create index on public.project_members (member_id);
create index on public.posts (author_id);
create index on public.applications (program_id, created_at desc);

-- ───────────────────────── updated_at ─────────────────────────
create function public.set_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger set_updated_at before update on public.members
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.projects
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.posts
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.programs
  for each row execute function public.set_updated_at();

-- ───────────────────────── Auth helpers ─────────────────────────
-- security definer so policies can look up members without recursing into members' own RLS.
create function public.current_member_id() returns uuid
language sql stable security definer set search_path = '' as $$
  select id from public.members
  where user_id = (select auth.uid()) and is_active
$$;

create function public.is_owner() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.members
    where user_id = (select auth.uid()) and is_active and access_role = 'owner'
  )
$$;

-- Link a new auth account to the member row the owner created for that email.
create function public.link_member_to_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  update public.members
  set user_id = new.id
  where email = lower(new.email) and user_id is null;
  return new;
end $$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.link_member_to_user();

-- Members may edit their own profile, but only the owner may change who has
-- access, which division someone is in, the URL slug, or whether it is public.
-- auth.uid() is null for the secret key / SQL editor, which are trusted.
create function public.guard_member_fields() returns trigger
language plpgsql set search_path = '' as $$
begin
  if (select auth.uid()) is not null and not public.is_owner() then
    if new.user_id is distinct from old.user_id
      or new.email is distinct from old.email
      or new.access_role is distinct from old.access_role
      or new.is_active is distinct from old.is_active
      or new.slug is distinct from old.slug
      or new.division_id is distinct from old.division_id
      or new.is_published is distinct from old.is_published
      or new.sort is distinct from old.sort then
      raise exception 'Only the owner can change access, division, slug, visibility or order.';
    end if;
  end if;
  return new;
end $$;

create trigger guard_member_fields before update on public.members
  for each row execute function public.guard_member_fields();

-- Same idea for projects: linked members edit content, the owner controls visibility.
create function public.guard_project_fields() returns trigger
language plpgsql set search_path = '' as $$
begin
  if (select auth.uid()) is not null and not public.is_owner() then
    if new.slug is distinct from old.slug
      or new.vertical is distinct from old.vertical
      or new.is_published is distinct from old.is_published
      or new.sort is distinct from old.sort then
      raise exception 'Only the owner can change slug, vertical, visibility or order.';
    end if;
  end if;
  return new;
end $$;

create trigger guard_project_fields before update on public.projects
  for each row execute function public.guard_project_fields();

-- ───────────────────────── Row-level security ─────────────────────────
alter table public.divisions enable row level security;
alter table public.members enable row level security;
alter table public.projects enable row level security;
alter table public.project_members enable row level security;
alter table public.posts enable row level security;
alter table public.programs enable row level security;
alter table public.applications enable row level security;

-- divisions
create policy "divisions: public read" on public.divisions
  for select to anon, authenticated using (true);
create policy "divisions: owner write" on public.divisions
  for all to authenticated using (public.is_owner()) with check (public.is_owner());

-- members
create policy "members: public read published" on public.members
  for select to anon, authenticated using (is_published and is_active);
create policy "members: read own or owner" on public.members
  for select to authenticated
  using (user_id = (select auth.uid()) or public.is_owner());
create policy "members: update own or owner" on public.members
  for update to authenticated
  using ((user_id = (select auth.uid()) and is_active) or public.is_owner())
  with check ((user_id = (select auth.uid()) and is_active) or public.is_owner());
create policy "members: owner insert" on public.members
  for insert to authenticated with check (public.is_owner());
create policy "members: owner delete" on public.members
  for delete to authenticated using (public.is_owner());

-- Visitors must never see login emails or account links, so anon only gets the
-- profile columns. Public queries therefore select explicit columns, not *.
revoke select on public.members from anon;
grant select (
  id, slug, name, role_title, division_id, photo_path, tagline, bio,
  skills, experience, is_published, is_active, sort
) on public.members to anon;

-- projects
create policy "projects: public read published" on public.projects
  for select to anon, authenticated using (is_published);
create policy "projects: read linked or owner" on public.projects
  for select to authenticated
  using (
    public.is_owner() or exists (
      select 1 from public.project_members pm
      where pm.project_id = projects.id and pm.member_id = public.current_member_id()
    )
  );
create policy "projects: update linked or owner" on public.projects
  for update to authenticated
  using (
    public.is_owner() or exists (
      select 1 from public.project_members pm
      where pm.project_id = projects.id and pm.member_id = public.current_member_id()
    )
  );
create policy "projects: owner insert" on public.projects
  for insert to authenticated with check (public.is_owner());
create policy "projects: owner delete" on public.projects
  for delete to authenticated using (public.is_owner());

-- project_members
create policy "project_members: public read" on public.project_members
  for select to anon, authenticated using (true);
create policy "project_members: owner write" on public.project_members
  for all to authenticated using (public.is_owner()) with check (public.is_owner());

-- posts
create policy "posts: public read published" on public.posts
  for select to anon, authenticated using (status = 'published');
create policy "posts: read own or owner" on public.posts
  for select to authenticated
  using (author_id = public.current_member_id() or public.is_owner());
create policy "posts: insert own or owner" on public.posts
  for insert to authenticated
  with check (author_id = public.current_member_id() or public.is_owner());
create policy "posts: update own or owner" on public.posts
  for update to authenticated
  using (author_id = public.current_member_id() or public.is_owner())
  with check (author_id = public.current_member_id() or public.is_owner());
create policy "posts: delete own or owner" on public.posts
  for delete to authenticated
  using (author_id = public.current_member_id() or public.is_owner());

-- programs
create policy "programs: public read" on public.programs
  for select to anon, authenticated using (true);
create policy "programs: owner write" on public.programs
  for all to authenticated using (public.is_owner()) with check (public.is_owner());

-- applications: no public access at all. The application form inserts with the
-- secret key on the server; only the owner can read or update them.
create policy "applications: owner read" on public.applications
  for select to authenticated using (public.is_owner());
create policy "applications: owner update" on public.applications
  for update to authenticated using (public.is_owner()) with check (public.is_owner());
create policy "applications: owner delete" on public.applications
  for delete to authenticated using (public.is_owner());

-- ───────────────────────── Storage ─────────────────────────
-- media: public photos & covers.  Paths: members/<member_id>/…, projects/<project_id>/…
-- cvs: private CV uploads from program applications.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('media', 'media', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  ('cvs', 'cvs', false, 5242880, array['application/pdf'])
on conflict (id) do nothing;

create function public.can_write_media(object_name text) returns boolean
language sql stable security definer set search_path = '' as $$
  select public.is_owner()
    or (
      (storage.foldername(object_name))[1] = 'members'
      and (storage.foldername(object_name))[2] = public.current_member_id()::text
    )
    or (
      (storage.foldername(object_name))[1] = 'projects'
      and exists (
        select 1 from public.project_members pm
        where pm.project_id::text = (storage.foldername(object_name))[2]
          and pm.member_id = public.current_member_id()
      )
    )
$$;

create policy "media: member upload" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and public.can_write_media(name));
create policy "media: member update" on storage.objects
  for update to authenticated
  using (bucket_id = 'media' and public.can_write_media(name));
create policy "media: member delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'media' and public.can_write_media(name));

create policy "cvs: owner read" on storage.objects
  for select to authenticated using (bucket_id = 'cvs' and public.is_owner());
create policy "cvs: owner delete" on storage.objects
  for delete to authenticated using (bucket_id = 'cvs' and public.is_owner());
