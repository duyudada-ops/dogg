// src/lib/payments.ts
import { supabase } from "@/integrations/supabase/client";

export const STRIPE_LINK_MONTHLY = "https://buy.stripe.com/test_aFa9AS7nA8IncTcevu63K02";
export const STRIPE_LINK_ANNUAL = "https://buy.stripe.com/test_4gMdR823g0bR5qKevu63K01";

// Legacy constants for backwards compatibility
export const STRIPE_MONTHLY_URL = STRIPE_LINK_MONTHLY;
export const STRIPE_ANNUAL_URL = STRIPE_LINK_ANNUAL;

// Optional: after returning from Stripe, land on this page
export const POST_CHECKOUT_RETURN = "/billing/thank-you";

export function getPaymentLink(plan: "monthly" | "annual") {
  return plan === "annual" ? STRIPE_LINK_ANNUAL : STRIPE_LINK_MONTHLY;
}

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