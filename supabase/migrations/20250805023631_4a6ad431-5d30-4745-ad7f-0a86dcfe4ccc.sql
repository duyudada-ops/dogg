-- Fix security warnings by setting search_path for functions

-- Update update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Update handle_new_user function  
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

-- Update check_mutual_match function
CREATE OR REPLACE FUNCTION public.check_mutual_match(
  p_liker_dog_id UUID,
  p_liked_dog_id UUID,
  p_liker_user_id UUID,
  p_liked_user_id UUID
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_match_id UUID;
  mutual_match_id UUID;
BEGIN
  -- Insert the new match
  INSERT INTO public.matches (liker_dog_id, liked_dog_id, liker_user_id, liked_user_id)
  VALUES (p_liker_dog_id, p_liked_dog_id, p_liker_user_id, p_liked_user_id)
  RETURNING id INTO new_match_id;
  
  -- Check if there's a mutual match (the other dog already liked this dog)
  SELECT id INTO mutual_match_id
  FROM public.matches
  WHERE liker_dog_id = p_liked_dog_id 
    AND liked_dog_id = p_liker_dog_id
    AND status = 'pending';
  
  -- If mutual match exists, update both to 'matched' status
  IF mutual_match_id IS NOT NULL THEN
    UPDATE public.matches 
    SET status = 'matched', updated_at = now()
    WHERE id = mutual_match_id OR id = new_match_id;
  END IF;
  
  RETURN new_match_id;
END;
$$;