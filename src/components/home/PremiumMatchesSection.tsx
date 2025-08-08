import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, MessageCircle } from 'lucide-react';
import { usePremiumLimits } from '@/hooks/usePremiumLimits';
import UpsellModal from '@/components/ui/upsell-modal';

interface MatchWithProfiles {
  id: string;
  status: string;
  created_at: string;
  liker_dog_profile?: {
    id: string;
    name: string;
    breed: string;
    photo_url: string | null;
    user_id: string;
    location: string | null;
  };
  liked_dog_profile?: {
    id: string;
    name: string;
    breed: string;
    photo_url: string | null;
    user_id: string;
    location: string | null;
  };
}

interface PremiumMatchesSectionProps {
  matches: MatchWithProfiles[];
}

const PremiumMatchesSection: React.FC<PremiumMatchesSectionProps> = ({ matches }) => {
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const { canSendMessages, usageLimits, premiumStatus } = usePremiumLimits();

  const handleSendMessage = (matchId: string, dogName: string) => {
    if (!canSendMessages()) {
      setShowUpsellModal(true);
      return;
    }
    console.log('Sending message to', dogName);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-heading">
            <MessageCircle className="h-5 w-5 text-blue-500" />
            Messages
            {!premiumStatus.isSubscribed && (
              <Badge variant="outline" className="ml-auto font-body">
                {usageLimits.messages}/{usageLimits.maxMessages} Today
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {matches.length > 0 ? (
            <div className="space-y-4">
              {matches.map((match) => {
                const otherDog = match.liked_dog_profile?.user_id !== match.liker_dog_profile?.user_id 
                  ? match.liked_dog_profile 
                  : match.liker_dog_profile;
                
                if (!otherDog) return null;
                
                return (
                  <div key={match.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <img 
                        src={otherDog.photo_url || '/placeholder.svg'} 
                        alt={otherDog.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium font-heading">{otherDog.name}</p>
                        <p className="text-sm text-muted-foreground font-body">{otherDog.breed}</p>
                        {match.status === 'matched' && (
                          <Badge variant="default" className="text-xs font-body">
                            🎉 Mutual Match!
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {match.status === 'matched' && (
                      <Button
                        onClick={() => handleSendMessage(match.id, otherDog.name)}
                        className="font-heading"
                        disabled={!canSendMessages()}
                        variant={canSendMessages() ? "default" : "outline"}
                      >
                        {canSendMessages() ? (
                          <>
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </>
                        ) : (
                          <>
                            <Crown className="h-4 w-4 mr-2" />
                            Upgrade to Message
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8 font-body">
              No matches yet. Keep swiping!
            </p>
          )}
        </CardContent>
      </Card>
      
      <UpsellModal
        isOpen={showUpsellModal}
        onClose={() => setShowUpsellModal(false)}
        type="messages"
      />
    </>
  );
};

export default PremiumMatchesSection;