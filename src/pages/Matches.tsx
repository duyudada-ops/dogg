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
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-primary/5 to-secondary/5 p-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 font-heading">Your Matches</h1>
          <p className="text-muted-foreground font-body">Connect with dogs that liked you back!</p>
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
            {newMatches.length > 0 ? (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {newMatches.map((match) => {
                  const dog = getMatchedDog(match);
                  if (!dog) return null;
                  
                  return (
                    <div key={match.id} className="flex flex-col items-center space-y-2 min-w-fit">
                      <div className="relative">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={dog.photo_url || undefined} />
                          <AvatarFallback>🐕</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full"></div>
                      </div>
                      <p className="text-sm font-medium text-center">{dog.name}</p>
                      <Badge variant="secondary" className="text-xs">{dog.breed}</Badge>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No new matches yet</p>
            )}
          </CardContent>
        </Card>

        {/* Messages Section with Premium Features */}
        <PremiumMatchesSection matches={matches} />

        {/* Match Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="text-center py-6">
              <p className="text-3xl font-bold text-primary">{matches.length}</p>
              <p className="text-sm text-muted-foreground">Total Matches</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-6">
              <p className="text-3xl font-bold text-green-500">{matches.length}</p>
              <p className="text-sm text-muted-foreground">Active Chats</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-6">
              <p className="text-3xl font-bold text-blue-500">0</p>
              <p className="text-sm text-muted-foreground">Playdates Planned</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Matches;