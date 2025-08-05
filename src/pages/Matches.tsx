import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Heart, MapPin } from 'lucide-react';

const mockMatches = [
  {
    id: 1,
    name: 'Luna',
    breed: 'Border Collie',
    location: 'San Francisco, CA',
    distance: '2.3 miles',
    lastMessage: 'Hey! Luna would love to meet Buddy for a playdate!',
    timestamp: '2m ago',
    isNew: true,
    avatar: '/placeholder-dog.jpg'
  },
  {
    id: 2,
    name: 'Max',
    breed: 'French Bulldog',
    location: 'San Francisco, CA',
    distance: '1.8 miles',
    lastMessage: 'Thanks for the match! Max is great with other dogs.',
    timestamp: '1h ago',
    isNew: false,
    avatar: '/placeholder-dog.jpg'
  },
  {
    id: 3,
    name: 'Bella',
    breed: 'Golden Retriever',
    location: 'San Francisco, CA',
    distance: '3.1 miles',
    lastMessage: 'Would you like to join our weekly hiking group?',
    timestamp: '1d ago',
    isNew: false,
    avatar: '/placeholder-dog.jpg'
  }
];

const Matches = () => {
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Your Matches</h1>
          <p className="text-muted-foreground">Connect with dogs that liked you back!</p>
        </div>

        {/* New Matches Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              New Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {mockMatches.filter(match => match.isNew).map((match) => (
                <div key={match.id} className="flex flex-col items-center space-y-2 min-w-fit">
                  <div className="relative">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={match.avatar} />
                      <AvatarFallback>🐕</AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full"></div>
                  </div>
                  <p className="text-sm font-medium text-center">{match.name}</p>
                  <Badge variant="secondary" className="text-xs">{match.breed}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Matches Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMatches.map((match) => (
                <div key={match.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={match.avatar} />
                      <AvatarFallback>🐕</AvatarFallback>
                    </Avatar>
                    {match.isNew && (
                      <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold truncate">{match.name}</h3>
                      <span className="text-xs text-muted-foreground">{match.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {match.breed}
                    </p>
                    <p className="text-sm truncate">{match.lastMessage}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      {match.distance}
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Match Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="text-center py-6">
              <p className="text-3xl font-bold text-primary">12</p>
              <p className="text-sm text-muted-foreground">Total Matches</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-6">
              <p className="text-3xl font-bold text-green-500">5</p>
              <p className="text-sm text-muted-foreground">Active Chats</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-6">
              <p className="text-3xl font-bold text-blue-500">2</p>
              <p className="text-sm text-muted-foreground">Playdates Planned</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Matches;