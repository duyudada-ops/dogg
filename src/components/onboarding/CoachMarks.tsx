import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, MessageCircle, Calendar } from 'lucide-react';

interface CoachMarksProps {
  isVisible: boolean;
  onComplete: () => void;
}

const CoachMarks: React.FC<CoachMarksProps> = ({ isVisible, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to TailCircle!",
      description: "Swipe right on dogs you'd like your pup to meet. Let's start exploring!",
      icon: <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />,
      position: "center"
    },
    {
      title: "Start Conversations",
      description: "When you both like each other, you can chat and arrange a playdate!",
      icon: <MessageCircle className="h-12 w-12 text-blue-500 mx-auto mb-4" />,
      position: "center"
    },
    {
      title: "Join Local Events",
      description: "Find dog meetups, training classes, and fun events near you.",
      icon: <Calendar className="h-12 w-12 text-green-500 mx-auto mb-4" />,
      position: "center"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const skipTour = () => {
    onComplete();
  };

  useEffect(() => {
    if (isVisible) {
      setCurrentStep(0);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const currentStepData = steps[currentStep];

  return (
    <Dialog open={isVisible} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <div className="text-center p-6">
          {currentStepData.icon}
          <h2 className="text-xl font-bold font-heading mb-3">
            {currentStepData.title}
          </h2>
          <p className="text-muted-foreground font-body mb-6">
            {currentStepData.description}
          </p>
          
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={skipTour} className="flex-1">
              Skip Tour
            </Button>
            <Button onClick={nextStep} className="flex-1">
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoachMarks;