import React from 'react';
import { DogProfileForm } from './DogProfileForm';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface DogProfileCreationProps {
  onComplete?: () => void;
}

export const DogProfileCreation: React.FC<DogProfileCreationProps> = ({ onComplete }) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleCreateProfile = async (data: any) => {
    try {
      console.log('Creating dog profile:', data);
      
      // TODO: Once Supabase is fully integrated, this will:
      // 1. Upload photo to Supabase Storage
      // 2. Create dog record in database
      // 3. Link to current user
      
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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