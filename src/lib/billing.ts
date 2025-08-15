// Stripe billing utilities for TailCircle

import { supabase } from "@/integrations/supabase/client";
import { PRICING } from "./types";
import { trackEvent, AnalyticsEvents } from "./analytics";

/**
 * Create a Stripe checkout session for subscription
 */
export async function createCheckoutSession(
  planType: 'pro_month' | 'pro_year'
): Promise<{ url?: string; error?: string }> {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      return { error: "User not authenticated" };
    }

    await trackEvent({
      eventName: AnalyticsEvents.CHECKOUT_START,
      properties: { plan: planType },
    });

    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: {
        planType,
        customerEmail: user.email,
        successUrl: `${window.location.origin}/premium-success`,
        cancelUrl: `${window.location.origin}/billing`,
      },
    });

    if (error) {
      console.error('Checkout error:', error);
      return { error: error.message || "Failed to create checkout session" };
    }

    if (data?.url) {
      await trackEvent({
        eventName: AnalyticsEvents.UPGRADE_CLICK,
        properties: { plan: planType, checkout_url: data.url },
      });
      
      return { url: data.url };
    }

    return { error: "No checkout URL returned" };
  } catch (error) {
    console.error('Billing error:', error);
    return { error: "An unexpected error occurred" };
  }
}

/**
 * Create customer portal session for subscription management
 */
export async function createCustomerPortalSession(): Promise<{ url?: string; error?: string }> {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      return { error: "User not authenticated" };
    }

    const { data, error } = await supabase.functions.invoke('customer-portal', {
      body: {
        returnUrl: `${window.location.origin}/settings`,
      },
    });

    if (error) {
      console.error('Customer portal error:', error);
      return { error: error.message || "Failed to create portal session" };
    }

    if (data?.url) {
      return { url: data.url };
    }

    return { error: "No portal URL returned" };
  } catch (error) {
    console.error('Customer portal error:', error);
    return { error: "An unexpected error occurred" };
  }
}

/**
 * Get current subscription status
 */
export async function getSubscriptionStatus() {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      return null;
    }

    const { data, error } = await supabase
      .from('subscribers')
      .select('*')
      .eq('email', user.email)
      .maybeSingle();

    if (error) {
      console.error('Error fetching subscription:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Subscription status error:', error);
    return null;
  }
}

/**
 * Check if user has active subscription
 */
export async function hasActiveSubscription(): Promise<boolean> {
  const subscription = await getSubscriptionStatus();
  return subscription?.subscribed === true;
}

/**
 * Pricing configuration
 */
export const pricingConfig = {
  free: {
    name: 'Free',
    price: 0,
    interval: '',
    features: [
      '5 likes per day',
      '1 Super Like per day',
      '10 messages per day',
      '10-mile event radius',
      'Basic matching',
    ],
    limitations: [
      "Can't see who liked you",
      'No profile boosts',
      'Limited daily actions',
    ],
  },
  pro_month: {
    name: 'Pro Monthly',
    price: 4.99,
    interval: 'month',
    priceId: PRICING.pro_month.price_id,
    features: [
      'Unlimited likes',
      '5 Super Likes per day',
      'Unlimited messaging',
      '50-mile event radius',
      'See who liked you',
      '1 profile boost per day',
      'Advanced filters',
      'Priority support',
    ],
    limitations: [],
  },
  pro_year: {
    name: 'Pro Yearly',
    price: 39.99,
    interval: 'year',
    priceId: PRICING.pro_year.price_id,
    savings: '33% off',
    features: [
      'Everything in Pro Monthly',
      'Save $20/year',
      'Priority customer support',
      'Early access to new features',
    ],
    limitations: [],
  },
} as const;

/**
 * Format price for display
 */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

/**
 * Get plan display name
 */
export function getPlanDisplayName(plan: string): string {
  switch (plan) {
    case 'pro_month':
      return 'Pro Monthly';
    case 'pro_year':
      return 'Pro Yearly';
    default:
      return 'Free';
  }
}