import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const SkeletonLoader = () => {
  return (
    <Card className="overflow-hidden shadow-card">
      <div className="relative h-56 shimmer rounded-t-lg"></div>
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="shimmer h-8 w-32 rounded"></div>
          <div className="shimmer h-6 w-12 rounded-full"></div>
        </div>
        <div className="shimmer h-5 w-24 rounded"></div>
        <div className="shimmer h-4 w-36 rounded"></div>
        <div className="space-y-2">
          <div className="shimmer h-4 w-full rounded"></div>
          <div className="shimmer h-4 w-3/4 rounded"></div>
        </div>
        <div className="flex gap-3 pt-2">
          <div className="shimmer h-10 flex-1 rounded"></div>
          <div className="shimmer h-10 flex-1 rounded"></div>
        </div>
      </CardContent>
    </Card>
  );
};

const SkeletonGrid = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonLoader key={i} />
      ))}
    </div>
  );
};

export { SkeletonLoader, SkeletonGrid };