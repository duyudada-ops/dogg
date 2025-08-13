-- Fix the function signature to match what was created
ALTER FUNCTION public.check_mutual_match(liker_user_id UUID, liked_user_id UUID, liker_dog_uuid UUID, liked_dog_uuid UUID) SET search_path = 'public';
ALTER FUNCTION public.update_updated_at_column() SET search_path = 'public';