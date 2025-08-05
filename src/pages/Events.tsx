import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, Clock, Plus, Search, Loader2, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Event {
  id: string;
  eventbrite_id?: string;
  title: string;
  description?: string;
  start_time: string;
  end_time?: string;
  venue_name?: string;
  venue_address?: string;
  city?: string;
  country?: string;
  organizer_name?: string;
  ticket_url?: string;
  image_url?: string;
  category?: string;
  is_free: boolean;
  is_online: boolean;
  capacity?: number;
}

interface UserEvent {
  id: string;
  user_id: string;
  event_id: string;
  status: 'interested' | 'going' | 'not_going';
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [userEvents, setUserEvents] = useState<UserEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchCity, setSearchCity] = useState('London');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-events', {
        body: { 
          city: searchCity,
          category: selectedCategory === 'all' ? '' : selectedCategory,
          limit: 20
        }
      });

      if (error) throw error;

      setEvents(data.events || []);
      
      if (data.events.length === 0) {
        toast({
          title: "No events found",
          description: `No events found for ${searchCity}. Try a different city or check back later.`,
        });
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error loading events",
        description: "Failed to load events. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserEvents = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_events')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      
      // Type the data properly
      const typedData = (data || []).map(item => ({
        id: item.id,
        user_id: item.user_id,
        event_id: item.event_id,
        status: item.status as 'interested' | 'going' | 'not_going'
      }));
      
      setUserEvents(typedData);
    } catch (error) {
      console.error('Error fetching user events:', error);
    }
  };

  const handleEventInteraction = async (eventId: string, status: 'interested' | 'going' | 'not_going') => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to interact with events.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('user_events')
        .upsert({
          user_id: user.id,
          event_id: eventId,
          status: status
        }, {
          onConflict: 'user_id,event_id'
        });

      if (error) throw error;

      // Update local state
      setUserEvents(prev => {
        const existing = prev.find(ue => ue.event_id === eventId);
        if (existing) {
          return prev.map(ue => 
            ue.event_id === eventId ? { ...ue, status } : ue
          );
        } else {
          return [...prev, {
            id: crypto.randomUUID(),
            user_id: user.id,
            event_id: eventId,
            status
          }];
        }
      });

      toast({
        title: "Event updated",
        description: `You are now ${status === 'going' ? 'going to' : status === 'interested' ? 'interested in' : 'not going to'} this event.`,
      });
    } catch (error) {
      console.error('Error updating event status:', error);
      toast({
        title: "Error",
        description: "Failed to update event status. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserEvents();
    }
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getUserEventStatus = (eventId: string) => {
    return userEvents.find(ue => ue.event_id === eventId)?.status;
  };

  const getJoinedEvents = () => {
    const goingEventIds = userEvents
      .filter(ue => ue.status === 'going')
      .map(ue => ue.event_id);
    return events.filter(event => goingEventIds.includes(event.id));
  };

  const EventCard = ({ event }: { event: Event }) => {
    const userStatus = getUserEventStatus(event.id);
    
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <div className="flex gap-2 mt-2">
                {event.category && (
                  <Badge variant="secondary">{event.category}</Badge>
                )}
                {event.is_free && (
                  <Badge variant="outline" className="text-green-600">Free</Badge>
                )}
                {event.is_online && (
                  <Badge variant="outline" className="text-blue-600">Online</Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {user && (
                <>
                  <Button
                    variant={userStatus === 'interested' ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleEventInteraction(event.id, 'interested')}
                  >
                    {userStatus === 'interested' ? 'Interested' : 'Interest'}
                  </Button>
                  <Button
                    variant={userStatus === 'going' ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleEventInteraction(event.id, 'going')}
                  >
                    {userStatus === 'going' ? 'Going' : 'Join'}
                  </Button>
                </>
              )}
              {event.ticket_url && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(event.ticket_url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {event.description && (
            <p className="text-sm text-muted-foreground line-clamp-3">{event.description}</p>
          )}
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formatDate(event.start_time)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{formatTime(event.start_time)}</span>
            </div>
            {(event.venue_name || event.venue_address) && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>
                  {event.venue_name && event.venue_address 
                    ? `${event.venue_name}, ${event.venue_address}`
                    : event.venue_name || event.venue_address
                  }
                </span>
              </div>
            )}
            {event.capacity && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Capacity: {event.capacity}</span>
              </div>
            )}
          </div>
          
          {event.organizer_name && (
            <div className="flex items-center gap-2 pt-2 border-t">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">
                  {event.organizer_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                Organized by {event.organizer_name}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Events & Playdates</h1>
            <p className="text-muted-foreground">Find and join real dog events worldwide</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-sm font-medium">City</label>
            <Input
              placeholder="Enter city name..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
          </div>
          <div className="w-48">
            <label className="text-sm font-medium">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                <SelectItem value="103">Music</SelectItem>
                <SelectItem value="110">Food & Drink</SelectItem>
                <SelectItem value="108">Sports & Fitness</SelectItem>
                <SelectItem value="113">Community</SelectItem>
                <SelectItem value="105">Performing Arts</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={fetchEvents} disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            Search
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Events ({events.length})</TabsTrigger>
            <TabsTrigger value="joined">My Events ({getJoinedEvents().length})</TabsTrigger>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="grid gap-4">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
                {events.length === 0 && !loading && (
                  <Card>
                    <CardContent className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No events found</h3>
                      <p className="text-muted-foreground">Try searching for a different city or category</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="joined" className="space-y-4">
            <div className="grid gap-4">
              {getJoinedEvents().map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
              {getJoinedEvents().length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No events joined yet</h3>
                    <p className="text-muted-foreground">Browse and join events to see them here</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="nearby" className="space-y-4">
            <div className="grid gap-4">
              {events.slice(0, 5).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
              {events.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No nearby events</h3>
                    <p className="text-muted-foreground">Search for events in your city</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Events;