// Enhanced Supabase utilities for TailCircle

import { supabase } from "@/integrations/supabase/client";

// Re-export for convenience
export { supabase };
import { trackEvent, AnalyticsEvents } from "./analytics";
import type { DogProfile, Match, Message, Post, MarketplaceItem, Event, Profile } from "./types";

// Type-safe database row types based on current schema
type DatabaseProfile = {
  user_id: string;
  display_name?: string;
  avatar_url?: string;
  city?: string;
  country?: string;
  bio?: string;
  location?: string;
  preferences?: any;
  created_at: string;
  updated_at: string;
  full_name?: string;
};

type DatabaseDogProfile = {
  id: string;
  user_id: string;
  name: string;
  breed?: string;
  age?: number;
  age_months?: number;
  gender?: string;
  sex?: string;
  bio?: string;
  photo_url?: string;
  images?: any;
  location?: string;
  is_demo?: boolean;
  created_at: string;
  updated_at: string;
};

/**
 * Profile utilities
 */
export const profileService = {
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    
    return data as Profile;
  },

  async updateProfile(userId: string, updates: Partial<Profile>): Promise<boolean> {
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error updating profile:', error);
      return false;
    }
    
    await trackEvent({
      eventName: AnalyticsEvents.PROFILE_COMPLETE,
      properties: { updated_fields: Object.keys(updates) },
    });
    
    return true;
  },
};

/**
 * Dog profile utilities
 */
export const dogService = {
  async getDogProfiles(userId: string): Promise<DogProfile[]> {
    const { data, error } = await supabase
      .from('dog_profiles')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching dog profiles:', error);
      return [];
    }
    
    return data || [];
  },

  async createDogProfile(dogData: Partial<DatabaseDogProfile>): Promise<DogProfile | null> {
    const { data, error } = await supabase
      .from('dog_profiles')
      .insert(dogData as any)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating dog profile:', error);
      return null;
    }
    
    await trackEvent({
      eventName: AnalyticsEvents.DOG_PROFILE_CREATE,
      properties: { breed: dogData.breed, age: dogData.age },
    });
    
    return data as DogProfile;
  },

  async getAvailableDogs(userId: string, limit = 50): Promise<DogProfile[]> {
    // Get dogs excluding user's own dogs and already swiped dogs
    const { data, error } = await supabase
      .from('dog_profiles')
      .select(`
        *,
        profiles!inner(*)
      `)
      .neq('user_id', userId)
      .not('id', 'in', `(
        SELECT liked_dog_id FROM likes 
        WHERE liker_id = '${userId}'
      )`)
      .limit(limit);
    
    if (error) {
      console.error('Error fetching available dogs:', error);
      return [];
    }
    
    return data || [];
  },
};

/**
 * Matching utilities
 */
export const matchService = {
  async swipeOnDog(
    likerId: string, 
    likedId: string, 
    likerDogId: string, 
    likedDogId: string, 
    type: 'like' | 'super_like' | 'pass'
  ): Promise<{ isMatch: boolean; matchId?: string }> {
    // Use existing check_mutual_match function and increment_daily_swipes
    try {
      // Increment swipe count
      await supabase.rpc('increment_daily_swipes', {
        user_uuid: likerId,
      });

      // Track the swipe
      await trackEvent({
        eventName: type === 'like' ? AnalyticsEvents.MATCH_LIKE : 
                   type === 'super_like' ? AnalyticsEvents.MATCH_SUPER_LIKE : 
                   AnalyticsEvents.MATCH_PASS,
        properties: { liked_dog_id: likedDogId },
      });
      
      // Check for mutual match if it's a like
      if (type !== 'pass') {
        const { data: mutualMatch } = await supabase.rpc('check_mutual_match', {
          liker_user_id: likerId,
          liked_user_id: likedId,
          liker_dog_uuid: likerDogId,
          liked_dog_uuid: likedDogId,
        });
        
        if (mutualMatch) {
          await trackEvent({
            eventName: AnalyticsEvents.MUTUAL_MATCH,
            properties: { match_id: mutualMatch, liked_dog_id: likedDogId },
          });
          
          return { isMatch: true, matchId: mutualMatch };
        }
      }
      
      return { isMatch: false };
    } catch (error) {
      console.error('Error in swipe operation:', error);
      return { isMatch: false };
    }
  },

  async getMatches(userId: string): Promise<Match[]> {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .or(`liker_user_id.eq.${userId},liked_user_id.eq.${userId}`)
      .eq('status', 'mutual')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching matches:', error);
      return [];
    }
    
    return (data || []) as Match[];
  },
};

/**
 * Messaging utilities (will be implemented after messages table migration)
 */
export const messageService = {
  async getThreadMessages(threadId: string): Promise<Message[]> {
    // TODO: Implement after messages table is available
    console.log('Messages not yet implemented - waiting for table creation');
    return [];
  },

  async sendMessage(threadId: string, senderId: string, body: string, imageUrl?: string): Promise<Message | null> {
    // TODO: Implement after messages table is available
    console.log('Send message not yet implemented - waiting for table creation');
    return null;
  },

  subscribeToThread(threadId: string, onMessage: (message: Message) => void) {
    // TODO: Implement after messages table is available
    console.log('Thread subscription not yet implemented');
    return { unsubscribe: () => {} };
  },
};

/**
 * Posts and feed utilities (will be implemented after posts table migration)
 */
export const postService = {
  async getFeedPosts(limit = 20, offset = 0): Promise<Post[]> {
    // TODO: Implement after posts table is available
    console.log('Posts not yet implemented - waiting for table creation');
    return [];
  },

  async createPost(authorId: string, body: string, images: string[] = []): Promise<Post | null> {
    // TODO: Implement after posts table is available
    console.log('Create post not yet implemented - waiting for table creation');
    return null;
  },

  async likePost(postId: string, profileId: string): Promise<boolean> {
    // TODO: Implement after post_likes table is available
    console.log('Like post not yet implemented - waiting for table creation');
    return false;
  },
};

/**
 * Upload utilities
 */
export const uploadService = {
  async uploadDogPhoto(file: File, userId: string): Promise<string | null> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('dog-photos')
      .upload(fileName, file);
    
    if (error) {
      console.error('Error uploading photo:', error);
      return null;
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from('dog-photos')
      .getPublicUrl(data.path);
    
    return publicUrl;
  },
};