-- Create events table for storing real event data
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  eventbrite_id TEXT UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  venue_name TEXT,
  venue_address TEXT,
  city TEXT,
  country TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  organizer_name TEXT,
  organizer_description TEXT,
  ticket_url TEXT,
  image_url TEXT,
  category TEXT,
  subcategory TEXT,
  is_free BOOLEAN DEFAULT false,
  is_online BOOLEAN DEFAULT false,
  capacity INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_events table for tracking user interactions with events
CREATE TABLE public.user_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  event_id UUID NOT NULL REFERENCES public.events(id),
  status TEXT NOT NULL CHECK (status IN ('interested', 'going', 'not_going')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, event_id)
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_events ENABLE ROW LEVEL SECURITY;

-- Create policies for events (public read access)
CREATE POLICY "Events are viewable by everyone" 
ON public.events 
FOR SELECT 
USING (true);

-- Create policies for user_events
CREATE POLICY "Users can view their own event interactions" 
ON public.user_events 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own event interactions" 
ON public.user_events 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own event interactions" 
ON public.user_events 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_events_city ON public.events(city);
CREATE INDEX idx_events_start_time ON public.events(start_time);
CREATE INDEX idx_events_category ON public.events(category);
CREATE INDEX idx_user_events_user_id ON public.user_events(user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_events_updated_at
BEFORE UPDATE ON public.user_events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();