-- Turn on RLS
alter table public.gallery_photos enable row level security;

-- Track which user owns a photo (null for provider photos)
alter table public.gallery_photos
  add column if not exists user_id uuid references auth.users(id);

create index if not exists gallery_user_idx on public.gallery_photos(user_id);