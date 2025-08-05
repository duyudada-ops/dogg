-- Fix security issues by setting search_path for functions
CREATE OR REPLACE FUNCTION public.increment_daily_swipes(user_uuid UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
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

-- Fix security issues by setting search_path for functions
CREATE OR REPLACE FUNCTION public.get_daily_swipe_count(user_uuid UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
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