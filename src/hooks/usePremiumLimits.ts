import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface PremiumStatus {
  isSubscribed: boolean;
  subscription_tier?: string;
  subscription_end?: string;
}

interface UsageLimits {
  profileViews: number;
  messages: number;
  maxProfileViews: number;
  maxMessages: number;
}

export const usePremiumLimits = () => {
  const { user } = useAuth();
  const [premiumStatus, setPremiumStatus] = useState<PremiumStatus>({ isSubscribed: false });
  const [usageLimits, setUsageLimits] = useState<UsageLimits>({
    profileViews: 0,
    messages: 0,
    maxProfileViews: 10,
    maxMessages: 5
  });
  const [loading, setLoading] = useState(true);

  const checkPremiumStatus = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) throw error;
      setPremiumStatus(data);
    } catch (error) {
      console.error('Error checking premium status:', error);
    }
  };

  const getTodayUsage = async () => {
    if (!user) return;

    try {
      // Get today's swipe count (profile views)
      const { data: swipeData, error: swipeError } = await supabase
        .rpc('get_daily_swipe_count', { user_uuid: user.id });
      
      if (swipeError) throw swipeError;

      // For messages, we'll check matches created today as a proxy
      const today = new Date().toISOString().split('T')[0];
      const { data: matchData, error: matchError } = await supabase
        .from('matches')
        .select('id')
        .eq('liker_user_id', user.id)
        .gte('created_at', `${today}T00:00:00Z`)
        .lte('created_at', `${today}T23:59:59Z`);

      if (matchError) throw matchError;

      setUsageLimits({
        profileViews: swipeData || 0,
        messages: matchData?.length || 0,
        maxProfileViews: premiumStatus.isSubscribed ? 999 : 10,
        maxMessages: premiumStatus.isSubscribed ? 999 : 5
      });
    } catch (error) {
      console.error('Error getting usage limits:', error);
    }
  };

  const canViewProfiles = () => {
    return premiumStatus.isSubscribed || usageLimits.profileViews < usageLimits.maxProfileViews;
  };

  const canSendMessages = () => {
    return premiumStatus.isSubscribed || usageLimits.messages < usageLimits.maxMessages;
  };

  const incrementProfileView = async () => {
    if (!user || !canViewProfiles()) return false;

    try {
      await supabase.rpc('increment_daily_swipes', { user_uuid: user.id });
      setUsageLimits(prev => ({ ...prev, profileViews: prev.profileViews + 1 }));
      return true;
    } catch (error) {
      console.error('Error incrementing profile view:', error);
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      const initializeLimits = async () => {
        setLoading(true);
        await checkPremiumStatus();
        await getTodayUsage();
        setLoading(false);
      };
      initializeLimits();
    }
  }, [user]);

  useEffect(() => {
    if (user && !loading) {
      getTodayUsage();
    }
  }, [premiumStatus, user, loading]);

  return {
    premiumStatus,
    usageLimits,
    canViewProfiles,
    canSendMessages,
    incrementProfileView,
    refreshLimits: getTodayUsage,
    loading
  };
};