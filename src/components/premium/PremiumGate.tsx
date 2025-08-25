import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Lock } from 'lucide-react';
import PaywallModal from '@/components/paywall/PaywallModal';
import { useEntitlements } from '@/hooks/useEntitlements';

interface PremiumGateProps {
  feature: 'advanced_filters' | 'who_liked_you' | 'boost' | 'unlimited_likes';
  children: React.ReactNode;
  fallback?: React.ReactNode;
  inline?: boolean;
}

const PremiumGate: React.FC<PremiumGateProps> = ({ 
  feature, 
  children, 
  fallback,
  inline = false 
}) => {
  const { isPremium, getUpgradeReason } = useEntitlements();
  const [showPaywall, setShowPaywall] = useState(false);

  const getTrigger = (): 'advanced-filters' | 'who-liked-you' | 'spotlight-purchase' | 'out-of-likes' | 'general' => {
    switch (feature) {
      case 'advanced_filters':
        return 'advanced-filters';
      case 'who_liked_you':
        return 'who-liked-you';
      case 'boost':
        return 'spotlight-purchase';
      case 'unlimited_likes':
        return 'out-of-likes';
      default:
        return 'general';
    }
  };

  if (isPremium) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (inline) {
    return (
      <>
        <Button
          variant="outline"
          onClick={() => setShowPaywall(true)}
          className="relative"
        >
          <Lock className="h-4 w-4 mr-2" />
          Upgrade to Pro
          <Badge variant="secondary" className="ml-2">
            <Crown className="h-3 w-3" />
          </Badge>
        </Button>
        <PaywallModal
          isOpen={showPaywall}
          onClose={() => setShowPaywall(false)}
          trigger={getTrigger()}
        />
      </>
    );
  }

  return (
    <>
      <div className="text-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg bg-muted/10">
        <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Premium Feature</h3>
        <p className="text-muted-foreground mb-4 text-sm">
          {getUpgradeReason(feature)}
        </p>
        <Button onClick={() => setShowPaywall(true)}>
          <Crown className="h-4 w-4 mr-2" />
          Upgrade to Pro
        </Button>
      </div>
      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        trigger={getTrigger()}
      />
    </>
  );
};

export default PremiumGate;