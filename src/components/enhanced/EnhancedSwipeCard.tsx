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
      {/* Glass card effect with enhanced styling */}
      <div className="absolute inset-0 bg-gradient-card-bg backdrop-blur-md rounded-3xl border-2 border-border/30 shadow-paw overflow-hidden hover:shadow-glow transition-all duration-300">
        {/* Dog image with overlay */}
        <div className="relative h-64 overflow-hidden">
          <SafeImage
            src={dog.photo_url}
            alt={dog.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 bg-card/90 rounded-full p-3 backdrop-blur-sm border border-border/30">
            <Camera className="w-5 h-5 text-primary" />
          </div>
          
          {/* Enhanced gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent h-24"></div>
        </div>

        {/* Dog info with improved typography */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-display font-heading text-foreground">
              {dog.name}, {dog.age}
            </h3>
            {dog.rating && (
              <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-h3 font-bold text-yellow-700 dark:text-yellow-300">{dog.rating}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-accent mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-h3 font-medium">{dog.location}</span>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="tag-water px-4 py-2 rounded-full text-h3 font-medium shadow-tag">
              {dog.breed}
            </span>
            {dog.traits?.slice(0, 2).map((trait, index) => (
              <span
                key={index}
                className={`px-4 py-2 rounded-full text-h3 font-medium shadow-tag ${
                  index === 0 ? 'tag-fetch' : 'tag-parks'
                }`}
              >
                {trait}
              </span>
            ))}
          </div>

          <p className="text-body-relaxed text-foreground/80 leading-relaxed">
            {dog.bio || 'A lovely dog looking for new friends to play with!'}
          </p>
        </div>
      </div>

      {/* Enhanced swipe indicators */}
      {position.x > 50 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-success to-accent text-white px-10 py-6 rounded-full font-bold text-h1 rotate-12 border-4 border-white/30 shadow-glow backdrop-blur-sm animate-scale-in">
          ❤️ LIKE
        </div>
      )}
      
      {position.x < -50 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-destructive to-red-600 text-white px-10 py-6 rounded-full font-bold text-h1 -rotate-12 border-4 border-white/30 shadow-glow backdrop-blur-sm animate-scale-in">
          ✖️ NOPE
        </div>
      )}
    </div>
  );
};

export default EnhancedSwipeCard;