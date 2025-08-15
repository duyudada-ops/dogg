// Email sending utility using Supabase Edge Functions + Resend

import { supabase } from './supabase';

export interface EmailOptions {
  to: string;
  subject: string;
  template: 'welcome' | 'subscription_receipt' | 'order_receipt' | 'event_ticket';
  props?: Record<string, any>;
}

/**
 * Send an email using the send-email edge function
 */
export async function sendEmail({ to, subject, template, props = {} }: EmailOptions) {
  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        to,
        subject,
        template,
        props,
      },
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail(email: string, displayName?: string) {
  return sendEmail({
    to: email,
    subject: 'Welcome to TailCircle! 🐾',
    template: 'welcome',
    props: { displayName },
  });
}

/**
 * Send subscription receipt
 */
export async function sendSubscriptionReceipt(
  email: string,
  subscription: {
    plan: string;
    amount: number;
    currency: string;
    period_end: string;
  }
) {
  return sendEmail({
    to: email,
    subject: 'Your TailCircle Pro subscription is active!',
    template: 'subscription_receipt',
    props: subscription,
  });
}

/**
 * Send order receipt for marketplace purchases
 */
export async function sendOrderReceipt(
  email: string,
  order: {
    item_title: string;
    amount: number;
    currency: string;
    seller_contact?: string;
  }
) {
  return sendEmail({
    to: email,
    subject: 'Your TailCircle order confirmation',
    template: 'order_receipt',
    props: order,
  });
}

/**
 * Send event ticket/confirmation
 */
export async function sendEventTicket(
  email: string,
  event: {
    title: string;
    date: string;
    location: string;
    ticket_url?: string;
  }
) {
  return sendEmail({
    to: email,
    subject: `Your ticket for ${event.title}`,
    template: 'event_ticket',
    props: event,
  });
}