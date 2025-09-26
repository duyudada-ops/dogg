import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Search } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  illustration?: 'matches' | 'discover';
}

const EmptyState = ({ 
  title, 
  description, 
  actionLabel, 
  onAction, 
  illustration = 'matches' 
}: EmptyStateProps) => {
  const IllustrationIcon = illustration === 'matches' ? Heart : Search;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="relative mb-6">
        <div className="bg-gradient-primary p-8 rounded-full shadow-floating">
          <IllustrationIcon className="h-16 w-16 text-white animate-float" />
        </div>
        <div className="absolute -top-2 -right-2 text-4xl animate-bounce">🐾</div>
      </div>
      
      <h3 className="text-h1 font-heading text-foreground mb-3">{title}</h3>
      <p className="text-body-relaxed text-muted-foreground mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <Button 
          onClick={onAction}
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300 px-8 py-3 text-h3 button-tap"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export { EmptyState };