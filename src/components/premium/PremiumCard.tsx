import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Check, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier?: string;
  subscription_end?: string;
}

const PremiumCard = () => {
  const [subscription, setSubscription] = useState<SubscriptionData>({ subscribed: false });
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const { toast } = useToast();

  const checkSubscription = async () => {
    try {
      setCheckingStatus(true);
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) throw error;
      setSubscription(data);
    } catch (error) {
      console.error('Error checking subscription:', error);
      toast({
        title: "Error",
        description: "Failed to check subscription status",
        variant: "destructive",
      });
    } finally {
      setCheckingStatus(false);
    }
  };

  useEffect(() => {
    checkSubscription();
  }, []);

  const handlePurchase = async (planType: 'monthly' | 'annual' | 'boost') => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planType }
      });
      if (error) throw error;
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error",
        description: "Failed to create checkout session",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw error;
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Error",
        description: "Failed to open subscription management",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingStatus) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Checking subscription status...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-yellow-500" />
          Premium Subscription
          {subscription.subscribed && (
            <Badge variant="secondary" className="ml-auto">
              Active
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {subscription.subscribed ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">
                  {subscription.subscription_tier || 'Premium'} Active
                </span>
              </div>
              {subscription.subscription_end && (
                <p className="text-sm text-green-700">
                  Renews on {new Date(subscription.subscription_end).toLocaleDateString()}
                </p>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleManageSubscription}
                disabled={loading}
                className="flex-1"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Manage Subscription
              </Button>
              <Button 
                onClick={checkSubscription}
                variant="outline"
                size="sm"
              >
                Refresh
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-3">
              <div className="p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Monthly Premium</h4>
                  <span className="font-bold">$4.99/mo</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Unlimited matches, advanced filters, priority support
                </p>
                <Button 
                  onClick={() => handlePurchase('monthly')}
                  disabled={loading}
                  className="w-full"
                  size="sm"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Subscribe Monthly
                </Button>
              </div>

              <div className="p-3 border rounded-lg hover:bg-accent/50 transition-colors border-yellow-200 bg-yellow-50">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Annual Premium</h4>
                    <Badge variant="secondary" className="text-xs">Save 58%</Badge>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">$24.99/yr</span>
                    <p className="text-xs text-muted-foreground line-through">$59.88</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Best value! All premium features at huge savings
                </p>
                <Button 
                  onClick={() => handlePurchase('annual')}
                  disabled={loading}
                  className="w-full"
                  size="sm"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Subscribe Annual
                </Button>
              </div>

              <div className="p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Profile Boost</h4>
                  <span className="font-bold">$2.99</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  One-time boost to increase your profile visibility
                </p>
                <Button 
                  onClick={() => handlePurchase('boost')}
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Buy Boost
                </Button>
              </div>
            </div>

            <Button 
              onClick={checkSubscription}
              variant="ghost"
              size="sm"
              className="w-full"
            >
              Refresh Status
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PremiumCard;