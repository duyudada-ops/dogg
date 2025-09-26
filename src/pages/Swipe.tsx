import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, X, MapPin, Info, Crown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import MatchSuccessPopup from '@/components/match/MatchSuccessPopup';
import PaywallModal from '@/components/paywall/PaywallModal';
import { useEntitlements } from '@/hooks/useEntitlements';
import { Confetti } from '@/components/ui/confetti';
import { StatusBadge } from '@/components/ui/status-badge';
import { SafeImage } from '@/components/SafeImage';

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
  const { canLike, isPremium, dailyUsage, getUpgradeReason } = useEntitlements();
  const [dogs, setDogs] = useState<DogProfile[]>([]);
  const [currentDogIndex, setCurrentDogIndex] = useState(0);
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [userDogs, setUserDogs] = useState<DogProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMatchPopup, setShowMatchPopup] = useState(false);
  const [matchedDog, setMatchedDog] = useState<DogProfile | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

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

    // Check premium limits for likes
    if (liked && !canLike) {
      setShowPaywall(true);
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
          setShowConfetti(true);
          toast.success('It\'s a match! 🎉');
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
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="text-2xl font-bold">Discover Dogs</h1>
          {isPremium && <Crown className="h-6 w-6 text-yellow-500" />}
        </div>
        <p className="text-muted-foreground">
          {isPremium ? 'Unlimited swipes' : `${5 - dailyUsage.likes} likes remaining today`}
        </p>
      </div>

      <div className="relative">
        <Card className={`swipe-card-gradient shadow-warm transition-all duration-300 hover:scale-[1.02] ${
          isLiked === true ? 'translate-x-full opacity-0 animate-match-celebration' : 
          isLiked === false ? '-translate-x-full opacity-0' : ''
        }`}>
          <CardContent className="p-0">
            <div className="relative overflow-hidden rounded-t-lg">
              <div className="aspect-[3/4] bg-gradient-to-br from-primary/5 to-secondary/5">
                <SafeImage
                  src={currentDog.photo_url || ''}
                  alt={`${currentDog.name} - ${currentDog.breed}`}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              
              {/* Status badges overlay */}
              <div className="absolute top-4 left-4 flex gap-2">
                <StatusBadge status="verified" />
                <StatusBadge status="active" />
              </div>
              
              {/* Enhanced Like/Pass indicators */}
              {isLiked === true && (
                <div className="absolute inset-0 bg-gradient-to-br from-success/30 to-success/10 backdrop-blur-sm flex items-center justify-center">
                  <div className="bg-success text-success-foreground px-8 py-4 rounded-full font-bold text-2xl shadow-glow animate-glow-pulse border-2 border-success/30">
                    💚 LIKE
                  </div>
                </div>
              )}
              {isLiked === false && (
                <div className="absolute inset-0 bg-gradient-to-br from-destructive/30 to-destructive/10 backdrop-blur-sm flex items-center justify-center">
                  <div className="bg-destructive text-destructive-foreground px-8 py-4 rounded-full font-bold text-2xl shadow-lg border-2 border-destructive/30">
                    ✖️ PASS
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 space-y-4 bg-gradient-to-t from-card/95 to-card/80 backdrop-blur-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {currentDog.name}
                  </h1>
                  <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-lg text-muted-foreground font-medium">
                  {currentDog.breed} • {currentDog.gender} • {currentDog.age} years old
                </p>
                {currentDog.location && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 bg-muted/30 rounded-full px-3 py-1 w-fit">
                    <MapPin className="h-4 w-4" />
                    {currentDog.location}
                  </div>
                )}
              </div>
              
              {currentDog.bio && (
                <div className="bg-muted/20 rounded-lg p-4">
                  <p className="text-sm leading-relaxed">{currentDog.bio}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Action Buttons */}
        <div className="flex justify-center gap-6 mt-8">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full h-20 w-20 p-0 border-2 border-destructive/20 hover:bg-destructive/10 hover:border-destructive/40 hover:scale-110 transition-all duration-200 shadow-lg"
            onClick={() => handleSwipe(false)}
          >
            <X className="h-10 w-10 text-destructive" />
          </Button>
          
          <Button
            size="lg"
            className={`rounded-full h-20 w-20 p-0 transition-all duration-200 shadow-lg ${
              canLike 
                ? 'bg-success hover:bg-success/90 hover:scale-110 shadow-success/30 animate-glow-pulse' 
                : 'bg-muted hover:bg-muted cursor-not-allowed opacity-50'
            }`}
            onClick={() => handleSwipe(true)}
            disabled={!canLike}
          >
            <Heart className={`h-10 w-10 ${canLike ? 'text-white' : 'text-muted-foreground'}`} />
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

      {/* Paywall Modal */}
      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        trigger="out-of-likes"
      />

      {/* Confetti Effect */}
      <Confetti trigger={showConfetti} />
    </div>
  );
};

export default Swipe;