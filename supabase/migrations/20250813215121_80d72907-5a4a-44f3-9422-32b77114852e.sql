-- Drop the existing function first
DROP FUNCTION IF EXISTS public.check_mutual_match(uuid,uuid,uuid,uuid);

-- Recreate the function with different parameter names to avoid conflicts
CREATE OR REPLACE FUNCTION public.check_mutual_match(liker_user_id UUID, liked_user_id UUID, liker_dog_uuid UUID, liked_dog_uuid UUID)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  mutual_like_exists BOOLEAN;
  new_match_id UUID;
BEGIN
  -- Check if there's already a mutual like
  SELECT EXISTS(
    SELECT 1 FROM public.likes 
    WHERE liker_id = liked_user_id 
    AND liked_id = liker_user_id 
    AND liker_dog_id = liked_dog_uuid 
    AND liked_dog_id = liker_dog_uuid 
    AND type IN ('like', 'super_like')
  ) INTO mutual_like_exists;
  
  -- If mutual like exists, create a match
  IF mutual_like_exists THEN
    INSERT INTO public.matches (user1_id, user2_id, dog1_id, dog2_id)
    VALUES (liker_user_id, liked_user_id, liker_dog_uuid, liked_dog_uuid)
    RETURNING id INTO new_match_id;
    
    RETURN new_match_id;
  END IF;
  
  RETURN NULL;
END;
$$;