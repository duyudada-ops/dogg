-- Create matches table for tracking dog likes and matches
CREATE TABLE public.matches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  liker_dog_id UUID NOT NULL REFERENCES public.dog_profiles(id) ON DELETE CASCADE,
  liked_dog_id UUID NOT NULL REFERENCES public.dog_profiles(id) ON DELETE CASCADE,
  liker_user_id UUID NOT NULL,
  liked_user_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'matched')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(liker_dog_id, liked_dog_id)
);

-- Enable RLS on matches table
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

-- Users can view matches involving their dogs
CREATE POLICY "Users can view matches for their dogs" 
ON public.matches 
FOR SELECT 
USING (
  liker_user_id = auth.uid() OR 
  liked_user_id = auth.uid()
);

-- Users can create matches for their dogs
CREATE POLICY "Users can create matches for their dogs" 
ON public.matches 
FOR INSERT 
WITH CHECK (liker_user_id = auth.uid());

-- Users can update matches involving their dogs (for mutual matching)
CREATE POLICY "Users can update matches for their dogs" 
ON public.matches 
FOR UPDATE 
USING (
  liker_user_id = auth.uid() OR 
  liked_user_id = auth.uid()
);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_matches_updated_at
BEFORE UPDATE ON public.matches
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle mutual matching logic
CREATE OR REPLACE FUNCTION public.check_mutual_match(
  p_liker_dog_id UUID,
  p_liked_dog_id UUID,
  p_liker_user_id UUID,
  p_liked_user_id UUID
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
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