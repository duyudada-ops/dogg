import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Star, Zap, Shield, Heart, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: 'out-of-likes' | 'advanced-filters' | 'who-liked-you' | 'extra-rsvps' | 'spotlight-purchase' | 'general';
}

const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose, trigger }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getTriggerContent = () => {
    switch (trigger) {
      case 'out-of-likes':
        return {
          title: "You've used all your daily likes!",
          subtitle: "Upgrade to keep swiping and find your perfect match",
          icon: <Heart className="h-16 w-16 text-red-500 mx-auto mb-4" />
        };
      case 'advanced-filters':
        return {
          title: "Advanced Filters",
          subtitle: "Find dogs by breed, age, size, and distance",
          icon: <Star className="h-16 w-16 text-blue-500 mx-auto mb-4" />
        };
      case 'who-liked-you':
        return {
          title: "See Who Liked You",
          subtitle: "Skip the guessing and see your admirers instantly",
          icon: <Zap className="h-16 w-16 text-purple-500 mx-auto mb-4" />
        };
      case 'extra-rsvps':
        return {
          title: "More Event RSVPs",
          subtitle: "Join unlimited events and meet more dog lovers",
          icon: <MapPin className="h-16 w-16 text-green-500 mx-auto mb-4" />
        };
      case 'spotlight-purchase':
        return {
          title: "Boost Your Profile",
          subtitle: "Get 3x more matches with Premium features",
          icon: <Crown className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        };
      default:
        return {
          title: "Unleash the Full Power of TailCircle",
          subtitle: "Premium features for serious dog lovers",
          icon: <Crown className="h-16 w-16 text-primary mx-auto mb-4" />
        };
    }
  };

  const handlePurchase = async (planType: 'monthly' | 'annual') => {
    try {
      setLoading(true);
      
      // Track paywall conversion attempt
      if ((window as any).gtag) {
        (window as any).gtag('event', 'paywall_attempt', {
          trigger: trigger,
          plan_type: planType
        });
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planType }
      });
      if (error) throw error;
      
      // Track successful checkout creation
      if ((window as any).gtag) {
        (window as any).gtag('event', 'checkout_created', {
          trigger: trigger,
          plan_type: planType
        });
      }

      window.open(data.url, '_blank');
      onClose();
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error",
        description: "Failed to start upgrade process",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const content = getTriggerContent();
  const monthlyPrice = 4.99;
  const annualPrice = 29.99;
  const annualSavings = Math.round(((monthlyPrice * 12 - annualPrice) / (monthlyPrice * 12)) * 100);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="text-center">
            {content.icon}
            <DialogTitle className="text-2xl font-heading">{content.title}</DialogTitle>
            <DialogDescription className="mt-2 font-body text-lg">
              {content.subtitle}
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* Value Bullets */}
        <div className="space-y-4 mt-6">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl">
            <h4 className="font-heading font-semibold mb-4 text-lg">Premium Features:</h4>
            <div className="grid gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="font-body">Unlimited daily likes & matches</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="font-body">See who liked your dog first</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="font-body">Advanced filters (breed, age, distance)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="font-body">50-mile event radius + early access</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="font-body">Profile boost for 3x more visibility</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="font-body">Priority customer support</span>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
            <p className="font-body text-sm italic">
              "My dog found his best friend within a week of going Premium! The advanced filters made all the difference."
            </p>
            <p className="font-body text-xs text-muted-foreground mt-2">— Sarah, Premium member</p>
          </div>

          {/* Pricing Toggle */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-muted p-2 rounded-full">
              <span className={`font-body text-sm px-3 py-1 rounded-full transition-colors ${!isAnnual ? 'bg-background shadow-sm' : ''}`}>
                Monthly
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
              />
              <span className={`font-body text-sm px-3 py-1 rounded-full transition-colors ${isAnnual ? 'bg-background shadow-sm' : ''}`}>
                Annual
                <Badge variant="secondary" className="ml-2 text-xs">Best Value</Badge>
              </span>
            </div>
          </div>

          {/* Pricing Options */}
          <div className="space-y-3">
            {isAnnual ? (
              <div className="border-2 border-primary bg-primary/5 p-4 rounded-xl relative">
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                  Save {annualSavings}%
                </Badge>
                <div className="text-center pt-2">
                  <div className="text-3xl font-bold font-heading">${annualPrice}</div>
                  <div className="text-sm text-muted-foreground font-body">
                    per year • ${(annualPrice / 12).toFixed(2)}/month
                  </div>
                  <div className="text-xs text-muted-foreground line-through font-body">
                    ${(monthlyPrice * 12).toFixed(2)} per year
                  </div>
                </div>
              </div>
            ) : (
              <div className="border p-4 rounded-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold font-heading">${monthlyPrice}</div>
                  <div className="text-sm text-muted-foreground font-body">per month</div>
                </div>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={() => handlePurchase(isAnnual ? 'annual' : 'monthly')} 
              className="w-full font-heading text-lg py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              disabled={loading}
            >
              {loading ? 'Processing...' : (
                <>
                  Start Premium Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
            <Button 
              variant="ghost" 
              onClick={onClose} 
              className="w-full font-body"
            >
              Maybe Later
            </Button>
          </div>

          {/* Guarantee */}
          <div className="text-center bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-green-800 font-heading text-sm">7-Day Money Back Guarantee</span>
            </div>
            <p className="text-xs text-green-700 font-body">
              Not satisfied? Get a full refund within 7 days, no questions asked.
            </p>
          </div>

          {/* Mini FAQ */}
          <div className="space-y-2 text-xs text-muted-foreground font-body">
            <details className="group">
              <summary className="cursor-pointer font-medium">Can I cancel anytime?</summary>
              <p className="mt-1 pl-4">Yes, cancel anytime from your account settings.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium">What payment methods do you accept?</summary>
              <p className="mt-1 pl-4">All major credit cards, PayPal, and Apple Pay.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium">Is my data secure?</summary>
              <p className="mt-1 pl-4">Yes, we use bank-level encryption and never share your data.</p>
            </details>
          </div>

          {/* Legal Footer */}
          <div className="text-center text-xs text-muted-foreground font-body border-t pt-3">
            <p>
              By subscribing, you agree to our{' '}
              <a href="/terms-of-service.html" className="underline hover:text-foreground">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy-policy.html" className="underline hover:text-foreground">Privacy Policy</a>.
              Automatic renewal can be disabled anytime.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaywallModal;