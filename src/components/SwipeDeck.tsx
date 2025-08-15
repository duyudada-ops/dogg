import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Heart, X, Star } from 'lucide-react';
import { DogProfile } from '@/lib/types';

interface SwipeDeckProps {
  dogs: DogProfile[];
  onSwipe: (direction: 'left' | 'right' | 'up', dog: DogProfile) => void;
}

export const SwipeDeck: React.FC<SwipeDeckProps> = ({ dogs, onSwipe }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const currentDog = dogs[currentIndex];
  const nextDog = dogs[currentIndex + 1];

  if (!currentDog) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🐾</div>
        <h3 className="text-lg font-semibold">No more dogs to show!</h3>
      </div>
    );
  }

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setStartPos({ x: clientX, y: clientY });
    setDragOffset({ x: 0, y: 0 });
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    
    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;
    
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    const threshold = 100;
    const { x, y } = dragOffset;
    
    if (Math.abs(x) > threshold || Math.abs(y) > threshold) {
      if (Math.abs(y) > Math.abs(x) && y < -threshold) {
        // Swipe up - super like
        onSwipe('up', currentDog);
      } else if (x > threshold) {
        // Swipe right - like
        onSwipe('right', currentDog);
      } else if (x < -threshold) {
        // Swipe left - pass
        onSwipe('left', currentDog);
      }
      setCurrentIndex(prev => prev + 1);
    }
    
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  const getRotation = () => {
    return dragOffset.x * 0.1; // Slight rotation based on horizontal movement
  };

  const getOpacity = () => {
    const distance = Math.sqrt(dragOffset.x ** 2 + dragOffset.y ** 2);
    return Math.max(0.7, 1 - distance / 200);
  };

  const getSwipeDirection = () => {
    const { x, y } = dragOffset;
    const threshold = 50;
    
    if (Math.abs(y) > Math.abs(x) && y < -threshold) return 'up';
    if (x > threshold) return 'right';
    if (x < -threshold) return 'left';
    return null;
  };

  const getSwipeColor = () => {
    const direction = getSwipeDirection();
    switch (direction) {
      case 'right': return 'rgba(34, 197, 94, 0.8)'; // green
      case 'left': return 'rgba(239, 68, 68, 0.8)'; // red
      case 'up': return 'rgba(234, 179, 8, 0.8)'; // yellow
      default: return 'transparent';
    }
  };

  const getSwipeIcon = () => {
    const direction = getSwipeDirection();
    switch (direction) {
      case 'right': return <Heart className="h-12 w-12 text-white" />;
      case 'left': return <X className="h-12 w-12 text-white" />;
      case 'up': return <Star className="h-12 w-12 text-white" />;
      default: return null;
    }
  };

  return (
    <div className="relative max-w-sm mx-auto">
      {/* Next card (behind) */}
      {nextDog && (
        <Card className="absolute inset-0 transform scale-95 opacity-50">
          <CardContent className="p-0 h-96">
            <div className="relative h-full rounded-lg overflow-hidden">
              <img
                src={nextDog.photo_url || '/src/assets/dog-1.jpg'}
                alt={nextDog.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                <h3 className="font-semibold text-lg">{nextDog.name}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current card */}
      <Card 
        ref={cardRef}
        className="relative cursor-grab active:cursor-grabbing select-none"
        style={{
          transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${getRotation()}deg)`,
          opacity: getOpacity(),
          zIndex: 10,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
        }}
        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
        onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={handleEnd}
      >
        <CardContent className="p-0 h-96">
          <div className="relative h-full rounded-lg overflow-hidden">
            {/* Swipe overlay */}
            <div 
              className="absolute inset-0 flex items-center justify-center z-10"
              style={{ backgroundColor: getSwipeColor() }}
            >
              {getSwipeIcon()}
            </div>

            <img
              src={currentDog.photo_url || '/src/assets/dog-1.jpg'}
              alt={currentDog.name}
              className="w-full h-full object-cover"
              draggable={false}
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="font-semibold text-xl">{currentDog.name}</h3>
                  <div className="flex items-center gap-1 text-sm opacity-90">
                    <span>{currentDog.age} years old</span>
                    <span>•</span>
                    <span>{currentDog.breed}</span>
                  </div>
                  {currentDog.location && (
                    <div className="flex items-center gap-1 text-sm opacity-75 mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{currentDog.location}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {currentDog.gender}
                  </Badge>
                </div>
              </div>
              
              {currentDog.bio && (
                <p className="text-sm mt-2 opacity-90 line-clamp-2">
                  {currentDog.bio}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <div className="text-center mt-4 text-sm text-muted-foreground">
        <p>Drag or use buttons below to interact</p>
      </div>
    </div>
  );
};