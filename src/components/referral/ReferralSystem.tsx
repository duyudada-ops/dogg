import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Gift, Copy, Share, Users, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ReferralStats {
  referrals_sent: number;
  referrals_completed: number;
  bonus_likes_earned: number;
}

const ReferralSystem: React.FC = () => {
  const [referralCode, setReferralCode] = useState<string>('');
  const [stats, setStats] = useState<ReferralStats>({ referrals_sent: 0, referrals_completed: 0, bonus_likes_earned: 0 });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      generateReferralCode();
      fetchReferralStats();
    }
  }, [user]);

  const generateReferralCode = () => {
    if (user) {
      // Generate a simple referral code based on user ID
      const code = user.id.slice(0, 8).toUpperCase();
      setReferralCode(code);
    }
  };

  const fetchReferralStats = async () => {
    if (!user) return;

    try {
      // This would typically come from a database table tracking referrals
      // For now, we'll use mock data
      setStats({
        referrals_sent: 3,
        referrals_completed: 1,
        bonus_likes_earned: 10
      });
    } catch (error) {
      console.error('Error fetching referral stats:', error);
    }
  };

  const handleCopyLink = async () => {
    const referralLink = `${window.location.origin}/r/${referralCode}`;
    
    try {
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: "Link Copied!",
        description: "Your referral link has been copied to clipboard.",
      });

      // Track referral_started event
      if ((window as any).gtag) {
        (window as any).gtag('event', 'referral_started', {
          referral_code: referralCode,
          method: 'copy_link'
        });
      }
    } catch (error) {
      console.error('Failed to copy:', error);
      toast({
        title: "Copy Failed",
        description: "Please manually copy the link.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    const referralLink = `${window.location.origin}/r/${referralCode}`;
    const shareText = `Join me on TailCircle and help your dog make new friends! Use my link and we both get +10 free likes: ${referralLink}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join TailCircle',
          text: shareText,
          url: referralLink,
        });

        // Track referral_started event
        if ((window as any).gtag) {
          (window as any).gtag('event', 'referral_started', {
            referral_code: referralCode,
            method: 'native_share'
          });
        }
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      // Fallback to copy
      handleCopyLink();
    }
  };

  const referralLink = `${window.location.origin}/r/${referralCode}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          Refer Friends & Earn Likes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* How it works */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
          <h4 className="font-semibold font-heading mb-2">How it works:</h4>
          <div className="space-y-1 text-sm font-body">
            <p>1. Share your referral link with friends</p>
            <p>2. They sign up and complete their profile</p>
            <p>3. You both get +10 bonus likes instantly!</p>
          </div>
        </div>

        {/* Referral Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats.referrals_sent}</div>
            <div className="text-xs text-muted-foreground">Invited</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.referrals_completed}</div>
            <div className="text-xs text-muted-foreground">Joined</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">{stats.bonus_likes_earned}</div>
            <div className="text-xs text-muted-foreground">Bonus Likes</div>
          </div>
        </div>

        {/* Referral Link */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Your Referral Link:</label>
          <div className="flex gap-2">
            <Input
              value={referralLink}
              readOnly
              className="font-mono text-sm"
            />
            <Button onClick={handleCopyLink} variant="outline" size="sm">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="flex gap-2">
          <Button onClick={handleShare} className="flex-1">
            <Share className="h-4 w-4 mr-2" />
            Share Link
          </Button>
          <Button onClick={handleCopyLink} variant="outline" className="flex-1">
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
        </div>

        {/* Bonus Info */}
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <p className="text-sm font-body text-muted-foreground">
            Help your friends find their dog's perfect playmate and earn free likes!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralSystem;