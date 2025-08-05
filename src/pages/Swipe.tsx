import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, X, MapPin, Info } from 'lucide-react';

const mockDogs = [
  {
    id: 1,
    name: 'Luna',
    breed: 'Border Collie',
    age: 2,
    gender: 'Female',
    location: 'San Francisco, CA',
    distance: '2.3 miles',
    bio: 'Energetic Border Collie who loves agility training and hiking. Looking for active playmates!',
    tags: ['High Energy', 'Smart', 'Loves Hiking'],
    photos: ['/placeholder-dog.jpg']
  },
  {
    id: 2,
    name: 'Max',
    breed: 'French Bulldog',
    age: 4,
    gender: 'Male',
    location: 'San Francisco, CA',
    distance: '1.8 miles',
    bio: 'Chill Frenchie who enjoys park walks and meeting new friends. Great with small dogs!',
    tags: ['Calm', 'Friendly', 'Small Dog Lover'],
    photos: ['/placeholder-dog.jpg']
  }
];

const Swipe = () => {
  const [currentDogIndex, setCurrentDogIndex] = useState(0);
  const [isLiked, setIsLiked] = useState<boolean | null>(null);

  const currentDog = mockDogs[currentDogIndex];

  const handleSwipe = (liked: boolean) => {
    setIsLiked(liked);
    
    setTimeout(() => {
      setCurrentDogIndex((prev) => (prev + 1) % mockDogs.length);
      setIsLiked(null);
    }, 300);
  };

  if (!currentDog) {
    return (
      <div className="container mx-auto py-6 text-center">
        <h2 className="text-2xl font-bold mb-4">No more dogs to show!</h2>
        <p className="text-muted-foreground">Check back later for new profiles.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 max-w-md">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Discover Dogs</h1>
        <p className="text-muted-foreground">Swipe right to like, left to pass</p>
      </div>

      <div className="relative">
        <Card className={`transition-transform duration-300 ${
          isLiked === true ? 'translate-x-full opacity-0' : 
          isLiked === false ? '-translate-x-full opacity-0' : ''
        }`}>
          <CardContent className="p-0">
            <div className="relative">
              <div className="aspect-[3/4] bg-muted rounded-t-lg flex items-center justify-center">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={currentDog.photos[0]} />
                  <AvatarFallback className="text-4xl">🐕</AvatarFallback>
                </Avatar>
              </div>
              
              {/* Like/Pass indicators */}
              {isLiked === true && (
                <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                  <div className="bg-green-500 text-white px-6 py-3 rounded-full font-bold text-xl">
                    LIKE
                  </div>
                </div>
              )}
              {isLiked === false && (
                <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                  <div className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-xl">
                    PASS
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">{currentDog.name}</h2>
                  <Button variant="ghost" size="sm">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground">
                  {currentDog.breed} • {currentDog.gender} • {currentDog.age} years old
                </p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" />
                  {currentDog.location} • {currentDog.distance}
                </div>
              </div>
              
              <p className="text-sm">{currentDog.bio}</p>
              
              <div className="flex flex-wrap gap-2">
                {currentDog.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full h-16 w-16 p-0 border-red-200 hover:bg-red-50"
            onClick={() => handleSwipe(false)}
          >
            <X className="h-8 w-8 text-red-500" />
          </Button>
          
          <Button
            size="lg"
            className="rounded-full h-16 w-16 p-0 bg-green-500 hover:bg-green-600"
            onClick={() => handleSwipe(true)}
          >
            <Heart className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Swipe;