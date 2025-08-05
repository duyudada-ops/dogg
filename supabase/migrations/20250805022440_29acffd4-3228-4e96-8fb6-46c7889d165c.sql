-- Create dog_profiles table
CREATE TABLE public.dog_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  breed text NOT NULL,
  age integer NOT NULL CHECK (age > 0 AND age <= 30),
  gender text NOT NULL CHECK (gender IN ('male', 'female')),
  bio text,
  location text,
  photo_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.dog_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for dog_profiles
CREATE POLICY "Users can view all dog profiles" 
ON public.dog_profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own dog profiles" 
ON public.dog_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own dog profiles" 
ON public.dog_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own dog profiles" 
ON public.dog_profiles 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create storage bucket for dog photos
INSERT INTO storage.buckets (id, name, public) VALUES ('dog-photos', 'dog-photos', true);

-- Create storage policies for dog photos
CREATE POLICY "Dog photos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'dog-photos');

CREATE POLICY "Users can upload their own dog photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'dog-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own dog photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'dog-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own dog photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'dog-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_dog_profiles_updated_at
BEFORE UPDATE ON public.dog_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();