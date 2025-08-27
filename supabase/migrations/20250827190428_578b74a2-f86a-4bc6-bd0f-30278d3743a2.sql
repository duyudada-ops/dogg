-- Clean up old events from database (events before 2025)
DELETE FROM public.events WHERE start_time < '2025-01-01T00:00:00.000Z';

-- Add source column to track event sources
ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS source text DEFAULT 'eventbrite';

-- Add index for better performance on event queries
CREATE INDEX IF NOT EXISTS idx_events_start_time ON public.events(start_time);
CREATE INDEX IF NOT EXISTS idx_events_city ON public.events(city);
CREATE INDEX IF NOT EXISTS idx_events_source ON public.events(source);