import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { usePremiumLimits } from '@/hooks/usePremiumLimits';
import UpsellModal from '@/components/ui/upsell-modal';
import { SafeImage } from '@/components/SafeImage';

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-heading">Nearby Dogs</h2>
        {!premiumStatus.isSubscribed && (
          <Badge variant="outline" className="font-body">
            Profile Views: {usageLimits.profileViews}/{usageLimits.maxProfileViews} Today
          </Badge>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dogProfiles.map((dog) => (
          <Card key={dog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <SafeImage
                src={dog.photo_url || ''}
                alt={`${dog.name} - ${dog.breed}`}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{dog.name}</h3>
                <Badge variant="secondary">{dog.age}y</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{dog.breed}</p>
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <MapPin className="h-3 w-3 mr-1" />
                {dog.location}
              </div>
              <p className="text-sm mb-4 line-clamp-2">{dog.bio}</p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 font-heading"
                  onClick={() => handleViewProfile(dog.id)}
                  disabled={!canViewProfiles()}
                >
                  {canViewProfiles() ? 'View Profile' : 'Limit Reached'}
                </Button>
                <Button size="sm" className="flex-1 font-body">
                  <MessageCircle className="h-3 w-3 mr-1" />
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