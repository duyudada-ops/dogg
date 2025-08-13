import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, X, MapPin, Info } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import MatchSuccessPopup from '@/components/match/MatchSuccessPopup';

interface DogProfile {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  location: string | null;
  bio: string | null;
  photo_url: string | null;
  user_id: string;
}

const Swipe = () => {
  const { user } = useAuth();
  const [dogs, setDogs] = useState<DogProfile[]>([]);
  const [currentDogIndex, setCurrentDogIndex] = useState(0);
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [userDogs, setUserDogs] = useState<DogProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMatchPopup, setShowMatchPopup] = useState(false);
  const [matchedDog, setMatchedDog] = useState<DogProfile | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserDogs();
      fetchAvailableDogs();
    }
  }, [user]);

  const fetchUserDogs = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('dog_profiles')
      .select('*')
      .eq('user_id', user.id);
    
    if (error) {
      console.error('Error fetching user dogs:', error);
      return;
    }
    
    setUserDogs(data || []);
  };

  const fetchAvailableDogs = async () => {
    if (!user) return;
    
    try {
      // Get dogs that are not owned by the current user
      const { data: allDogs, error: dogsError } = await supabase
        .from('dog_profiles')
        .select('*')
        .neq('user_id', user.id);
      
      if (dogsError) throw dogsError;
      
      // Get matches involving current user's dogs to filter out already swiped dogs
      const { data: existingMatches, error: matchesError } = await supabase
        .from('matches')
        .select('liked_dog_id')
        .eq('liker_user_id', user.id);
      
      if (matchesError) throw matchesError;
      
      const swipedDogIds = new Set(existingMatches?.map(m => m.liked_dog_id) || []);
      const availableDogs = allDogs?.filter(dog => !swipedDogIds.has(dog.id)) || [];
      
      setDogs(availableDogs);
    } catch (error) {
      console.error('Error fetching dogs:', error);
      toast.error('Failed to load dogs');
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (liked: boolean) => {
    if (!user || !currentDog || userDogs.length === 0) {
      toast.error('Please create a dog profile first!');
      return;
    }

    setIsLiked(liked);

    if (liked) {
      try {
        // Use the first user dog for matching (could be enhanced to let user choose)
        const userDog = userDogs[0];
        
        const { data, error } = await supabase.rpc('check_mutual_match', {
          liker_user_id: user.id,
          liked_user_id: currentDog.user_id,
          liker_dog_uuid: userDog.id,
          liked_dog_uuid: currentDog.id
        });

        if (error) throw error;

        // Check if it resulted in a match
        const { data: matchData, error: matchError } = await supabase
          .from('matches')
          .select('status')
          .eq('liker_dog_id', userDog.id)
          .eq('liked_dog_id', currentDog.id)
          .single();

        if (matchError) throw matchError;

        if (matchData?.status === 'matched') {
          setMatchedDog(currentDog);
          setShowMatchPopup(true);
        } else {
          toast.success('Like sent!');
        }
      } catch (error) {
        console.error('Error creating match:', error);
        toast.error('Failed to create match');
      }
    }
    
    setTimeout(() => {
      setCurrentDogIndex((prev) => (prev + 1) % dogs.length);
      setIsLiked(null);
    }, 300);
  };

  const currentDog = dogs[currentDogIndex];

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
                  <AvatarImage src={currentDog.photo_url || undefined} />
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
                {currentDog.location && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4" />
                    {currentDog.location}
                  </div>
                )}
              </div>
              
              {currentDog.bio && <p className="text-sm">{currentDog.bio}</p>}
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

      {/* Match Success Popup */}
      {showMatchPopup && matchedDog && userDogs.length > 0 && (
        <MatchSuccessPopup
          isOpen={showMatchPopup}
          onClose={() => setShowMatchPopup(false)}
          userDog={userDogs[0]}
          matchedDog={matchedDog}
        />
      )}
    </div>
  );
};

export default Swipe;