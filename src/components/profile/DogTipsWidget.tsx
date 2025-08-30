import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, RefreshCw, Clock } from 'lucide-react';

const dogTips = [
  {
    id: 1,
    category: "Health",
    tip: "Brush your dog's teeth 2-3 times per week to prevent dental disease",
    icon: "🦷",
    timeToRead: "30 sec",
  },
  {
    id: 2,
    category: "Training",
    tip: "Use positive reinforcement - reward good behavior immediately for best results",
    icon: "🎯",
    timeToRead: "45 sec",
  },
  {
    id: 3,
    category: "Exercise",
    tip: "Mental stimulation is as important as physical exercise for dog happiness",
    icon: "🧠",
    timeToRead: "1 min",
  },
  {
    id: 4,
    category: "Nutrition",
    tip: "Fresh water should always be available - dogs need 1 ounce per pound of body weight daily",
    icon: "💧",
    timeToRead: "30 sec",
  },
  {
    id: 5,
    category: "Safety",
    tip: "Keep chocolate, grapes, and onions away from dogs - they're toxic to pets",
    icon: "⚠️",
    timeToRead: "45 sec",
  },
  {
    id: 6,
    category: "Grooming",
    tip: "Regular nail trims prevent painful overgrowth and improve walking comfort",
    icon: "✂️",
    timeToRead: "1 min",
  },
  {
    id: 7,
    category: "Behavior",
    tip: "Socialization before 16 weeks old is crucial for a well-adjusted adult dog",
    icon: "🐕‍🦺",
    timeToRead: "1 min",
  },
  {
    id: 8,
    category: "Weather",
    tip: "Hot pavement can burn paw pads - test with the back of your hand first",
    icon: "🌡️",
    timeToRead: "30 sec",
  },
];

export function DogTipsWidget() {
  const [currentTip, setCurrentTip] = useState(dogTips[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getRandomTip = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const randomTip = dogTips[Math.floor(Math.random() * dogTips.length)];
      setCurrentTip(randomTip);
      setIsRefreshing(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomTip = dogTips[Math.floor(Math.random() * dogTips.length)];
      setCurrentTip(randomTip);
    }, 15000); // Change tip every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-accent animate-pulse" />
            Daily Dog Tip
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={getRandomTip}
            disabled={isRefreshing}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`space-y-4 transition-all duration-300 ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-primary/20">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{currentTip.icon}</span>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {currentTip.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {currentTip.timeToRead}
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {currentTip.tip}
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              💡 Tip changes automatically every 15 seconds
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}