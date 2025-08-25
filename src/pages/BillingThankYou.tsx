import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEntitlements } from "@/hooks/useEntitlements";

export default function BillingThankYou() {
  const { refresh } = useEntitlements();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    const verifySubscription = async () => {
      try {
        setStatus("Checking with Stripe...");
        // Call the edge function to verify subscription with Stripe
        const { data, error } = await supabase.functions.invoke('check-subscription');
        
        if (error) {
          console.error('Error checking subscription:', error);
          setStatus("Verification failed, redirecting...");
        } else {
          console.log('Subscription check result:', data);
          setStatus("Activating premium features...");
        }
        
        // Refresh local state
        await refresh();
        
        setTimeout(() => {
          navigate("/discover");
        }, 1000);
        
      } catch (error) {
        console.error('Error verifying subscription:', error);
        setStatus("Error occurred, redirecting...");
        setTimeout(() => {
          navigate("/discover");
        }, 1000);
      }
    };

    const t = setTimeout(verifySubscription, 1500);
    return () => clearTimeout(t);
  }, [refresh, navigate]);

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">Thanks!</h1>
      <p className="mt-2 text-muted-foreground">
        {status}
      </p>
    </div>
  );
}