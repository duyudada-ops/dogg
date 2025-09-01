import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type GalleryVibe = 'playful' | 'gentle' | 'adventurous' | 'sleepy' | 'smart';

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  vibe?: string; // Allow any string from database, map to GalleryVibe when needed
  source: string;
  source_id?: string;
  credited_to?: string;
  width?: number;
  height?: number;
  is_public: boolean;
  user_id?: string;
  created_at: string;
}

// Map old vibes to new vibes
export const mapVibeToGallery = (oldVibe: string): GalleryVibe => {
  const vibeMap: Record<string, GalleryVibe> = {
    'cute': 'gentle',
    'adorable': 'gentle', 
    'fat': 'gentle',
    'extra-fat': 'gentle',
    'normal': 'gentle',
    'sleeping': 'sleepy',
    'playing': 'playful',
    'swimming': 'adventurous',
    'sunglasses': 'smart',
    'show': 'smart'
  };
  return vibeMap[oldVibe] || 'gentle';
};

export const galleryService = {
  // Get public photos for display (anonymous access allowed)
  async getPublicPhotos(limit: number = 50, vibe?: GalleryVibe): Promise<GalleryPhoto[]> {
    try {
      let query = supabase
        .from('gallery_photos')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (vibe) {
        query = query.eq('vibe', vibe);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching public photos:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getPublicPhotos:', error);
      return [];
    }
  },

  // Get user's own photos (requires auth)
  async getUserPhotos(userId: string): Promise<GalleryPhoto[]> {
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .eq('user_id', userId)
        .eq('source', 'user')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user photos:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUserPhotos:', error);
      return [];
    }
  },

  // Upload user photo to gallery (opt-in)
  async uploadUserPhoto(
    file: File, 
    userId: string, 
    alt: string, 
    vibe: GalleryVibe,
    creditedTo?: string
  ): Promise<GalleryPhoto | null> {
    try {
      // First upload to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('dog-photos')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        return null;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('dog-photos')
        .getPublicUrl(uploadData.path);

      // Insert into gallery_photos table
      const { data, error } = await supabase
        .from('gallery_photos')
        .insert({
          source: 'user',
          user_id: userId,
          src: publicUrl,
          alt: alt || 'Dog photo',
          vibe: vibe,
          credited_to: creditedTo,
          is_public: true,
          width: null, // Could be determined from file
          height: null // Could be determined from file
        })
        .select()
        .single();

      if (error) {
        console.error('Error inserting gallery photo:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in uploadUserPhoto:', error);
      return null;
    }
  },

  // Update user's photo
  async updateUserPhoto(photoId: string, updates: Partial<Pick<GalleryPhoto, 'alt' | 'vibe' | 'is_public'>>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('gallery_photos')
        .update(updates)
        .eq('id', photoId)
        .eq('source', 'user'); // Ensure user can only update their own photos

      if (error) {
        console.error('Error updating photo:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in updateUserPhoto:', error);
      return false;
    }
  },

  // Delete user's photo
  async deleteUserPhoto(photoId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('gallery_photos')
        .delete()
        .eq('id', photoId)
        .eq('source', 'user'); // Ensure user can only delete their own photos

      if (error) {
        console.error('Error deleting photo:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteUserPhoto:', error);
      return false;
    }
  }
};