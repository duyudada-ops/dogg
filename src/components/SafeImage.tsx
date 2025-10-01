import React from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

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
    setImgSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      // Use verified real dog photos from Pexels as fallbacks
      const fallbacks = [
        'https://images.pexels.com/photos/19846653/pexels-photo-19846653.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/16539152/pexels-photo-16539152.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/21821337/pexels-photo-21821337.jpeg?auto=compress&cs=tinysrgb&w=800'
      ];
      const randomFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      setImgSrc(randomFallback);
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