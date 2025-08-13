import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Heart, Star, Zap, Camera } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Discover = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Mock data for demo
  const mockProfiles = [
    {
      id: '1',
      name: 'Buddy',
      age: 3,
      breed: 'Golden Retriever',
      size: 'Large',
      temperament: ['Friendly', 'Energetic', 'Playful'],
      bio: 'Loves playing fetch and meeting new friends at the dog park!',
      location: 'Downtown'
    },
    {
      id: '2',
      name: 'Luna',
      age: 2,
      breed: 'Husky',
      size: 'Large',
      temperament: ['Active', 'Social', 'Adventurous'],
      bio: 'Adventure buddy looking for hiking companions!',
      location: 'Uptown'
    }
  ];

  const currentProfile = mockProfiles[currentIndex];

  const handleSwipe = async (type: 'pass' | 'like' | 'super_like') => {
    if (!user || currentIndex >= mockProfiles.length) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (type === 'like' || type === 'super_like') {
        // Random chance of match for demo
        if (Math.random() > 0.7) {
          toast({ title: "It's a match! 🎉" });
        }
      }

      setCurrentIndex(prev => prev + 1);
    } catch (error) {
      console.error('Error recording swipe:', error);
      toast({ title: "Error processing swipe", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  if (currentIndex >= mockProfiles.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">No more profiles!</h2>
            <p className="text-muted-foreground mb-6">
              Check back later for new dogs in your area
            </p>
            <Button onClick={() => setCurrentIndex(0)}>Refresh</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-4 pb-20">
      <div className="max-w-md mx-auto pt-4">
        {/* Daily likes meter */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex justify-between items-center text-sm">
              <span>Daily Likes</span>
              <span className="font-medium">5/20</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: '25%' }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Profile Card */}
        <Card className="overflow-hidden shadow-xl">
          <div className="relative">
            <div className="aspect-[3/4] bg-gradient-to-b from-muted/20 to-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Camera className="h-16 w-16 mx-auto mb-2" />
                <p>Photo will appear here</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
              <h2 className="text-2xl font-bold">
                {currentProfile.name}, {currentProfile.age}
              </h2>
              <p className="text-sm opacity-90">
                {currentProfile.breed} • {currentProfile.size}
              </p>
              <p className="text-sm opacity-75">📍 {currentProfile.location}</p>
            </div>
          </div>

          <CardContent className="p-6">
            {currentProfile.bio && (
              <p className="text-sm text-muted-foreground mb-4">{currentProfile.bio}</p>
            )}
            
            <div className="flex flex-wrap gap-2 mb-4">
              {currentProfile.temperament.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center items-center space-x-4 mt-6">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full h-16 w-16 border-2 border-red-500 hover:bg-red-50"
            onClick={() => handleSwipe('pass')}
            disabled={loading}
          >
            <X className="h-8 w-8 text-red-500" />
          </Button>
          
          <Button
            size="lg"
            className="rounded-full h-20 w-20 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
            onClick={() => handleSwipe('like')}
            disabled={loading}
          >
            <Heart className="h-10 w-10" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="rounded-full h-16 w-16 border-2 border-blue-500 hover:bg-blue-50"
            onClick={() => handleSwipe('super_like')}
            disabled={loading}
          >
            <Star className="h-8 w-8 text-blue-500" />
          </Button>
        </div>

        {/* Boost Button */}
        <div className="text-center mt-4">
          <Button variant="outline" className="text-purple-600 border-purple-600">
            <Zap className="h-4 w-4 mr-2" />
            Boost Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Discover;