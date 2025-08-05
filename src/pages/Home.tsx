import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Calendar, MessageCircle } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.user_metadata?.full_name || 'Dog Lover'}! 🐕</h1>
        <p className="text-muted-foreground">What would you like to do today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Find Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Discover compatible dogs in your area
            </p>
            <Button className="w-full">Start Swiping</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Your Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View and chat with your matches
            </p>
            <Button variant="outline" className="w-full">View Matches</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-500" />
              Events & Playdates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Join local dog events and playdates
            </p>
            <Button variant="outline" className="w-full">Browse Events</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-purple-500" />
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Chat with other dog owners
            </p>
            <Button variant="outline" className="w-full">Open Chats</Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Quick Stats</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">12</p>
            <p className="text-sm text-muted-foreground">Matches</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">5</p>
            <p className="text-sm text-muted-foreground">Chats</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">3</p>
            <p className="text-sm text-muted-foreground">Events</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;