import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Check, Zap, ArrowRight } from 'lucide-react';
import { getPaymentLink } from '@/lib/payments';
import { createCustomerPortalSession, getSubscriptionStatus } from '@/lib/billing';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Billing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const checkSubscription = async () => {
    setCheckingStatus(true);
    try {
      const status = await getSubscriptionStatus();
      setSubscription(status);
    } catch (error) {
      console.error('Error checking subscription:', error);
      // Set a fallback state instead of showing error
      setSubscription(null);
      toast({
        title: "Unable to check subscription",
        description: "You can still upgrade to premium. Click refresh to try again.",
        variant: "default",
      });
    } finally {
      setCheckingStatus(false);
    }
  };

  useEffect(() => {
    checkSubscription();
  }, [user]);

  function openCheckout(plan: "monthly" | "annual") {
    if (!user) {
      // send to auth and come back to billing after login
      navigate("/auth?next=/billing", { replace: true });
      return;
    }
    window.location.href = getPaymentLink(plan);
  }

  const handleManageSubscription = async () => {
    setLoading(true);
    try {
      const { url, error } = await createCustomerPortalSession();
      
      if (error) {
        toast({
          title: "Portal Error",
          description: error,
          variant: "destructive",
        });
        return;
      }

      if (url) {
        window.open(url, '_blank');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open customer portal",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingStatus) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-4 pb-20">
        <div className="max-w-4xl mx-auto pt-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Checking subscription status...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-4 pb-20">
      <div className="max-w-4xl mx-auto pt-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-heading mb-2">Choose Your Plan</h1>
          <p className="text-muted-foreground">Unlock premium features and find more matches for your dog!</p>
        </div>

        {subscription?.subscribed && (
          <Card className="mb-6 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-primary">Premium Active</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {subscription.subscription_tier} plan
                    {subscription.subscription_end && (
                      <span> • Renews {new Date(subscription.subscription_end).toLocaleDateString()}</span>
                    )}
                  </p>
                </div>
                <Button onClick={handleManageSubscription} disabled={loading} variant="outline">
                  Manage Subscription
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* Free Plan */}
          <Card className={subscription?.subscribed ? "opacity-75" : ""}>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Free</CardTitle>
              <div className="text-3xl font-bold">$0</div>
              <p className="text-sm text-muted-foreground">Get started for free</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">5 likes per day</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">1 Super Like daily</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">10 messages per day</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">10-mile event radius</span>
                </div>
              </div>
              {!subscription?.subscribed && (
                <Badge variant="outline" className="w-full justify-center">
                  Current Plan
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* Monthly Premium */}
          <Card className="border-primary/50 relative">
            <CardHeader className="text-center">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                Most Popular
              </Badge>
              <CardTitle className="text-xl flex items-center justify-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                Pro Monthly
              </CardTitle>
              <div className="text-3xl font-bold">$4.99</div>
              <p className="text-sm text-muted-foreground">per month</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Unlimited likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">5 Super Likes daily</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Unlimited messaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">50-mile event radius</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">See who liked you</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Profile boosts</span>
                </div>
              </div>
              <Button 
                onClick={() => openCheckout("monthly")} 
                disabled={subscription?.subscribed}
                className="w-full"
              >
                {subscription?.subscribed ? "Already Subscribed" : "Upgrade Now"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Yearly Premium */}
          <Card className="border-secondary/50">
            <CardHeader className="text-center">
              <Badge variant="secondary" className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                Best Value
              </Badge>
              <CardTitle className="text-xl flex items-center justify-center gap-2">
                <Zap className="h-5 w-5 text-secondary" />
                Pro Yearly
              </CardTitle>
              <div className="text-3xl font-bold">$39.99</div>
              <p className="text-sm text-muted-foreground">per year</p>
              <Badge variant="outline" className="text-xs">
                Save 33%
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Everything in Pro Monthly</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Save $20/year</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Priority support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Early access features</span>
                </div>
              </div>
              <Button 
                onClick={() => openCheckout("annual")} 
                disabled={subscription?.subscribed}
                variant="secondary"
                className="w-full"
              >
                {subscription?.subscribed ? "Already Subscribed" : "Upgrade Now"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8 space-y-4">
          <Button 
            variant="outline" 
            onClick={checkSubscription}
            disabled={loading}
          >
            Refresh Status
          </Button>
          <p className="text-sm text-muted-foreground">
            All plans include a 7-day free trial. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Billing;