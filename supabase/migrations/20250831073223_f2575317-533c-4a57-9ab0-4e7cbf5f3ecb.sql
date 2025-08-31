-- master catalog for all gallery photos (provider or user)
create table if not exists public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  source text not null check (source in ('pexels','unsplash','user')),
  source_id text,                 -- provider's id (null for user)
  src text not null,              -- cdn url or /storage path
  alt text not null,
  vibe text check (vibe in ('playful','gentle','adventurous','sleepy','smart')),
  width int,
  height int,
  credited_to text,               -- photographer or user handle
  is_public boolean not null default true,  -- can be shown in public carousels
  created_at timestamptz not null default now(),
  unique (source, source_id)      -- dedupe provider assets
);