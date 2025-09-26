import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { usePremiumLimits } from '@/hooks/usePremiumLimits';
import UpsellModal from '@/components/ui/upsell-modal';

interface DogProfile {
  id: string;
  name: string;
  breed: string;
  age: number;
  location: string;
  bio: string;
  photo_url: string;
  user_id: string;
}

const DogProfileGrid = () => {
  const { user } = useAuth();
  const [dogProfiles, setDogProfiles] = useState<DogProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const { usageLimits, canViewProfiles, incrementProfileView, premiumStatus } = usePremiumLimits();

  useEffect(() => {
    if (user) {
      fetchNearbyDogs();
    }
  }, [user]);

  const fetchNearbyDogs = async () => {
    try {
      const { data, error } = await supabase
        .from('dog_profiles')
        .select('*')
        .neq('user_id', user?.id)
        .limit(20);

      if (error) throw error;
      setDogProfiles(data || []);
    } catch (error) {
      console.error('Error fetching dogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = async (profileId: string) => {
    if (!canViewProfiles()) {
      setShowUpsellModal(true);
      return;
    }
    
    const success = await incrementProfileView();
    if (success) {
      console.log(`Viewed profile ${profileId}. Total views: ${usageLimits.profileViews + 1}`);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-muted rounded-t-lg"></div>
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 bg-gradient-card-bg rounded-2xl">
      <div className="flex justify-between items-center">
        <h2 className="text-h1 font-heading text-foreground">Nearby Dogs</h2>
        {!premiumStatus.isSubscribed && (
          <Badge variant="outline" className="font-body text-small-relaxed bg-muted/80 backdrop-blur-sm">
            Profile Views: {usageLimits.profileViews}/{usageLimits.maxProfileViews} Today
          </Badge>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dogProfiles.map((dog) => (
          <Card key={dog.id} className="overflow-hidden hover:shadow-warm transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50">
            <div className="relative h-56 overflow-hidden">
              <img
                src={dog.photo_url || '/placeholder.svg'}
                alt={dog.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-display font-heading text-foreground">{dog.name}</h3>
                <Badge variant="secondary" className="text-h3 px-3 py-1 bg-primary/10 text-primary border-primary/20">
                  {dog.age}y
                </Badge>
              </div>
              
              <p className="text-h3 text-muted-foreground font-medium">{dog.breed}</p>
              
              <div className="flex items-center text-h3 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 text-accent" />
                <span>{dog.location}</span>
              </div>
              
              <p className="text-body-relaxed text-foreground/80 line-clamp-3 leading-relaxed">
                {dog.bio}
              </p>
              
              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-h3 py-3 font-medium border-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleViewProfile(dog.id)}
                  disabled={!canViewProfiles()}
                >
                  {canViewProfiles() ? 'View Profile' : 'Limit Reached'}
                </Button>
                <Button size="sm" className="flex-1 text-h3 py-3 bg-gradient-primary hover:shadow-glow transition-all">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {dogProfiles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground font-body">No dogs found nearby. Check back later!</p>
        </div>
      )}
      
      <UpsellModal
        isOpen={showUpsellModal}
        onClose={() => setShowUpsellModal(false)}
        type="profile-views"
      />
    </div>
  );
};

export default DogProfileGrid;