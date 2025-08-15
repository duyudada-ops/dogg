// Core TailCircle types for production

export interface Profile {
  user_id: string;
  full_name?: string;
  display_name?: string;
  avatar_url?: string;
  city?: string;
  country?: string;
  bio?: string;
  location?: string;
  preferences?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface DogProfile {
  id: string;
  user_id: string;
  name: string;
  breed?: string;
  age?: number;
  age_months?: number;
  gender?: string;
  sex?: 'male' | 'female';
  bio?: string;
  photo_url?: string;
  images?: string[];
  location?: string;
  is_demo?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Match {
  id: string;
  liker_user_id: string;
  liked_user_id: string;
  liker_dog_id: string;
  liked_dog_id: string;
  dog_a?: string;
  dog_b?: string;
  status: 'suggested' | 'liked' | 'mutual' | 'blocked' | 'pending';
  score?: number;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  thread_id: string;
  sender_id: string;
  body?: string;
  image_url?: string;
  created_at: string;
}

export interface Post {
  id: string;
  author_id: string;
  body?: string;
  images?: string[];
  created_at: string;
}

export interface PostLike {
  post_id: string;
  profile_id: string;
  created_at: string;
}

export interface MarketplaceItem {
  id: string;
  seller_id: string;
  title: string;
  description?: string;
  price_cents: number;
  currency: string;
  images?: string[];
  status: 'active' | 'sold' | 'hidden';
  created_at: string;
}

export interface Order {
  id: string;
  item_id: string;
  buyer_id: string;
  status: 'pending' | 'paid' | 'canceled' | 'refunded';
  stripe_payment_intent?: string;
  created_at: string;
}

export interface Event {
  id: string;
  host_id: string;
  title: string;
  description?: string;
  starts_at: string;
  ends_at?: string;
  latitude?: number;
  longitude?: number;
  location_name?: string;
  max_attendees?: number;
  price_cents: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface EventAttendee {
  event_id: string;
  profile_id: string;
  status: 'interested' | 'going' | 'waitlist';
  created_at: string;
}

export interface Like {
  id: string;
  liker_id: string;
  liked_id: string;
  liker_dog_id: string;
  liked_dog_id: string;
  type: 'like' | 'super_like' | 'pass';
  created_at: string;
}

export interface Subscription {
  id: string;
  profile_id: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  plan: 'free' | 'pro_month' | 'pro_year';
  status: 'active' | 'past_due' | 'canceled' | 'incomplete' | 'trialing';
  current_period_end?: string;
  created_at: string;
}

export interface AnalyticsEvent {
  id: string;
  user_id?: string;
  event_name: string;
  properties: Record<string, any>;
  created_at: string;
}

// Pricing configuration
export const PRICING = {
  pro_month: {
    price_cents: 499, // $4.99
    price_id: 'price_pro_month', // Replace with actual Stripe price ID
    interval: 'month' as const,
  },
  pro_year: {
    price_cents: 3999, // $39.99
    price_id: 'price_pro_year', // Replace with actual Stripe price ID
    interval: 'year' as const,
  },
} as const;

// Feature limits
export const LIMITS = {
  free: {
    daily_likes: 5,
    daily_super_likes: 1,
    daily_messages: 10,
    event_radius_miles: 10,
    can_see_who_liked: false,
    profile_boosts: 0,
  },
  pro: {
    daily_likes: Infinity,
    daily_super_likes: 5,
    daily_messages: Infinity,
    event_radius_miles: 50,
    can_see_who_liked: true,
    profile_boosts: 1,
  },
} as const;

export type PlanType = keyof typeof LIMITS;