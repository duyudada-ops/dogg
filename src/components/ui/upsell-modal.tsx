import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown, Star, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'profile-views' | 'messages' | 'events';
}

const UpsellModal: React.FC<UpsellModalProps> = ({ isOpen, onClose, type }) => {
  const { toast } = useToast();

  const getModalContent = () => {
    switch (type) {
      case 'profile-views':
        return {
          title: "You've reached your daily limit!",
          description: "Free users can view 10 profiles per day. Upgrade to Premium for unlimited access.",
          icon: <Star className="h-12 w-12 text-primary mx-auto mb-4" />
        };
      case 'messages':
        return {
          title: "Message limit reached!",
          description: "Free users can send 5 messages per day. Get Premium for unlimited messaging.",
          icon: <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
        };
      case 'events':
        return {
          title: "Premium Events Available!",
          description: "Upgrade to Premium for early access to events and extended 50-mile radius.",
          icon: <Crown className="h-12 w-12 text-primary mx-auto mb-4" />
        };
      default:
        return {
          title: "Upgrade to Premium",
          description: "Get unlimited access to all TailCircle features.",
          icon: <Crown className="h-12 w-12 text-primary mx-auto mb-4" />
        };
    }
  };

  const handleUpgrade = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planType: 'monthly' }
      });
      if (error) throw error;
      window.open(data.url, '_blank');
      onClose();
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error",
        description: "Failed to start upgrade process",
        variant: "destructive",
      });
    }
  };

  const content = getModalContent();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="text-center">
            {content.icon}
            <DialogTitle className="text-xl font-heading">{content.title}</DialogTitle>
            <DialogDescription className="mt-2 font-body">
              {content.description}
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="space-y-4 mt-6">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
            <h4 className="font-heading font-semibold mb-2">Premium Benefits:</h4>
            <ul className="space-y-1 text-sm font-body">
              <li>• Unlimited profile views</li>
              <li>• Unlimited messages</li>
              <li>• 50-mile event radius</li>
              <li>• Early event access</li>
              <li>• Priority support</li>
            </ul>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 font-body">
              Maybe Later
            </Button>
            <Button onClick={handleUpgrade} className="flex-1 font-heading">
              Upgrade for $4.99/mo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpsellModal;