import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthPage } from '@/components/auth/AuthPage';
import { DogProfileCreation } from '@/components/dog/DogProfileCreation';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AutoCarousel } from '@/components/ui/auto-carousel';
import { CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { dogPhotos } from '../../data/dogPhotos';
import { SafeImage } from '@/components/SafeImage';
import { galleryService, GalleryPhoto } from '@/lib/galleryService';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showDogProfileForm, setShowDogProfileForm] = useState(false);
  const [displayPhotos, setDisplayPhotos] = React.useState<(GalleryPhoto | { src: string; alt: string; vibe: string })[]>(
    dogPhotos.slice(0, 15) // Fallback to static photos
  );

  // Load gallery photos on mount
  React.useEffect(() => {
    const loadGalleryPhotos = async () => {
      try {
        const galleryPhotos = await galleryService.getPublicPhotos(15);
        if (galleryPhotos.length > 0) {
          setDisplayPhotos(galleryPhotos);
        }
        // If no gallery photos, keep static photos as fallback
      } catch (error) {
        console.error('Error loading gallery photos:', error);
        // Keep static photos as fallback
      }
    };

    loadGalleryPhotos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  if (showDogProfileForm) {
    return <DogProfileCreation onComplete={() => navigate('/')} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Welcome Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold mb-4">Hello Pupulation 🐾</h1>
            <p className="text-xl font-semibold text-primary mb-8">
              Welcome to the pack! Where every pup has a match!
            </p>
            <div className="max-w-xl">
              <p className="text-lg mb-4">
                Hello, {user.user_metadata?.full_name || user.email}! 
              </p>
              <p className="text-muted-foreground mb-6">
                You're now signed in and ready to start connecting with other dog owners. 
                Let's create your dog's profile to get started!
              </p>
              <Button 
                onClick={() => setShowDogProfileForm(true)}
                size="lg"
                className="text-lg px-8 py-3"
              >
                Create Dog Profile
              </Button>
            </div>
          </div>

          {/* Photo Cascade Gallery */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 border border-border/20 overflow-hidden">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <AutoCarousel className="w-full h-full" autoSlideInterval={3000}>
                  <CarouselContent className="h-full">
                    {displayPhotos.map((dog, i) => (
                      <CarouselItem key={i} className="h-full">
                        <div className="relative w-full h-full overflow-hidden rounded-xl">
                          <SafeImage 
                            src={dog.src}
                            alt={dog.alt}
                            priority={i === 0}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </AutoCarousel>
              </div>
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Meet some of our happy pack members! 🐕
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
