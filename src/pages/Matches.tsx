import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Heart, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import PremiumMatchesSection from '@/components/home/PremiumMatchesSection';

interface MatchWithDog {
  id: string;
  status: string;
  created_at: string;
  liker_dog: {
    id: string;
    name: string;
    breed: string;
    photo_url: string | null;
    user_id: string;
    location: string | null;
  } | null;
  liked_dog: {
    id: string;
    name: string;
    breed: string;
    photo_url: string | null;
    user_id: string;
    location: string | null;
  } | null;
}

const Matches = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState<MatchWithDog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMatches();
    }
  }, [user]);

  const fetchMatches = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('matches')
        .select(`
          id,
          status,
          created_at,
          liker_dog_id,
          liked_dog_id,
          dog_profiles!matches_liker_dog_id_fkey (
            id,
            name,
            breed,
            photo_url,
            user_id,
            location
          ),
          dog_profiles!matches_liked_dog_id_fkey (
            id,
            name,
            breed,
            photo_url,
            user_id,
            location
          )
        `)
        .eq('status', 'matched')
        .or(`liker_user_id.eq.${user.id},liked_user_id.eq.${user.id}`);

      if (error) throw error;

      // Transform the data to match our interface
      const transformedMatches = data?.map(match => ({
        id: match.id,
        status: match.status,
        created_at: match.created_at,
        liker_dog: match.dog_profiles![0] || null,
        liked_dog: match.dog_profiles![1] || null
      })) || [];

      setMatches(transformedMatches as MatchWithDog[]);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMatchedDog = (match: MatchWithDog) => {
    if (!match.liker_dog || !match.liked_dog) return null;
    // Return the dog that is NOT owned by the current user
    return match.liker_dog.user_id === user?.id ? match.liked_dog : match.liker_dog;
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const newMatches = matches.filter(match => {
    const daysSinceMatch = (new Date().getTime() - new Date(match.created_at).getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceMatch <= 3; // Consider matches from last 3 days as "new"
  });

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-primary/5 to-secondary/5 p-4 pb-20">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading matches...</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-warm p-4 pb-20 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-primary/5 text-9xl animate-float">💖</div>
        <div className="absolute bottom-32 right-16 text-secondary/5 text-7xl animate-wiggle">🐾</div>
        <div className="absolute top-1/2 left-1/4 text-accent/5 text-6xl animate-heart-beat">✨</div>
      </div>
      
      <div className="relative max-w-4xl mx-auto space-y-8">
        <div className="text-center glass-morphism p-8 rounded-3xl border border-white/20">
          <div className="mb-4">
            <div className="inline-flex items-center gap-3 bg-gradient-primary rounded-full px-6 py-3 text-white font-semibold shadow-lg">
              <Heart className="h-5 w-5 animate-heart-beat" />
              Your Premium Matches
              <Heart className="h-5 w-5 animate-heart-beat" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Love Connections
          </h1>
          <p className="text-xl text-muted-foreground font-body">Where paws meet hearts and friendships bloom! 🌸</p>
        </div>

        {/* New Matches Section */}
        <Card className="glass-morphism border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full">
                <Heart className="h-6 w-6 text-white animate-heart-beat" />
              </div>
              <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent font-bold">
                Fresh Matches
              </span>
              <Badge className="bg-red-500 text-white animate-bounce-gentle">New!</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {newMatches.length > 0 ? (
              <div className="flex gap-6 overflow-x-auto pb-4">
                {newMatches.map((match) => {
                  const dog = getMatchedDog(match);
                  if (!dog) return null;
                  
                  return (
                    <div key={match.id} className="flex flex-col items-center space-y-3 min-w-fit group hover:scale-105 transition-all duration-300">
                      <div className="relative">
                        <Avatar className="h-20 w-20 ring-4 ring-gradient-primary group-hover:ring-offset-4 transition-all duration-300">
                          <AvatarImage src={dog.photo_url || undefined} className="object-cover" />
                          <AvatarFallback className="text-2xl">🐕</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-2 -right-2 h-6 w-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-glow-pulse">
                          <Heart className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{dog.name}</p>
                        <Badge variant="outline" className="text-xs bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                          {dog.breed}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 animate-bounce">💝</div>
                <p className="text-xl text-muted-foreground mb-2">No new matches yet</p>
                <p className="text-sm text-muted-foreground">Keep swiping to find your perfect match!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Messages Section with Premium Features */}
        <PremiumMatchesSection matches={matches} />

        {/* Premium Match Stats */}
        <div className="grid grid-cols-3 gap-6">
          <Card className="glass-morphism border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group">
            <CardContent className="text-center py-8">
              <div className="mb-4 p-4 bg-gradient-primary rounded-full w-fit mx-auto group-hover:scale-110 transition-transform">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <p className="text-4xl font-bold text-primary mb-2 group-hover:scale-105 transition-transform">{matches.length}</p>
              <p className="text-sm text-muted-foreground font-medium">Total Matches</p>
            </CardContent>
          </Card>
          <Card className="glass-morphism border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group">
            <CardContent className="text-center py-8">
              <div className="mb-4 p-4 bg-gradient-secondary rounded-full w-fit mx-auto group-hover:scale-110 transition-transform">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <p className="text-4xl font-bold text-success mb-2 group-hover:scale-105 transition-transform">{matches.length}</p>
              <p className="text-sm text-muted-foreground font-medium">Active Chats</p>
            </CardContent>
          </Card>
          <Card className="glass-morphism border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group">
            <CardContent className="text-center py-8">
              <div className="mb-4 p-4 bg-gradient-warm rounded-full w-fit mx-auto group-hover:scale-110 transition-transform">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <p className="text-4xl font-bold text-accent mb-2 group-hover:scale-105 transition-transform">0</p>
              <p className="text-sm text-muted-foreground font-medium">Playdates Planned</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Matches;