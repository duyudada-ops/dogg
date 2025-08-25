import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useEntitlements } from "@/hooks/useEntitlements";

export default function BillingThankYou() {
  const navigate = useNavigate();
  const { refresh } = useEntitlements();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifySubscription = async () => {
      try {
        // Call the edge function to verify subscription with Stripe
        const { data, error } = await supabase.functions.invoke('check-subscription');
        
        if (error) {
          console.error('Error checking subscription:', error);
        } else {
          console.log('Subscription check result:', data);
        }
        
        // Refresh local state
        await refresh();
        setIsVerifying(false);
        
      } catch (error) {
        console.error('Error verifying subscription:', error);
        setIsVerifying(false);
      }
    };

    const t = setTimeout(verifySubscription, 1500);
    return () => clearTimeout(t);
  }, [refresh]);

  async function openPortal() {
    const { data, error } = await supabase.functions.invoke("customer-portal");
    if (error) return alert(error.message);
    window.location.href = data.url;
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#FFF7EF] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0FB5A9] mx-auto"></div>
          <p className="mt-4 text-[#1F2937]">Activating premium features...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF7EF] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl shadow-xl bg-white">
          {/* Confetti dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -top-6 left-10 h-4 w-4 rounded-full bg-rose-400" />
            <div className="absolute top-6 right-20 h-3 w-3 rounded-full bg-orange-400" />
            <div className="absolute bottom-8 left-24 h-2 w-2 rounded-full bg-teal-400" />
            <div className="absolute bottom-12 right-10 h-3 w-3 rounded-full bg-violet-400" />
          </motion.div>

          <div className="grid md:grid-cols-[1.1fr,0.9fr]">
            {/* Left: copy */}
            <div className="p-8 md:p-10">
              <motion.h1
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl md:text-4xl font-bold text-[#1F2937]"
              >
                🎉 You're Pro!
              </motion.h1>
              <p className="mt-2 text-gray-600">
                Unlimited likes, super likes, and priority visibility are now unlocked.
              </p>

              {/* Benefits */}
              <ul className="mt-6 space-y-3">
                {[
                  "Unlimited likes & 5 super likes daily",
                  "See who liked your pup",
                  "Bigger match radius & priority placement",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[#1F2937]">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-[#22C55E]">✔</span>
                    {t}
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  onClick={() => navigate("/discover")}
                  className="h-11 px-6 bg-gradient-to-r from-rose-500 to-orange-400 text-white hover:opacity-95"
                >
                  Start Swiping
                </Button>
                <Button
                  onClick={() => navigate("/profile")}
                  variant="outline"
                  className="h-11 px-6 border-violet-300 text-violet-700 hover:bg-violet-50"
                >
                  Complete Profile
                </Button>
                <Button onClick={openPortal} variant="ghost" className="h-11">
                  Manage Subscription
                </Button>
              </div>

              <p className="mt-4 text-sm text-gray-500">
                A receipt was sent to your email. Questions? <span className="underline cursor-pointer">Support</span>
              </p>
            </div>

            {/* Right: visual */}
            <div className="relative bg-teal-50">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100 via-white to-rose-100 opacity-80" />
              <div className="relative h-full p-8 flex items-center justify-center">
                {/* Happy pup illustration placeholder */}
                <div className="aspect-[4/5] w-56 md:w-64 rounded-2xl bg-white shadow-lg border border-teal-100 flex items-center justify-center">
                  <span className="text-[#0FB5A9] text-lg font-medium">🐶 Tail wag unlocked</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-note */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Tip: boost your profile to jump the queue.
        </div>
      </div>
    </div>
  );
}