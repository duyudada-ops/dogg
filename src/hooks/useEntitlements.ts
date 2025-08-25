import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

type SubRow = {
  user_id: string;
  subscribed: boolean;
  subscription_tier?: string | null;
  subscription_end?: string | null;
};

type DailyUsage = {
  likes: number;
  super_likes: number;
  messages: number;
  boosts: number;
};

export function useEntitlements() {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dailyUsage, setDailyUsage] = useState<DailyUsage>({ likes: 0, super_likes: 0, messages: 0, boosts: 0 });

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: auth } = await supabase.auth.getUser();
    const uid = auth.user?.id;
    if (!uid) { 
      setIsPremium(false); 
      setLoading(false); 
      return; 
    }

    const { data, error } = await supabase
      .from("subscribers")
      .select("user_id, subscribed, subscription_tier, subscription_end")
      .eq("user_id", uid)
      .maybeSingle();

    if (error) {
      console.warn("entitlements error", error);
      setIsPremium(false);
      setLoading(false);
      return;
    }

    const row = data as SubRow | null;
    setIsPremium(!!row?.subscribed);
    setLoading(false);
  }, []);

  const checkWithStripe = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) {
        console.error('Error checking subscription with Stripe:', error);
      } else {
        console.log('Stripe subscription check result:', data);
      }
      // Refresh local data after Stripe check
      await refresh();
    } catch (error) {
      console.error('Error calling check-subscription:', error);
      setLoading(false);
    }
  }, [refresh]);

  useEffect(() => { 
    refresh(); 
  }, [refresh]);

  // Premium feature checks
  const canLike = isPremium || dailyUsage.likes < 5;
  const canSuperLike = isPremium || dailyUsage.super_likes < 1;
  const canMessage = isPremium || dailyUsage.messages < 10;
  const canBoost = isPremium;
  const canSeeWhoLiked = isPremium;
  const canUseAdvancedFilters = isPremium;

  const getUpgradeReason = (action: string): string => {
    switch (action) {
      case 'like':
        return "You've reached your daily like limit. Upgrade to Pro for unlimited likes!";
      case 'super_like':
        return "Upgrade to Pro for more Super Likes per day!";
      case 'message':
        return "You've reached your daily message limit. Upgrade to Pro for unlimited messaging!";
      case 'boost':
        return "Boost your profile to get more visibility! Available with Pro.";
      case 'see_who_liked':
        return "See who liked your dog's profile with Pro!";
      case 'advanced_filters':
        return "Use advanced filters to find the perfect match with Pro!";
      default:
        return "Upgrade to Pro to unlock this feature!";
    }
  };

  return { 
    isPremium, 
    loading, 
    refresh, 
    checkWithStripe,
    dailyUsage,
    canLike,
    canSuperLike,
    canMessage,
    canBoost,
    canSeeWhoLiked,
    canUseAdvancedFilters,
    getUpgradeReason
  };
}