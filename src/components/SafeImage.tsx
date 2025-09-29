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
    console.log('SafeImage: Image failed to load:', src);
    if (!hasError) {
      // Use local fallback images
      const fallbacks = [
        '/dog-profiles/dog01.jpg',
        '/dog-profiles/dog02.jpg'
      ];
      const randomFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      console.log('SafeImage: Using fallback:', randomFallback);
      setImgSrc(randomFallback);
      setHasError(true);
    } else {
      console.log('SafeImage: All fallbacks failed for:', src);
    }
  };

  const handleLoad = () => {
    console.log('SafeImage: Image loaded successfully:', src);
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