import React from 'react';
import { dogPhotos } from '../../data/dogPhotos';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

// Simple hash function to deterministically pick a fallback
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

export const SafeImage: React.FC<SafeImageProps> = ({ 
  src, 
  alt, 
  className = "w-full h-full object-cover object-center",
  priority = false 
}) => {
  const [imgSrc, setImgSrc] = React.useState(src);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  
  React.useEffect(() => {
    // If src is empty or not a local dog photo, use approved fallback immediately
    if (!src || !src.startsWith('/dog-profiles/')) {
      const index = hashString(alt) % dogPhotos.length;
      setImgSrc(dogPhotos[index].src);
      setHasError(false);
      setIsLoading(true);
    } else {
      setImgSrc(src);
      setIsLoading(true);
      setHasError(false);
    }
  }, [src, alt]);

  const handleError = () => {
    if (!hasError) {
      // Use local dogPhotos as fallback - deterministic based on alt text
      const index = hashString(alt) % dogPhotos.length;
      setImgSrc(dogPhotos[index].src);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 animate-pulse flex items-center justify-center">
          <div className="text-4xl animate-bounce">🐾</div>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        loading={priority ? "eager" : "lazy"}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  );
};