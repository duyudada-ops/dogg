-- Create RLS policies for gallery_photos table

-- Public can read only public photos
create policy "Public read public photos"
on public.gallery_photos
for select
to anon, authenticated
using (is_public = true);

-- Authenticated users can INSERT their own photos (opt-in uploads)
create policy "Users insert own photos"
on public.gallery_photos
for insert
to authenticated
with check (source = 'user' and user_id = auth.uid());

-- Owners can UPDATE their own photos
create policy "Users update own photos"
on public.gallery_photos
for update
to authenticated
using (source = 'user' and user_id = auth.uid())
with check (source = 'user' and user_id = auth.uid());

-- Owners can DELETE their own photos
create policy "Users delete own photos"
on public.gallery_photos
for delete
to authenticated
using (source = 'user' and user_id = auth.uid());