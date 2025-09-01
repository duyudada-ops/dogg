import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { galleryService, GalleryVibe } from '@/lib/galleryService';
import { useToast } from '@/hooks/use-toast';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const VIBE_OPTIONS: { value: GalleryVibe; label: string; emoji: string }[] = [
  { value: 'playful', label: 'Playful', emoji: '🎾' },
  { value: 'gentle', label: 'Gentle', emoji: '💕' },
  { value: 'adventurous', label: 'Adventurous', emoji: '🏔️' },
  { value: 'sleepy', label: 'Sleepy', emoji: '😴' },
  { value: 'smart', label: 'Smart', emoji: '🧠' }
];

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [alt, setAlt] = useState('');
  const [vibe, setVibe] = useState<GalleryVibe>('gentle');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive"
        });
        return;
      }

      // Validate file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }

      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
      
      // Auto-generate alt text from filename
      if (!alt) {
        const baseName = selectedFile.name.split('.')[0];
        setAlt(`Dog photo - ${baseName}`);
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;

    setIsUploading(true);
    try {
      const result = await galleryService.uploadUserPhoto(
        file,
        user.id,
        alt,
        vibe,
        user.user_metadata?.full_name || user.email?.split('@')[0]
      );

      if (result) {
        toast({
          title: "Photo uploaded successfully!",
          description: "Your photo has been added to the gallery",
        });
        
        // Reset form
        setFile(null);
        setPreview(null);
        setAlt('');
        setVibe('gentle');
        
        onSuccess?.();
        onClose();
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    if (!isUploading) {
      setFile(null);
      setPreview(null);
      setAlt('');
      setVibe('gentle');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Share Your Dog's Photo
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* File Upload */}
          <div className="space-y-2">
            <Label>Photo</Label>
            {!preview ? (
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Choose a photo of your dog to share with the community
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="photo-upload"
                />
                <Button asChild variant="outline" className="cursor-pointer">
                  <label htmlFor="photo-upload">
                    <Upload className="h-4 w-4 mr-2" />
                    Select Photo
                  </label>
                </Button>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Alt Text */}
          <div className="space-y-2">
            <Label htmlFor="alt-text">Description</Label>
            <Input
              id="alt-text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Describe your dog's photo..."
              disabled={isUploading}
            />
          </div>

          {/* Vibe Selection */}
          <div className="space-y-2">
            <Label>Vibe</Label>
            <Select value={vibe} onValueChange={(value) => setVibe(value as GalleryVibe)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {VIBE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <span>{option.emoji}</span>
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Privacy Notice */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Privacy Notice:</strong> Your photo will be visible to other users in the gallery. 
              Your name will be credited as the photographer. You can delete it anytime from your profile.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isUploading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="flex-1"
            >
              {isUploading ? 'Uploading...' : 'Share Photo'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};