import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, MessageCircle, Droplets, Play, Trees, Users, GraduationCap, Trophy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { usePremiumLimits } from '@/hooks/usePremiumLimits';
import UpsellModal from '@/components/ui/upsell-modal';
import { StatusBadge } from '@/components/ui/status-badge';
import { SkeletonGrid } from '@/components/ui/skeleton-loader';
import { EmptyState } from '@/components/ui/empty-state';

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

  // Mock data for interests with icons
  const interestIcons = {
    water: Droplets,
    fetch: Play, 
    parks: Trees,
    social: Users,
    training: GraduationCap,
    sports: Trophy
  };

  const getRandomInterests = () => {
    const interests = Object.keys(interestIcons);
    return interests.slice(0, Math.floor(Math.random() * 3) + 1);
  };

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
      <div className="space-y-8 p-6 bg-gradient-card-bg rounded-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-h1 font-heading text-foreground">Nearby Dogs</h2>
          <div className="shimmer h-6 w-32 rounded-full"></div>
        </div>
        <SkeletonGrid count={6} />
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
        {dogProfiles.map((dog, index) => {
          const interests = getRandomInterests();
          const isNew = index < 2; // Mark first 2 as new
          const isVerified = Math.random() > 0.6; // Random verification
          const isActive = Math.random() > 0.7; // Random active status

          return (
            <Card key={dog.id} className="overflow-hidden card-hover bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dog.photo_url || '/placeholder.svg'}
                  alt={dog.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Status badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {isActive && <StatusBadge type="active" />}
                  {isNew && <StatusBadge type="new" />}
                  {isVerified && <StatusBadge type="verified" />}
                </div>
                
                {/* Paw icon with micro-interaction */}
                <div className="absolute bottom-4 right-4 paw-pulse text-white text-2xl">
                  🐾
                </div>
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
                  <MapPin className="h-5 w-5 mr-2 text-accent" />
                  <span>{dog.location}</span>
                </div>
                
                {/* Interest tags with icons */}
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => {
                    const Icon = interestIcons[interest as keyof typeof interestIcons];
                    const tagClass = `tag-${interest}`;
                    return (
                      <Badge 
                        key={interest} 
                        className={`${tagClass} px-3 py-1 rounded-full text-xs font-medium shadow-tag hover:shadow-glow transition-shadow cursor-default flex items-center gap-1`}
                      >
                        <Icon className="h-4 w-4" />
                        {interest.charAt(0).toUpperCase() + interest.slice(1)}
                      </Badge>
                    );
                  })}
                </div>
                
                <p className="text-body-relaxed text-foreground/80 line-clamp-3 leading-relaxed">
                  {dog.bio}
                </p>
                
                <div className="flex gap-3 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-h3 py-3 font-medium border-2 hover:bg-primary hover:text-primary-foreground transition-colors button-tap"
                    onClick={() => handleViewProfile(dog.id)}
                    disabled={!canViewProfiles()}
                  >
                    {canViewProfiles() ? 'View Profile' : 'Limit Reached'}
                  </Button>
                  <Button size="sm" className="flex-1 text-h3 py-3 bg-gradient-primary hover:shadow-glow transition-all button-tap">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {dogProfiles.length === 0 && (
        <EmptyState
          title="No furry friends nearby!"
          description="You're off to a great start! Keep checking back as new dogs join the community every day."
          actionLabel="Discover More"
          onAction={() => window.location.href = '/swipe'}
          illustration="discover"
        />
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