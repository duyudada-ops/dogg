import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface EmailRequest {
  to: string;
  subject: string;
  template: 'welcome' | 'subscription_receipt' | 'order_receipt' | 'event_ticket';
  props?: Record<string, any>;
}

const getEmailTemplate = (template: string, props: any) => {
  switch (template) {
    case 'welcome':
      return {
        subject: 'Welcome to TailCircle! 🐾',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333; text-align: center;">Welcome to TailCircle!</h1>
            <p>Hi ${props.displayName || 'there'},</p>
            <p>Welcome to TailCircle - the premier app for connecting dogs and their humans! 🐾</p>
            <p>Get started by:</p>
            <ul>
              <li>Creating your dog's profile</li>
              <li>Finding nearby dog events</li>
              <li>Connecting with other dog lovers</li>
            </ul>
            <p>Happy tail wagging!</p>
            <p>The TailCircle Team</p>
          </div>
        `,
      };
    case 'subscription_receipt':
      return {
        subject: 'Your TailCircle Pro subscription is active!',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Subscription Confirmed</h1>
            <p>Your TailCircle Pro subscription is now active!</p>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
              <h3>Subscription Details:</h3>
              <p><strong>Plan:</strong> ${props.plan}</p>
              <p><strong>Amount:</strong> ${props.currency?.toUpperCase()} ${(props.amount / 100).toFixed(2)}</p>
              <p><strong>Renewal Date:</strong> ${new Date(props.period_end).toLocaleDateString()}</p>
            </div>
            <p>Enjoy unlimited features and premium support!</p>
          </div>
        `,
      };
    case 'order_receipt':
      return {
        subject: 'Your TailCircle order confirmation',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Order Confirmed</h1>
            <p>Thank you for your purchase!</p>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
              <h3>Order Details:</h3>
              <p><strong>Item:</strong> ${props.item_title}</p>
              <p><strong>Total:</strong> ${props.currency?.toUpperCase()} ${(props.amount / 100).toFixed(2)}</p>
              ${props.seller_contact ? `<p><strong>Seller Contact:</strong> ${props.seller_contact}</p>` : ''}
            </div>
            <p>We'll connect you with the seller shortly!</p>
          </div>
        `,
      };
    case 'event_ticket':
      return {
        subject: `Your ticket for ${props.title}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Event Ticket</h1>
            <p>You're all set for the event!</p>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
              <h3>Event Details:</h3>
              <p><strong>Event:</strong> ${props.title}</p>
              <p><strong>Date:</strong> ${new Date(props.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> ${props.location}</p>
              ${props.ticket_url ? `<p><a href="${props.ticket_url}">View Ticket</a></p>` : ''}
            </div>
            <p>See you there! 🐾</p>
          </div>
        `,
      };
    default:
      return { subject: 'TailCircle Notification', html: '<p>Hello from TailCircle!</p>' };
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, template, props = {} }: EmailRequest = await req.json();

    if (!to || !template) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: to, template" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailContent = getEmailTemplate(template, props);

    const { data, error } = await resend.emails.send({
      from: "TailCircle <hello@resend.dev>",
      to: [to],
      subject: subject || emailContent.subject,
      html: emailContent.html,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Email function error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});