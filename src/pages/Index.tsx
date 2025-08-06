import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthPage } from '@/components/auth/AuthPage';
import { DogProfileCreation } from '@/components/dog/DogProfileCreation';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showDogProfileForm, setShowDogProfileForm] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  if (showDogProfileForm) {
    return <DogProfileCreation onComplete={() => navigate('/')} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Hello Pupulation 🐾</h1>
          <p className="text-xl font-semibold text-teal-600 mb-8">
            Welcome to the pack! Where every pup has a match!
          </p>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg mb-4">
              Hello, {user.user_metadata?.full_name || user.email}! 
            </p>
            <p className="text-muted-foreground mb-6">
              You're now signed in and ready to start connecting with other dog owners. 
              Let's create your dog's profile to get started!
            </p>
            <Button 
              onClick={() => setShowDogProfileForm(true)}
              size="lg"
              className="text-lg px-8 py-3"
            >
              Create Dog Profile
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
