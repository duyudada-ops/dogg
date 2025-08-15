-- TailCircle Production Database Schema
-- This migration creates the complete normalized data model for production

-- First, ensure we have the existing tables and update them if needed
-- Add missing columns to existing tables where needed

-- Update profiles table to match spec
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS full_name text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS country text;

-- Update dog_profiles to match dogs spec
ALTER TABLE public.dog_profiles 
ADD COLUMN IF NOT EXISTS age_months int,
ADD COLUMN IF NOT EXISTS sex text CHECK (sex IN ('male','female')),
ADD COLUMN IF NOT EXISTS images jsonb DEFAULT '[]'::jsonb;

-- Create new tables for production features

-- Events table for meetups and dog-friendly spots
CREATE TABLE IF NOT EXISTS public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id uuid NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz,
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  location_name text,
  max_attendees int,
  price_cents int DEFAULT 0,
  currency text DEFAULT 'usd',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Event attendees
CREATE TABLE IF NOT EXISTS public.event_attendees (
  event_id uuid REFERENCES public.events(id) ON DELETE CASCADE,
  profile_id uuid REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  status text DEFAULT 'going' CHECK (status IN ('interested','going','waitlist')),
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (event_id, profile_id)
);

-- Messages for realtime chat
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL,
  sender_id uuid NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  body text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Feed posts (UGC)
CREATE TABLE IF NOT EXISTS public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  body text,
  images jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Post likes
CREATE TABLE IF NOT EXISTS public.post_likes (
  post_id uuid REFERENCES public.posts(id) ON DELETE CASCADE,
  profile_id uuid REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (post_id, profile_id)
);

-- Marketplace items
CREATE TABLE IF NOT EXISTS public.marketplace_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  price_cents int NOT NULL,
  currency text DEFAULT 'usd',
  images jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'active' CHECK (status IN ('active','sold','hidden')),
  created_at timestamptz DEFAULT now()
);

-- Orders for marketplace
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid NOT NULL REFERENCES public.marketplace_items(id) ON DELETE RESTRICT,
  buyer_id uuid NOT NULL REFERENCES public.profiles(user_id) ON DELETE RESTRICT,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','canceled','refunded')),
  stripe_payment_intent text,
  created_at timestamptz DEFAULT now()
);

-- Update matches table to use dog_profiles
ALTER TABLE public.matches 
DROP CONSTRAINT IF EXISTS matches_dog1_id_fkey,
DROP CONSTRAINT IF EXISTS matches_dog2_id_fkey,
ADD COLUMN IF NOT EXISTS dog_a uuid REFERENCES public.dog_profiles(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS dog_b uuid REFERENCES public.dog_profiles(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS score numeric;

-- Create likes table for swipe functionality
CREATE TABLE IF NOT EXISTS public.likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  liker_id uuid NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  liked_id uuid NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  liker_dog_id uuid NOT NULL REFERENCES public.dog_profiles(id) ON DELETE CASCADE,
  liked_dog_id uuid NOT NULL REFERENCES public.dog_profiles(id) ON DELETE CASCADE,
  type text DEFAULT 'like' CHECK (type IN ('like', 'super_like', 'pass')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(liker_id, liked_id, liker_dog_id, liked_dog_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_events_location ON public.events USING gist (ll_to_earth(lat, lng));
CREATE INDEX IF NOT EXISTS idx_events_host_id ON public.events(host_id);
CREATE INDEX IF NOT EXISTS idx_events_starts_at ON public.events(starts_at);
CREATE INDEX IF NOT EXISTS idx_messages_thread_id ON public.messages(thread_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_matches_dog_a ON public.matches(dog_a);
CREATE INDEX IF NOT EXISTS idx_matches_dog_b ON public.matches(dog_b);
CREATE INDEX IF NOT EXISTS idx_likes_liker_id ON public.likes(liker_id);
CREATE INDEX IF NOT EXISTS idx_likes_liked_id ON public.likes(liked_id);

-- Create analytics events table
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  event_name text NOT NULL,
  properties jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON public.analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_name ON public.analytics_events(event_name);

-- Enable RLS on new tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Events policies
CREATE POLICY "read_all_events" ON public.events FOR SELECT USING (true);
CREATE POLICY "host_manage_events" ON public.events FOR ALL USING (host_id = auth.uid());

-- Event attendees policies
CREATE POLICY "read_event_attendees" ON public.event_attendees FOR SELECT USING (true);
CREATE POLICY "manage_own_attendance" ON public.event_attendees FOR ALL USING (profile_id = auth.uid());

-- Messages policies (restrict to thread participants)
CREATE POLICY "read_thread_messages" ON public.messages FOR SELECT USING (
  EXISTS(
    SELECT 1 FROM public.matches m 
    WHERE (
      (m.dog_a IN (SELECT id FROM public.dog_profiles WHERE user_id = auth.uid()) OR
       m.dog_b IN (SELECT id FROM public.dog_profiles WHERE user_id = auth.uid())) AND
      m.status = 'mutual'
    ) AND
    (thread_id = CONCAT(LEAST(m.dog_a::text, m.dog_b::text), '_', GREATEST(m.dog_a::text, m.dog_b::text)))
  )
);
CREATE POLICY "send_messages" ON public.messages FOR INSERT WITH CHECK (sender_id = auth.uid());

-- Posts policies
CREATE POLICY "read_all_posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "manage_own_posts" ON public.posts FOR ALL USING (author_id = auth.uid());

-- Post likes policies
CREATE POLICY "read_post_likes" ON public.post_likes FOR SELECT USING (true);
CREATE POLICY "manage_own_likes" ON public.post_likes FOR ALL USING (profile_id = auth.uid());

-- Marketplace policies
CREATE POLICY "read_active_items" ON public.marketplace_items FOR SELECT USING (status = 'active' OR seller_id = auth.uid());
CREATE POLICY "manage_own_items" ON public.marketplace_items FOR ALL USING (seller_id = auth.uid());

-- Orders policies
CREATE POLICY "read_own_orders" ON public.orders FOR SELECT USING (buyer_id = auth.uid() OR EXISTS(SELECT 1 FROM public.marketplace_items WHERE id = item_id AND seller_id = auth.uid()));
CREATE POLICY "create_orders" ON public.orders FOR INSERT WITH CHECK (buyer_id = auth.uid());

-- Likes policies
CREATE POLICY "read_own_likes" ON public.likes FOR SELECT USING (liker_id = auth.uid() OR liked_id = auth.uid());
CREATE POLICY "manage_own_likes" ON public.likes FOR ALL USING (liker_id = auth.uid());

-- Analytics policies
CREATE POLICY "insert_own_analytics" ON public.analytics_events FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "read_own_analytics" ON public.analytics_events FOR SELECT USING (user_id = auth.uid());

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER events_updated_at 
  BEFORE UPDATE ON public.events 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.matches;
ALTER PUBLICATION supabase_realtime ADD TABLE public.likes;