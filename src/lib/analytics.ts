// Analytics tracking system for TailCircle

import { supabase } from "@/integrations/supabase/client";

// Analytics events enum for type safety
export const AnalyticsEvents = {
  // Paywall events
  PAYWALL_VIEW: 'paywall_view',
  PAYWALL_DISMISS: 'paywall_dismiss',
  UPGRADE_CLICK: 'upgrade_click',
  CHECKOUT_START: 'checkout_start',
  CHECKOUT_SUCCESS: 'checkout_success',
  CHECKOUT_CANCEL: 'checkout_cancel',
  
  // User lifecycle
  SIGNUP: 'signup',
  LOGIN: 'login',
  PROFILE_COMPLETE: 'profile_complete',
  DOG_PROFILE_CREATE: 'dog_profile_create',
  
  // Engagement
  MATCH_VIEW: 'match_view',
  MATCH_LIKE: 'match_like',
  MATCH_SUPER_LIKE: 'match_super_like',
  MATCH_PASS: 'match_pass',
  MUTUAL_MATCH: 'mutual_match',
  MESSAGE_SEND: 'message_send',
  MESSAGE_THREAD_START: 'message_thread_start',
  
  // Events
  EVENT_VIEW: 'event_view',
  EVENT_RSVP: 'event_rsvp',
  EVENT_CREATE: 'event_create',
  
  // Marketplace
  ITEM_VIEW: 'item_view',
  ITEM_PURCHASE: 'item_purchase',
  ITEM_LIST: 'item_list',
  
  // App usage
  APP_OPEN: 'app_open',
  SESSION_END: 'session_end',
  PAGE_VIEW: 'page_view',
} as const;

export type AnalyticsEventName = typeof AnalyticsEvents[keyof typeof AnalyticsEvents];

interface TrackEventParams {
  eventName: AnalyticsEventName;
  properties?: Record<string, any>;
  userId?: string;
}

/**
 * Track an analytics event
 */
export async function trackEvent({ eventName, properties = {}, userId }: TrackEventParams): Promise<void> {
  try {
    // Get current user if not provided
    const currentUserId = userId || (await supabase.auth.getUser()).data.user?.id;
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', eventName, properties);
    }
    
    // Store in Supabase analytics table (will be available after migration)
    // For now, just log - uncomment when analytics_events table is available
    /*
    if (currentUserId) {
      await supabase
        .from('analytics_events')
        .insert({
          user_id: currentUserId,
          event_name: eventName,
          properties,
        });
    }
    */
    
    // TODO: Add external analytics providers here (Google Analytics, Mixpanel, etc.)
    // Example:
    // gtag('event', eventName, properties);
    // mixpanel.track(eventName, properties);
    
  } catch (error) {
    console.error('Analytics tracking error:', error);
    // Don't throw - analytics failures shouldn't break the app
  }
}

/**
 * Track page view
 */
export function usePageView(pageName: string) {
  React.useEffect(() => {
    trackEvent({
      eventName: AnalyticsEvents.PAGE_VIEW,
      properties: { page: pageName },
    });
  }, [pageName]);
}

/**
 * Track app session
 */
export function useAppSession() {
  React.useEffect(() => {
    // Track app open
    trackEvent({ eventName: AnalyticsEvents.APP_OPEN });
    
    // Track session end on beforeunload
    const handleBeforeUnload = () => {
      trackEvent({ eventName: AnalyticsEvents.SESSION_END });
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
}

/**
 * Track conversion funnel
 */
export class ConversionFunnel {
  private steps: string[] = [];
  
  constructor(private funnelName: string) {}
  
  step(stepName: string, properties?: Record<string, any>) {
    this.steps.push(stepName);
    trackEvent({
      eventName: 'funnel_step' as AnalyticsEventName,
      properties: {
        funnel: this.funnelName,
        step: stepName,
        step_number: this.steps.length,
        ...properties,
      },
    });
  }
  
  complete(properties?: Record<string, any>) {
    trackEvent({
      eventName: 'funnel_complete' as AnalyticsEventName,
      properties: {
        funnel: this.funnelName,
        total_steps: this.steps.length,
        steps: this.steps,
        ...properties,
      },
    });
  }
}

// Add React import for hooks
import React from 'react';