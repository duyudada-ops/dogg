import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Webhook received");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) throw new Error("STRIPE_WEBHOOK_SECRET is not set");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    const signature = req.headers.get("stripe-signature")!;
    const body = await req.text();
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      logStep("Webhook verified", { type: event.type });
    } catch (err) {
      logStep("Webhook verification failed", { error: err.message });
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Handle subscription events
    if (event.type === "customer.subscription.created" || 
        event.type === "customer.subscription.updated" ||
        event.type === "customer.subscription.deleted") {
      
      const subscription = event.data.object as any;
      const { customer, id, status, current_period_end, items } = subscription;
      
      logStep("Processing subscription event", { 
        subscriptionId: id, 
        customerId: customer, 
        status 
      });

      // Determine plan from price ID
      const priceId = items?.data?.[0]?.price?.id as string | undefined;
      let plan = 'free';
      if (priceId?.includes('year') || priceId?.includes('annual')) {
        plan = 'pro_year';
      } else if (priceId?.includes('month') || priceId?.includes('monthly')) {
        plan = 'pro_month';
      }

      // Find user by stripe customer ID
      const { data: existingSub } = await supabaseClient
        .from("subscribers")
        .select("user_id")
        .eq("stripe_customer_id", customer)
        .maybeSingle();

      if (existingSub?.user_id) {
        // Update existing subscription
        const { error } = await supabaseClient
          .from("subscribers")
          .update({
            subscribed: status === 'active' || status === 'trialing',
            subscription_tier: plan,
            subscription_end: new Date(current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", existingSub.user_id);

        if (error) {
          logStep("Error updating subscription", { error });
        } else {
          logStep("Subscription updated successfully", { userId: existingSub.user_id });
        }
      } else {
        logStep("No matching profile found for customer", { customerId: customer });
      }
    }

    // Handle successful payment events
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      logStep("Checkout completed", { sessionId: session.id, customerId: session.customer });
      
      // Send subscription receipt email
      if (session.mode === 'subscription' && session.customer_email) {
        try {
          await supabaseClient.functions.invoke('send-email', {
            body: {
              to: session.customer_email,
              template: 'subscription_receipt',
              props: {
                plan: session.display_items?.[0]?.custom?.name || 'Pro',
                amount: session.amount_total,
                currency: session.currency,
                period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              },
            },
          });
          logStep("Subscription receipt email sent", { email: session.customer_email });
        } catch (emailError) {
          logStep("Failed to send subscription receipt", { error: emailError });
        }
      }
    }

    // Handle invoice payment succeeded (for recurring billing)
    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as any;
      logStep("Invoice payment succeeded", { invoiceId: invoice.id, customerId: invoice.customer });
      
      // Update orders table for marketplace items
      if (invoice.metadata?.order_id) {
        const { error } = await supabaseClient
          .from("orders")
          .update({ status: 'paid' })
          .eq("id", invoice.metadata.order_id);
          
        if (!error) {
          logStep("Order status updated to paid", { orderId: invoice.metadata.order_id });
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    logStep("ERROR in stripe-webhook", { error: error.message });
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});