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
    <div className="container mx-auto py-8 max-w-md bg-gradient-card-bg rounded-2xl shadow-warm min-h-screen">
      <div className="text-center mb-8 px-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          <h1 className="text-display font-heading text-foreground">Discover Dogs</h1>
          {isPremium && <Crown className="h-8 w-8 text-yellow-500 animate-float" />}
        </div>
        <p className="text-h3 text-muted-foreground font-medium">
          {isPremium ? (
            <span className="flex items-center justify-center gap-2">
              <span className="text-primary font-semibold">Unlimited swipes</span>
              <Crown className="h-5 w-5 text-yellow-500" />
            </span>
          ) : (
            <span className="bg-muted/60 px-4 py-2 rounded-full backdrop-blur-sm">
              {5 - dailyUsage.likes} likes remaining today
            </span>
          )}
        </p>
      </div>

      <div className="relative px-6">
        <Card className={`bg-card/80 backdrop-blur-sm border border-border/30 shadow-paw transition-all duration-500 ${
          isLiked === true ? 'translate-x-full opacity-0 rotate-12' : 
          isLiked === false ? '-translate-x-full opacity-0 -rotate-12' : 'hover:shadow-glow'
        }`}>
          <CardContent className="p-0">
            <div className="relative">
              <div className="aspect-[3/4] bg-gradient-warm rounded-t-lg flex items-center justify-center overflow-hidden">
                <Avatar className="h-40 w-40 border-4 border-white/20 shadow-lg">
                  <AvatarImage 
                    src={currentDog.photo_url || undefined} 
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <AvatarFallback className="text-6xl bg-gradient-secondary">🐕</AvatarFallback>
                </Avatar>
              </div>
              
              {/* Like/Pass indicators with improved styling */}
              {isLiked === true && (
                <div className="absolute inset-0 bg-success/30 flex items-center justify-center backdrop-blur-sm">
                  <div className="bg-gradient-to-r from-success to-accent text-white px-8 py-4 rounded-full font-bold text-h2 shadow-glow border-4 border-white/30 animate-scale-in">
                    ❤️ LIKE
                  </div>
                </div>
              )}
              {isLiked === false && (
                <div className="absolute inset-0 bg-destructive/30 flex items-center justify-center backdrop-blur-sm">
                  <div className="bg-gradient-to-r from-destructive to-red-600 text-white px-8 py-4 rounded-full font-bold text-h2 shadow-glow border-4 border-white/30 animate-scale-in">
                    ✖️ PASS
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-8 space-y-6 bg-gradient-to-b from-card/95 to-card">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-display font-heading text-foreground">{currentDog.name}</h2>
                  <Button variant="ghost" size="sm" className="hover:bg-primary/10 transition-colors">
                    <Info className="h-5 w-5 text-primary" />
                  </Button>
                </div>
                <p className="text-h2 text-muted-foreground font-medium">
                  {currentDog.breed} • {currentDog.gender} • {currentDog.age} years old
                </p>
                {currentDog.location && (
                  <div className="flex items-center gap-2 text-h3 text-accent mt-3">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">{currentDog.location}</span>
                  </div>
                )}
              </div>
              
              {currentDog.bio && (
                <p className="text-body-relaxed text-foreground/80 leading-relaxed bg-muted/30 p-4 rounded-xl">
                  {currentDog.bio}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons with enhanced micro-interactions */}
        <div className="flex justify-center gap-8 mt-8 px-6">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full h-20 w-20 p-0 border-3 border-destructive/30 hover:border-destructive hover:bg-destructive/10 transition-all duration-300 hover:scale-110 shadow-card button-tap"
            onClick={() => handleSwipe(false)}
          >
            <X className="h-10 w-10 text-destructive transition-transform hover:rotate-90 duration-300" />
          </Button>
          
          <Button
            size="lg"
            className={`rounded-full h-20 w-20 p-0 transition-all duration-300 hover:scale-110 shadow-card button-tap ${
              canLike 
                ? 'bg-gradient-to-r from-success to-accent hover:shadow-floating' 
                : 'bg-muted hover:bg-muted cursor-not-allowed opacity-50'
            }`}
            onClick={() => handleSwipe(true)}
            disabled={!canLike}
          >
            <Heart className={`h-10 w-10 transition-all duration-300 ${canLike ? 'text-white hover:scale-125 animate-pulse' : 'text-muted-foreground'}`} />
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

      {/* Confetti Animation */}
      <Confetti 
        isActive={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
    </div>
  );
};

export default Swipe;