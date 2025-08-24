// Payment configuration for Stripe Payment Links
// TODO: Replace with your actual Stripe Payment Link URLs (use test-mode first)
export const PAYMENT_LINK_MONTHLY = "https://buy.stripe.com/test_xxxMonthly";
export const PAYMENT_LINK_ANNUAL = "https://buy.stripe.com/test_xxxAnnual";

// Optional: after returning from Stripe, land on this page
export const POST_CHECKOUT_RETURN = "/billing/thank-you";