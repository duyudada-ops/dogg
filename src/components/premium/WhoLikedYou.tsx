import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart } from 'lucide-react';
import PremiumGate from './PremiumGate';
import { useEntitlements } from '@/hooks/useEntitlements';

const WhoLikedYou: React.FC = () => {
  const { isPremium } = useEntitlements();

  // Mock data for demonstration
  const likedByProfiles = [
    { id: '1', name: 'Buddy', photo_url: null, breed: 'Golden Retriever' },
    { id: '2', name: 'Luna', photo_url: null, breed: 'Border Collie' },
    { id: '3', name: 'Max', photo_url: null, breed: 'German Shepherd' },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          Who Liked You
        </CardTitle>
      </CardHeader>
      <CardContent>
        <PremiumGate 
          feature="who_liked_you"
          fallback={
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative -ml-2 first:ml-0">
                    <Avatar className="h-16 w-16 border-4 border-background">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20">
                        ?
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1">
                      <Heart className="h-3 w-3 text-white fill-current" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-sm">
                {likedByProfiles.length} dogs liked your profile
              </p>
            </div>
          }
        >
          <div className="grid gap-4">
            {likedByProfiles.map((profile) => (
              <div key={profile.id} className="flex items-center gap-3 p-3 rounded-lg border">
                <Avatar>
                  <AvatarImage src={profile.photo_url || undefined} />
                  <AvatarFallback>🐕</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium">{profile.name}</h4>
                  <p className="text-sm text-muted-foreground">{profile.breed}</p>
                </div>
                <Heart className="h-5 w-5 text-red-500 fill-current" />
              </div>
            ))}
          </div>
        </PremiumGate>
      </CardContent>
    </Card>
  );
};

export default WhoLikedYou;