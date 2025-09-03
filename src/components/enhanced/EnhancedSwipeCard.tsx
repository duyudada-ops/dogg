import React, { useState } from 'react';
import { Heart, X, Star, MapPin, Camera } from 'lucide-react';
import { SafeImage } from '@/components/SafeImage';

interface Dog {
  id: string;
  name: string;
  age: number;
  breed: string;
  location: string;
  bio?: string;
  photo_url: string;
  rating?: number;
  traits?: string[];
}

interface EnhancedSwipeCardProps {
  dog: Dog;
  onSwipe: (direction: 'left' | 'right') => void;
}

const EnhancedSwipeCard = ({ dog, onSwipe }: EnhancedSwipeCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const startX = e.clientX - rect.left - rect.width / 2;
    const startY = e.clientY - rect.top - rect.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - rect.left - rect.width / 2 - startX;
      const newY = e.clientY - rect.top - rect.height / 2 - startY;
      const newRotation = newX * 0.1;

      setPosition({ x: newX, y: newY });
      setRotation(Math.max(-15, Math.min(15, newRotation)));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      if (Math.abs(position.x) > 100) {
        onSwipe(position.x > 0 ? 'right' : 'left');
      }

      // Reset position
      setPosition({ x: 0, y: 0 });
      setRotation(0);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className={`relative w-80 h-96 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) ${
          isDragging ? 'scale(1.05)' : 'scale(1)'
        }`,
        transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Glass card effect */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md rounded-3xl border border-border/50 shadow-2xl overflow-hidden">
        {/* Dog image */}
        <div className="relative h-64 overflow-hidden">
          <SafeImage
            src={dog.photo_url}
            alt={dog.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-background/90 rounded-full p-2 backdrop-blur-sm">
            <Camera className="w-5 h-5 text-foreground" />
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-20"></div>
        </div>

        {/* Dog info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-2xl font-bold text-foreground">
              {dog.name}, {dog.age}
            </h3>
            {dog.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-foreground font-medium">{dog.rating}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{dog.location}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">
              {dog.breed}
            </span>
            {dog.traits?.slice(0, 2).map((trait, index) => (
              <span
                key={index}
                className="bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium"
              >
                {trait}
              </span>
            ))}
          </div>

          <p className="text-muted-foreground text-sm line-clamp-2">
            {dog.bio || 'A lovely dog looking for new friends to play with!'}
          </p>
        </div>
      </div>

      {/* Swipe indicators */}
      {position.x > 50 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-8 py-4 rounded-full font-bold text-xl rotate-12 border-4 border-green-400 shadow-lg backdrop-blur-sm">
          LIKE
        </div>
      )}
      
      {position.x < -50 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-8 py-4 rounded-full font-bold text-xl -rotate-12 border-4 border-red-400 shadow-lg backdrop-blur-sm">
          NOPE
        </div>
      )}
    </div>
  );
};

export default EnhancedSwipeCard;