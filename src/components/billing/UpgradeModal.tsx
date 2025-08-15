import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Sparkles, Zap, Check, X } from 'lucide-react';
import { createCheckoutSession, pricingConfig } from '@/lib/billing';
import { useToast } from '@/components/ui/use-toast';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: string;
  feature?: string;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  reason,
  feature,
}) => {
  const [loading, setLoading] = useState<'pro_month' | 'pro_year' | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    if (isOpen) {
      trackEvent({
        eventName: AnalyticsEvents.PAYWALL_VIEW,
        properties: { 
          reason,
          feature,
          trigger: 'upgrade_modal'
        },
      });
    }
  }, [isOpen, reason, feature]);

  const handleUpgrade = async (planType: 'pro_month' | 'pro_year') => {
    setLoading(planType);
    
    try {
      const { url, error } = await createCheckoutSession(planType);
      
      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      }
      
      if (url) {
        // Open Stripe checkout in new tab
        window.open(url, '_blank');
        onClose();
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const handleClose = () => {
    trackEvent({
      eventName: AnalyticsEvents.PAYWALL_DISMISS,
      properties: { reason, feature },
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            Upgrade to Pro for Unlimited Access
          </DialogTitle>
          <DialogDescription className="text-lg">
            {reason || "Unlock premium features and help your dog make more friends!"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Free Plan */}
          <Card className="relative border-2 border-muted">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold">Free</h3>
                <div className="text-3xl font-bold">$0</div>
                <div className="text-muted-foreground">Forever</div>
              </div>
              
              <div className="space-y-3">
                {pricingConfig.free.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                {pricingConfig.free.limitations.map((limitation, index) => (
                  <div key={index} className="flex items-center gap-2 opacity-60">
                    <X className="w-4 h-4 text-destructive" />
                    <span className="text-sm">{limitation}</span>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" disabled className="w-full mt-6">
                Current Plan
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="relative border-2 border-primary shadow-xl bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-primary text-white px-3 py-1 font-semibold">
                <Sparkles className="w-3 h-3 mr-1" />
                Most Popular
              </Badge>
            </div>
            
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold">Pro</h3>
                <div className="text-3xl font-bold">$4.99</div>
                <div className="text-muted-foreground">per month</div>
                <div className="text-sm text-primary font-medium mt-1">
                  Or $39.99/year (Save 33%!)
                </div>
              </div>
              
              <div className="space-y-3">
                {pricingConfig.pro_month.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mt-6">
                <Button
                  onClick={() => handleUpgrade('pro_month')}
                  disabled={loading !== null}
                  className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold"
                >
                  {loading === 'pro_month' ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Start Monthly ($4.99)
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={() => handleUpgrade('pro_year')}
                  disabled={loading !== null}
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white font-semibold"
                >
                  {loading === 'pro_year' ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <>
                      <Crown className="w-4 h-4 mr-2" />
                      Start Yearly ($39.99)
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-muted-foreground">
            Cancel anytime • No hidden fees • 7-day free trial
          </p>
          <p className="text-xs text-muted-foreground">
            By upgrading, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};