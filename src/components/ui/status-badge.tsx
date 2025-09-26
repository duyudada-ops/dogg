import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StatusBadgeProps {
  status: 'verified' | 'active' | 'premium' | 'new';
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusConfig = {
    verified: {
      icon: CheckCircle,
      label: 'Verified',
      className: 'bg-success/10 text-success border-success/20 hover:bg-success/20'
    },
    active: {
      icon: Clock,
      label: 'Active Now',
      className: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20'
    },
    premium: {
      icon: Star,
      label: 'Premium',
      className: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 hover:from-yellow-500 hover:to-orange-600'
    },
    new: {
      icon: Star,
      label: 'New',
      className: 'bg-accent/10 text-accent border-accent/20 hover:bg-accent/20'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant="outline" 
      className={cn(
        'inline-flex items-center gap-1 text-xs font-medium transition-all duration-200 hover:scale-105',
        config.className,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};