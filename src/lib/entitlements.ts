// Entitlements and access control for TailCircle premium features

import { Subscription } from './types';

/**
 * Check if a user has an active paid subscription
 */
export function isPaid(subscription?: Subscription | null): boolean {
  if (!subscription) return false;
  return ['active', 'trialing'].includes(subscription.status);
}

/**
 * Check if a user can perform a specific action based on their plan
 */
export function canPerformAction(
  action: 'like' | 'super_like' | 'message' | 'boost' | 'see_who_liked',
  subscription?: Subscription | null,
  usageToday?: { likes?: number; super_likes?: number; messages?: number; boosts?: number }
): boolean {
  const isProUser = isPaid(subscription);
  const usage = usageToday || {};
  
  switch (action) {
    case 'like':
      return isProUser || (usage.likes || 0) < 5;
    
    case 'super_like':
      const superLikeLimit = isProUser ? 5 : 1;
      return (usage.super_likes || 0) < superLikeLimit;
    
    case 'message':
      return isProUser || (usage.messages || 0) < 10;
    
    case 'boost':
      return isProUser && (usage.boosts || 0) < 1;
    
    case 'see_who_liked':
      return isProUser;
    
    default:
      return false;
  }
}

/**
 * Get the upgrade reason for a blocked action
 */
export function getUpgradeReason(action: string): string {
  switch (action) {
    case 'like':
      return "You've reached your daily like limit. Upgrade to Pro for unlimited likes!";
    case 'super_like':
      return "Upgrade to Pro for more Super Likes per day!";
    case 'message':
      return "You've reached your daily message limit. Upgrade to Pro for unlimited messaging!";
    case 'boost':
      return "Boost your profile to get more visibility! Available with Pro.";
    case 'see_who_liked':
      return "See who liked your dog's profile with Pro!";
    case 'events_radius':
      return "Expand your event search radius to 50 miles with Pro!";
    default:
      return "Upgrade to Pro to unlock this feature!";
  }
}

/**
 * Get feature comparison for pricing page
 */
export function getFeatureComparison() {
  return {
    free: {
      name: 'Free',
      price: '$0',
      interval: '',
      features: [
        '5 likes per day',
        '1 Super Like per day', 
        '10 messages per day',
        '10-mile event radius',
        'Basic matching',
        'Profile creation',
      ],
      limitations: [
        "Can't see who liked you",
        'No profile boosts',
        'Limited daily actions',
      ],
    },
    pro: {
      name: 'Pro',
      price: '$4.99',
      interval: '/month',
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
  };
}

/**
 * Hook to check subscription status and usage
 */
export function useEntitlements() {
  // This would integrate with your subscription state management
  // For now, returning mock data - integrate with actual subscription state
  const subscription = null; // Get from context or API
  const todayUsage = { likes: 0, super_likes: 0, messages: 0, boosts: 0 }; // Get from API
  
  return {
    isPaid: isPaid(subscription),
    canLike: canPerformAction('like', subscription, todayUsage),
    canSuperLike: canPerformAction('super_like', subscription, todayUsage),
    canMessage: canPerformAction('message', subscription, todayUsage),
    canBoost: canPerformAction('boost', subscription, todayUsage),
    canSeeWhoLiked: canPerformAction('see_who_liked', subscription, todayUsage),
    subscription,
    todayUsage,
    getUpgradeReason,
  };
}