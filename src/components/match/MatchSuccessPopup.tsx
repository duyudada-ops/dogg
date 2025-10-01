import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Calendar, X } from 'lucide-react';
import { SafeImage } from '@/components/SafeImage';

interface DogProfile {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  location: string | null;
  bio: string | null;
  photo_url: string | null;
  user_id: string;
}

interface MatchSuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userDog: DogProfile;
  matchedDog: DogProfile;
}

const MatchSuccessPopup: React.FC<MatchSuccessPopupProps> = ({
  isOpen,
  onClose,
  userDog,
  matchedDog,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Play barking sound
      playBarkSound();
      
      // Show confetti effect
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [isOpen]);

  const playBarkSound = () => {
    try {
      // Create multiple bark sounds for a realistic effect
      const barkSounds = [
        new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIac0GJ0fDVeSkF'),
        new Audio('data:audio/wav;base64,UklGRnwGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU4GAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIac0GJ0fDVeSkF'),
      ];
      
      const randomBark = barkSounds[Math.floor(Math.random() * barkSounds.length)];
      randomBark.volume = 0.3;
      randomBark.play().catch(console.error);
      
      // Add a second bark after delay
      setTimeout(() => {
        const secondBark = barkSounds[Math.floor(Math.random() * barkSounds.length)];
        secondBark.volume = 0.2;
        secondBark.play().catch(console.error);
      }, 600);
    } catch (error) {
      console.error('Error playing bark sound:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <div className="relative text-center p-6">
          {/* Confetti Effect */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-2xl animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`,
                  }}
                >
                  {['🎉', '🐾', '❤️', '🦴', '🎊'][Math.floor(Math.random() * 5)]}
                </div>
              ))}
            </div>
          )}

          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Match Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-primary mb-2">🎉 It's a Match!</h2>
            <p className="text-muted-foreground">
              {userDog.name} and {matchedDog.name} liked each other!
            </p>
          </div>

          {/* Dog Avatars */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="text-center">
              <Avatar className="h-20 w-20 border-4 border-primary">
                <SafeImage 
                  src={userDog.photo_url || ''} 
                  alt={`${userDog.name} - ${userDog.breed}`}
                  className="object-cover rounded-full"
                />
                <AvatarFallback className="text-2xl">🐕</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium mt-2">{userDog.name}</p>
            </div>
            
            <Heart className="h-8 w-8 text-red-500 animate-pulse" />
            
            <div className="text-center">
              <Avatar className="h-20 w-20 border-4 border-primary">
                <SafeImage 
                  src={matchedDog.photo_url || ''} 
                  alt={`${matchedDog.name} - ${matchedDog.breed}`}
                  className="object-cover rounded-full"
                />
                <AvatarFallback className="text-2xl">🐕</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium mt-2">{matchedDog.name}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full" size="lg">
              <MessageCircle className="h-5 w-5 mr-2" />
              Send a Message
            </Button>
            
            <Button variant="outline" className="w-full" size="lg">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule a Playdate
            </Button>
            
            <Button variant="ghost" className="w-full" onClick={onClose}>
              Keep Swiping
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MatchSuccessPopup;