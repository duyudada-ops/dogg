import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AutoCarousel } from '@/components/ui/auto-carousel';
import { CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { SafeImage } from '@/components/SafeImage';
import { dogPhotos } from '../../../data/dogPhotos';
import { Heart, Camera } from 'lucide-react';

const photoCategories = [
  { name: 'Cute Moments', vibes: ['cute', 'adorable'], emoji: '😍' },
  { name: 'Playtime', vibes: ['playing'], emoji: '🎾' },
  { name: 'Sleepy Time', vibes: ['sleeping'], emoji: '😴' },
  { name: 'Water Fun', vibes: ['swimming'], emoji: '🏊‍♀️' },
  { name: 'Cool Dogs', vibes: ['sunglasses'], emoji: '😎' },
];

export function PhotoShowcase() {
  const [selectedCategory, setSelectedCategory] = useState(photoCategories[0]);
  const [displayPhotos, setDisplayPhotos] = useState<typeof dogPhotos>([]);

  useEffect(() => {
    const filteredPhotos = dogPhotos.filter(photo => 
      selectedCategory.vibes.includes(photo.vibe)
    ).slice(0, 8); // Limit to 8 photos per category
    
    setDisplayPhotos(filteredPhotos);
  }, [selectedCategory]);

  const handleCategoryChange = () => {
    const currentIndex = photoCategories.indexOf(selectedCategory);
    const nextIndex = (currentIndex + 1) % photoCategories.length;
    setSelectedCategory(photoCategories[nextIndex]);
  };

  useEffect(() => {
    const interval = setInterval(handleCategoryChange, 10000); // Change category every 10 seconds
    return () => clearInterval(interval);
  }, [selectedCategory]);

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Dog Photo Gallery
          </span>
          <Badge variant="outline" className="text-xs">
            {selectedCategory.emoji} {selectedCategory.name}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Category selector */}
          <div className="flex flex-wrap gap-2">
            {photoCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category)}
                className={`text-xs px-3 py-1 rounded-full transition-all duration-200 ${
                  selectedCategory.name === category.name
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category.emoji} {category.name}
              </button>
            ))}
          </div>

          {/* Auto-rotating photo carousel */}
          <AutoCarousel autoSlideInterval={3000} className="w-full">
            <CarouselContent>
              {displayPhotos.map((photo, index) => (
                <CarouselItem key={`${photo.src}-${index}`}>
                  <div className="relative group">
                    <div className="w-full h-48 rounded-lg overflow-hidden">
                      <SafeImage
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Overlay with gradient and info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-sm font-medium line-clamp-2">{photo.alt}</p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {photo.vibe}
                          </Badge>
                          <button className="p-1 hover:bg-white/20 rounded-full transition-colors">
                            <Heart className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </AutoCarousel>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>{displayPhotos.length} photos in this category</span>
            <span>🔄 Auto-changing every 10s</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}