-- Fix function search path issues by setting search_path for all functions
ALTER FUNCTION public.check_mutual_match(UUID, UUID, UUID, UUID) SET search_path = 'public';
ALTER FUNCTION public.update_daily_likes(UUID) SET search_path = 'public';
ALTER FUNCTION public.update_updated_at_column() SET search_path = 'public';