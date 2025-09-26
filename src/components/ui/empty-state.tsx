import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  className 
}: EmptyStateProps) => {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center text-center py-12 px-6',
      className
    )}>
      {Icon && (
        <div className="mb-6 p-4 rounded-full bg-muted/50">
          <Icon className="h-12 w-12 text-muted-foreground" />
        </div>
      )}
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
        {description}
      </p>
      
      {action && (
        <Button 
          onClick={action.onClick}
          className="bg-gradient-primary text-white hover:opacity-90 transition-opacity"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};