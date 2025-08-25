// src/lib/payments.ts
import { supabase } from "@/integrations/supabase/client";

// Put your real links here
export const STRIPE_MONTHLY_URL = "https://buy.stripe.com/test_aFa9AS7nA8IncTcevu63K02";
export const STRIPE_ANNUAL_URL = "https://buy.stripe.com/test_4gMdR823g0bR5qKevu63K01";

// Optional: after returning from Stripe, land on this page
export const POST_CHECKOUT_RETURN = "/billing/thank-you";

/**
 * Opens Stripe checkout if authenticated.
 * If not, redirect to /auth and remember to come back to /billing.
 */
export async function startCheckout(planUrl: string, navigate?: (p: string, o?: any) => void) {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    // Remember where to return after login
    localStorage.setItem("postAuthRedirect", "/billing");
    // Redirect to login
    if (navigate) navigate("/auth", { replace: true });
    else window.location.assign("/auth");
    return;
  }

  // Authenticated → go to Stripe
  window.location.assign(planUrl);
}