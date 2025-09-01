import { useState, useEffect } from 'react';
import { galleryService, GalleryPhoto, GalleryVibe } from '@/lib/galleryService';
import { dogPhotos } from '../../data/dogPhotos';

interface UseGalleryPhotosOptions {
  limit?: number;
  vibe?: GalleryVibe;
  fallbackToStatic?: boolean;
}

interface UseGalleryPhotosReturn {
  photos: (GalleryPhoto | { src: string; alt: string; vibe: string })[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useGalleryPhotos = (
  options: UseGalleryPhotosOptions = {}
): UseGalleryPhotosReturn => {
  const { limit = 50, vibe, fallbackToStatic = true } = options;
  
  const [photos, setPhotos] = useState<(GalleryPhoto | { src: string; alt: string; vibe: string })[]>(
    fallbackToStatic ? dogPhotos.slice(0, limit) : []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      setError(null);

      const galleryPhotos = await galleryService.getPublicPhotos(limit, vibe);
      
      if (galleryPhotos.length > 0) {
        setPhotos(galleryPhotos);
      } else if (fallbackToStatic) {
        // Filter static photos by vibe if specified
        let staticPhotos = dogPhotos;
        if (vibe) {
          // Map gallery vibe to static vibe
          const vibeMap: Record<GalleryVibe, string[]> = {
            'playful': ['playing'],
            'gentle': ['cute', 'adorable', 'normal'],
            'adventurous': ['swimming'],
            'sleepy': ['sleeping'],
            'smart': ['sunglasses', 'show']
          };
          const targetVibes = vibeMap[vibe] || ['normal'];
          staticPhotos = dogPhotos.filter(photo => targetVibes.includes(photo.vibe));
        }
        setPhotos(staticPhotos.slice(0, limit));
      }
    } catch (err) {
      console.error('Error fetching gallery photos:', err);
      setError(err instanceof Error ? err.message : 'Failed to load photos');
      
      // Fallback to static photos on error
      if (fallbackToStatic) {
        setPhotos(dogPhotos.slice(0, limit));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [limit, vibe]);

  return {
    photos,
    loading,
    error,
    refetch: fetchPhotos
  };
};