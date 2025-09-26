import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  type: 'active' | 'new' | 'verified';
  className?: string;
}

const StatusBadge = ({ type, className }: StatusBadgeProps) => {
  const configs = {
    active: {
      icon: Circle,
      text: 'Active Now',
      className: 'status-active'
    },
    new: {
      icon: Sparkles,
      text: 'New',
      className: 'status-new'
    },
    verified: {
      icon: CheckCircle,
      text: 'Verified',
      className: 'status-verified'
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <Badge className={cn(config.className, 'flex items-center gap-1 px-2 py-1', className)}>
      <Icon className="h-3 w-3" />
      <span className="text-xs font-medium">{config.text}</span>
    </Badge>
  );
};

export { StatusBadge };