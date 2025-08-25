// Payment configuration for Stripe Payment Links
// TODO: Replace with your actual Stripe Payment Link URLs (use test-mode first)
export const PAYMENT_LINK_MONTHLY = "https://buy.stripe.com/test_aFa9AS7nA8IncTcevu63K02";
export const PAYMENT_LINK_ANNUAL = "https://buy.stripe.com/test_4gMdR823g0bR5qKevu63K01";

// Optional: after returning from Stripe, land on this page
export const POST_CHECKOUT_RETURN = "/billing/thank-you";