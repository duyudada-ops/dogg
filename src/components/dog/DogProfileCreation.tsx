import React from 'react';
import { DogProfileForm } from './DogProfileForm';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface DogProfileCreationProps {
  onComplete?: () => void;
}

export const DogProfileCreation: React.FC<DogProfileCreationProps> = ({ onComplete }) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleCreateProfile = async (data: any) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to create a dog profile",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Creating dog profile:', data);
      
      let photoUrl = null;
      
      // Upload photo to Supabase Storage if provided
      if (data.photo) {
        const fileExt = data.photo.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('dog-photos')
          .upload(fileName, data.photo);
          
        if (uploadError) {
          console.error('Error uploading photo:', uploadError);
          throw new Error('Failed to upload photo');
        }
        
        // Get public URL for the uploaded photo
        const { data: urlData } = supabase.storage
          .from('dog-photos')
          .getPublicUrl(fileName);
          
        photoUrl = urlData.publicUrl;
      }
      
      // Create dog profile in database
      const { error: insertError } = await supabase
        .from('dog_profiles')
        .insert({
          user_id: user.id,
          name: data.name,
          breed: data.breed,
          age: parseInt(data.age),
          gender: data.gender,
          bio: data.bio,
          location: data.location,
          photo_url: photoUrl,
        });
      
      if (insertError) {
        console.error('Error creating dog profile:', insertError);
        throw new Error('Failed to create dog profile');
      }
      
      toast({
        title: "Profile Created!",
        description: `${data.name}'s profile has been created successfully`,
      });
      
      // Call onComplete after a short delay to show the toast
      setTimeout(() => {
        onComplete?.();
      }, 1500);
      
    } catch (error) {
      console.error('Error creating dog profile:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create dog profile",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">🐕 Add Your Dog</h1>
          <p className="text-muted-foreground">
            Create a profile for your furry friend to start connecting with other dog owners
          </p>
        </div>
        
        <DogProfileForm onSubmit={handleCreateProfile} />
      </div>
    </div>
  );
};