import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileStep {
  id: string;
  title: string;
  completed: boolean;
  required: boolean;
}

interface ProfileProgressProps {
  steps: ProfileStep[];
  onStepClick: (stepId: string) => void;
}

const ProfileProgress: React.FC<ProfileProgressProps> = ({ steps, onStepClick }) => {
  const completedSteps = steps.filter(step => step.completed).length;
  const totalSteps = steps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;
  const isProfileComplete = progressPercentage >= 80;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="font-heading">Complete Your Profile</span>
          <span className="text-sm font-body text-muted-foreground">
            {completedSteps}/{totalSteps} completed
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-body">Profile Progress</span>
            <span className="font-semibold">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          {progressPercentage >= 80 && (
            <p className="text-sm text-green-600 font-body">
              🎉 Great! Your profile is ready to attract matches.
            </p>
          )}
        </div>

        <div className="space-y-2">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => onStepClick(step.id)}
            >
              {step.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              )}
              <span className={`font-body flex-1 ${step.completed ? 'line-through text-muted-foreground' : ''}`}>
                {step.title}
                {step.required && !step.completed && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </span>
            </div>
          ))}
        </div>

        {isProfileComplete && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border">
            <div className="flex items-center gap-3 mb-3">
              <Crown className="h-6 w-6 text-yellow-500" />
              <div>
                <h4 className="font-semibold font-heading">Profile Complete!</h4>
                <p className="text-sm text-muted-foreground font-body">
                  Your dog is ready to make new friends.
                </p>
              </div>
            </div>
            <Button asChild className="w-full font-heading">
              <Link to="/discover">
                Start Swiping
              </Link>
            </Button>
          </div>
        )}

        {!isProfileComplete && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground font-body mb-3">
              Complete at least 80% of your profile to start matching
            </p>
            <Button 
              variant="outline" 
              className="font-body"
              onClick={() => {
                const firstIncomplete = steps.find(s => !s.completed);
                if (firstIncomplete) onStepClick(firstIncomplete.id);
              }}
            >
              Continue Setup
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileProgress;