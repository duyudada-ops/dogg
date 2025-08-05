-- Add demo flag to dog_profiles table
ALTER TABLE public.dog_profiles ADD COLUMN is_demo BOOLEAN DEFAULT false;

-- Add swipe tracking table for daily limits
CREATE TABLE public.user_swipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  swipe_date DATE NOT NULL DEFAULT CURRENT_DATE,
  swipe_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, swipe_date)
);

-- Enable RLS for user_swipes
ALTER TABLE public.user_swipes ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_swipes
CREATE POLICY "Users can view their own swipes" ON public.user_swipes
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own swipes" ON public.user_swipes
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own swipes" ON public.user_swipes
FOR UPDATE
USING (user_id = auth.uid());

-- Function to increment daily swipe count
CREATE OR REPLACE FUNCTION public.increment_daily_swipes(user_uuid UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_count INTEGER;
BEGIN
  -- Insert or update swipe count for today
  INSERT INTO public.user_swipes (user_id, swipe_date, swipe_count)
  VALUES (user_uuid, CURRENT_DATE, 1)
  ON CONFLICT (user_id, swipe_date)
  DO UPDATE SET 
    swipe_count = user_swipes.swipe_count + 1,
    updated_at = now()
  RETURNING swipe_count INTO current_count;
  
  RETURN current_count;
END;
$$;

-- Function to get daily swipe count
CREATE OR REPLACE FUNCTION public.get_daily_swipe_count(user_uuid UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_count INTEGER;
BEGIN
  SELECT swipe_count INTO current_count
  FROM public.user_swipes
  WHERE user_id = user_uuid AND swipe_date = CURRENT_DATE;
  
  RETURN COALESCE(current_count, 0);
END;
$$;