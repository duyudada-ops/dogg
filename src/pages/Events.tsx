import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, Clock, Search, RefreshCw, Heart, Share2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

interface Event {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time?: string;
  venue_name?: string;
  venue_address?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  organizer_name?: string;
  ticket_url?: string;
  image_url?: string;
  category?: string;
  subcategory?: string;
  is_free: boolean;
  is_online: boolean;
  capacity?: number;
  created_at: string;
}

const Events = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('London');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEvents = useCallback(async (refresh = false) => {
    if (refresh) setRefreshing(true);
    else setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('fetch-events', {
        body: {
          city: selectedCity,
          category: selectedCategory,
          limit: 50
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      setEvents(data?.events || []);
      if (refresh) {
        toast.success(`Found ${data?.events?.length || 0} upcoming events`);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      
      // Show more helpful error message and fallback
      if (error.message?.includes('EVENTBRITE_API_KEY')) {
        toast.error('Events API not configured. Please contact support.');
      } else {
        toast.error('Failed to load events. Please try again later.');
      }
      
      // Set demo events as fallback
      setEvents([
        {
          id: 'demo-1',
          title: 'Weekly Dog Park Meetup',
          description: 'Bring your furry friend for socializing and playtime at the local dog park. All breeds welcome!',
          start_time: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
          venue_name: 'Central Dog Park',
          venue_address: '123 Park Avenue',
          city: selectedCity,
          country: 'US',
          organizer_name: 'Local Dog Owners Group',
          category: 'meetup',
          is_free: true,
          is_online: false,
          created_at: new Date().toISOString()
        },
        {
          id: 'demo-2',
          title: 'Dog Training Workshop',
          description: 'Learn basic obedience training techniques with professional trainers. Perfect for new dog owners.',
          start_time: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
          venue_name: 'Community Center',
          venue_address: '456 Main Street',
          city: selectedCity,
          country: 'US',
          organizer_name: 'Pawsome Trainers',
          category: 'training',
          is_free: false,
          is_online: false,
          created_at: new Date().toISOString()
        },
        {
          id: 'demo-3',
          title: 'Puppy Socialization Class',
          description: 'Safe environment for puppies 8-16 weeks to learn social skills with other young dogs.',
          start_time: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
          venue_name: 'Bark & Play Center',
          venue_address: '789 Dog Street',
          city: selectedCity,
          country: 'US',
          organizer_name: 'TailCircle Community',
          category: 'training',
          is_free: true,
          is_online: false,
          created_at: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedCity, selectedCategory]);

  useEffect(() => {
    fetchEvents();
    trackEvent({ eventName: AnalyticsEvents.PAGE_VIEW, properties: { page: 'events' } });
    
    // Cleanup function to prevent memory leaks
    return () => {
      setEvents([]);
    };
  }, [fetchEvents]);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.venue_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Loading skeleton component
  const EventSkeleton = () => (
    <Card className="bg-background/80 backdrop-blur-sm border border-border/50">
      <CardHeader>
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-4 w-20" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-32 w-full rounded-md" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 pb-20">
        <div className="container mx-auto p-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              🎉 Tail-Wagging Events
            </h1>
            <p className="text-muted-foreground">Loading pawsome events for you...</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <EventSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 pb-20">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              🎉 Tail-Wagging Events
            </h1>
            <p className="text-muted-foreground">
              Discover local events and meetups for you and your dog
            </p>
          </div>
          <Button 
            onClick={() => fetchEvents(true)} 
            disabled={refreshing}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="London">London</SelectItem>
              <SelectItem value="New York">New York</SelectItem>
              <SelectItem value="Los Angeles">Los Angeles</SelectItem>
              <SelectItem value="Chicago">Chicago</SelectItem>
              <SelectItem value="Toronto">Toronto</SelectItem>
              <SelectItem value="Berlin">Berlin</SelectItem>
              <SelectItem value="Paris">Paris</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All categories</SelectItem>
              <SelectItem value="training">Training</SelectItem>
              <SelectItem value="meetup">Meetup</SelectItem>
              <SelectItem value="competition">Competition</SelectItem>
              <SelectItem value="charity">Charity</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <Card>
            <CardContent className="text-center p-12">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Try adjusting your search' : 'Check back soon for upcoming events!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="bg-background/80 backdrop-blur-sm border border-border/50 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl group">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
                    <Badge variant={event.is_free ? "secondary" : "default"}>
                      {event.is_free ? 'Free' : 'Paid'}
                    </Badge>
                  </div>
                  {event.category && (
                    <Badge variant="outline" className="w-fit text-xs">
                      {event.category}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  {event.image_url && (
                    <img 
                      src={event.image_url} 
                      alt={event.title}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  )}
                  
                  {event.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDate(event.start_time)}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {formatTime(event.start_time)}
                  </div>
                  
                  {event.venue_name && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{event.venue_name}</span>
                    </div>
                  )}
                  
                  {event.venue_address && (
                    <p className="text-xs text-muted-foreground truncate">
                      {event.venue_address}
                    </p>
                  )}
                  
                  {event.capacity && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      Max {event.capacity} attendees
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform" 
                      onClick={() => {
                        if (event.ticket_url) {
                          window.open(event.ticket_url, '_blank');
                        } else {
                          toast.success('RSVP functionality coming soon!');
                        }
                      }}
                    >
                      {event.ticket_url ? 'View Event' : 'RSVP'}
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600"
                      onClick={() => toast.success('Added to favorites!')}
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        navigator.share?.({ 
                          title: event.title, 
                          text: event.description,
                          url: window.location.href 
                        }) || toast.success('Link copied to clipboard!');
                      }}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;