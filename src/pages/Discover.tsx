import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Heart, Star, Zap, Camera } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useFeedWithDemo } from '@/hooks/useFeedWithDemo';
import { useEntitlements } from '@/hooks/useEntitlements';
import { useNavigate } from 'react-router-dom';

const Discover = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { isPremium, loading: entLoading } = useEntitlements();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [likesToday, setLikesToday] = useState(0);

  const FREE_LIKE_CAP = 10;

  // Extract user location data from metadata if available
  const county = user?.user_metadata?.county ?? user?.app_metadata?.county ?? null;
  const state = user?.user_metadata?.state ?? user?.app_metadata?.state ?? null;
  const lat = user?.user_metadata?.lat ?? null;
  const lng = user?.user_metadata?.lng ?? null;

  const { items: profiles, loading: feedLoading, isDemo } = useFeedWithDemo({
    userCounty: county,
    userState: state,
    userLat: lat,
    userLng: lng,
  });

  const currentProfile = profiles[currentIndex];

  const likeCurrent = async () => {
    if (!isPremium && likesToday >= FREE_LIKE_CAP) {
      navigate("/premium");
      return;
    }
    setLikesToday(l => l + 1);
    await handleSwipe('like');
  };

  const superLikeCurrent = () => {
    if (!isPremium) { 
      navigate("/premium"); 
      return; 
    }
    handleSwipe('super_like');
  };

  const boostProfile = () => {
    if (!isPremium) { 
      navigate("/premium"); 
      return; 
    }
    toast({ title: "Profile boosted! 🚀" });
  };

  const handleSwipe = async (type: 'pass' | 'like' | 'super_like') => {
    if (!user || currentIndex >= profiles.length) return;

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

  if (feedLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <h2 className="text-xl font-medium mb-4">Loading profiles...</h2>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentIndex >= profiles.length) {
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
        {/* Premium upgrade banner */}
        {!entLoading && !isPremium && (
          <div className="mb-3 rounded-lg bg-amber-50 p-3 text-sm">
            Free plan: {FREE_LIKE_CAP} likes/day.{" "}
            <button className="underline" onClick={() => navigate("/premium")}>
              Upgrade for unlimited & boosts →
            </button>
          </div>
        )}

        {/* Daily likes meter */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex justify-between items-center text-sm">
              <span>Daily Likes</span>
              <span className="font-medium">
                {isPremium ? '∞' : `${likesToday}/${FREE_LIKE_CAP}`}
              </span>
              {isDemo && (
                <Badge variant="secondary" className="text-xs">
                  Demo Mode
                </Badge>
              )}
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: isPremium ? '100%' : `${(likesToday / FREE_LIKE_CAP) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Profile Card */}
        <Card className="overflow-hidden shadow-xl">
          <div className="relative">
            {currentProfile?.photoUrl ? (
              <img 
                src={currentProfile.photoUrl} 
                alt={currentProfile.name}
                className="aspect-[3/4] w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '';
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="aspect-[3/4] bg-gradient-to-b from-muted/20 to-muted flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Camera className="h-16 w-16 mx-auto mb-2" />
                  <p>Photo will appear here</p>
                </div>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
              <h2 className="text-2xl font-bold">
                {currentProfile.name}, {currentProfile.age}
              </h2>
              <p className="text-sm opacity-90">
                {currentProfile.breed} • {currentProfile.size}
              </p>
              <p className="text-sm opacity-75">📍 {currentProfile.location}</p>
              {currentProfile?.distanceMiles && (
                <p className="text-sm opacity-75">{currentProfile.distanceMiles} miles away</p>
              )}
            </div>
          </div>

          <CardContent className="p-6">
            {currentProfile.bio && (
              <p className="text-sm text-muted-foreground mb-4">{currentProfile.bio}</p>
            )}
            
            <div className="flex flex-wrap gap-2 mb-4">
              {currentProfile?.temperament?.map((tag) => (
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
            onClick={likeCurrent}
            disabled={loading}
          >
            <Heart className="h-10 w-10" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="rounded-full h-16 w-16 border-2 border-blue-500 hover:bg-blue-50"
            onClick={superLikeCurrent}
            disabled={loading}
          >
            <Star className="h-8 w-8 text-blue-500" />
          </Button>
        </div>

        {/* Boost Button */}
        <div className="text-center mt-4">
          <Button 
            variant="outline" 
            className="text-purple-600 border-purple-600"
            onClick={boostProfile}
          >
            <Zap className="h-4 w-4 mr-2" />
            Boost Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Discover;