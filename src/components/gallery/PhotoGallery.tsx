import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { galleryService, GalleryPhoto } from '@/lib/galleryService';
import { PhotoUploadModal } from './PhotoUploadModal';
import { useToast } from '@/hooks/use-toast';
import { SafeImage } from '@/components/SafeImage';

export const PhotoGallery: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const fetchUserPhotos = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const userPhotos = await galleryService.getUserPhotos(user.id);
      setPhotos(userPhotos);
    } catch (error) {
      console.error('Error fetching user photos:', error);
      toast({
        title: "Error loading photos",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPhotos();
  }, [user]);

  const handleDeletePhoto = async (photoId: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    try {
      const success = await galleryService.deleteUserPhoto(photoId);
      if (success) {
        setPhotos(photos.filter(p => p.id !== photoId));
        toast({
          title: "Photo deleted",
          description: "Your photo has been removed from the gallery"
        });
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast({
        title: "Delete failed",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  const handleToggleVisibility = async (photo: GalleryPhoto) => {
    try {
      const success = await galleryService.updateUserPhoto(photo.id, {
        is_public: !photo.is_public
      });
      
      if (success) {
        setPhotos(photos.map(p => 
          p.id === photo.id ? { ...p, is_public: !p.is_public } : p
        ));
        toast({
          title: photo.is_public ? "Photo hidden" : "Photo made public",
          description: photo.is_public 
            ? "Your photo is now private" 
            : "Your photo is now visible in the gallery"
        });
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error('Error updating photo visibility:', error);
      toast({
        title: "Update failed",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">My Photo Gallery</h3>
          <Button disabled>
            <Camera className="h-4 w-4 mr-2" />
            Add Photo
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">My Photo Gallery</h3>
        <Button onClick={() => setShowUploadModal(true)}>
          <Camera className="h-4 w-4 mr-2" />
          Add Photo
        </Button>
      </div>

      {photos.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="font-semibold mb-2">No photos yet</h4>
            <p className="text-muted-foreground mb-4">
              Share your dog's best moments with the community
            </p>
            <Button onClick={() => setShowUploadModal(true)}>
              Upload Your First Photo
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <Card key={photo.id} className="group overflow-hidden">
              <CardContent className="p-0 relative">
                <div className="aspect-square overflow-hidden">
                  <SafeImage
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                
                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleToggleVisibility(photo)}
                  >
                    {photo.is_public ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeletePhoto(photo.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Photo info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <div className="flex items-center justify-between">
                    {photo.vibe && (
                      <Badge variant="secondary" className="text-xs">
                        {photo.vibe}
                      </Badge>
                    )}
                    {!photo.is_public && (
                      <Badge variant="outline" className="text-xs text-white border-white/50">
                        Private
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <PhotoUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSuccess={fetchUserPhotos}
      />
    </div>
  );
};