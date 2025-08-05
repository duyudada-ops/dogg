import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Users, Clock, Plus } from 'lucide-react';

const mockEvents = [
  {
    id: 1,
    title: 'Golden Gate Park Playdate',
    type: 'Playdate',
    date: '2024-03-15',
    time: '10:00 AM',
    location: 'Golden Gate Park, SF',
    attendees: 8,
    maxAttendees: 15,
    description: 'Join us for a fun morning playdate at Golden Gate Park! All friendly dogs welcome.',
    organizer: 'Sarah',
    isJoined: false
  },
  {
    id: 2,
    title: 'Small Dog Meetup',
    type: 'Meetup',
    date: '2024-03-16',
    time: '2:00 PM',
    location: 'Dolores Park, SF',
    attendees: 12,
    maxAttendees: 20,
    description: 'A special meetup for small dogs (under 25 lbs) and their owners.',
    organizer: 'Mike',
    isJoined: true
  },
  {
    id: 3,
    title: 'Dog Training Workshop',
    type: 'Training',
    date: '2024-03-18',
    time: '6:00 PM',
    location: 'Community Center, SF',
    attendees: 15,
    maxAttendees: 25,
    description: 'Learn basic obedience and socialization techniques with certified trainers.',
    organizer: 'Professional Trainer',
    isJoined: false
  }
];

const Events = () => {
  const [joinedEvents, setJoinedEvents] = useState<number[]>([2]);

  const handleJoinEvent = (eventId: number) => {
    setJoinedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const EventCard = ({ event }: { event: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{event.title}</CardTitle>
            <Badge variant="secondary" className="mt-2">{event.type}</Badge>
          </div>
          <Button
            variant={joinedEvents.includes(event.id) ? "default" : "outline"}
            size="sm"
            onClick={() => handleJoinEvent(event.id)}
          >
            {joinedEvents.includes(event.id) ? 'Joined' : 'Join'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{event.description}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{event.attendees}/{event.maxAttendees} attending</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 pt-2 border-t">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">{event.organizer.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">Organized by {event.organizer}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Events & Playdates</h1>
            <p className="text-muted-foreground">Find and join local dog events</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="joined">My Events</TabsTrigger>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {mockEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="joined" className="space-y-4">
            <div className="grid gap-4">
              {mockEvents
                .filter(event => joinedEvents.includes(event.id))
                .map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              {joinedEvents.length === 0 && (
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
              {mockEvents.slice(0, 2).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Events;