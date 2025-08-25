import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

type SubRow = {
  user_id: string;
  subscribed: boolean;
  subscription_tier?: string | null;
  subscription_end?: string | null;
};

export function useEntitlements() {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

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

  return { isPremium, loading, refresh, checkWithStripe };
}