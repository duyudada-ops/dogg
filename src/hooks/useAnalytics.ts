import { useEffect } from 'react';

// Analytics events for growth tracking
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  try {
    // Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, properties);
    }

    // Console log for development
    console.log(`Analytics Event: ${eventName}`, properties);
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

// Predefined growth events
export const AnalyticsEvents = {
  // Paywall events
  PAYWALL_VIEWED: 'paywall_viewed',
  PAYWALL_CONVERTED: 'paywall_converted',
  PAYWALL_DISMISSED: 'paywall_dismissed',
  
  // User lifecycle
  USER_SIGNUP: 'user_signup',
  USER_LOGIN: 'user_login',
  PROFILE_COMPLETED: 'profile_completed',
  
  // Engagement
  DOG_LIKED: 'dog_liked',
  DOG_SUPER_LIKED: 'dog_super_liked',
  MATCH_CREATED: 'match_created',
  MESSAGE_SENT: 'message_sent',
  
  // Events
  EVENT_VIEWED: 'event_viewed',
  EVENT_RSVP: 'event_rsvp',
  
  // Referrals
  REFERRAL_STARTED: 'referral_started',
  REFERRAL_COMPLETED: 'referral_completed',
  
  // Retention
  APP_OPENED: 'app_opened',
  DAILY_STREAK: 'daily_streak',
  WEEKLY_DIGEST_SENT: 'weekly_digest_sent',
  WEEKLY_DIGEST_CLICKED: 'weekly_digest_clicked',
  
  // Premium
  PREMIUM_UPGRADE: 'premium_upgrade',
  BOOST_PURCHASED: 'boost_purchased',
};

// Hook for tracking page views
export const usePageView = (pageName: string) => {
  useEffect(() => {
    trackEvent('page_view', { page_name: pageName });
  }, [pageName]);
};

// Hook for tracking app session
export const useAppSession = () => {
  useEffect(() => {
    trackEvent(AnalyticsEvents.APP_OPENED);
    
    // Track session duration on page unload
    const handleBeforeUnload = () => {
      trackEvent('session_end', {
        session_duration: Date.now() - performance.now()
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
};