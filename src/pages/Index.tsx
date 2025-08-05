import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthPage } from '@/components/auth/AuthPage';
import { Navbar } from '@/components/layout/Navbar';

const Index = () => {
  const { user, loading } = useAuth();

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🐕 Welcome to PawConnect!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connect with fellow dog owners in your community
          </p>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg mb-4">
              Hello, {user.user_metadata?.full_name || user.email}! 
            </p>
            <p className="text-muted-foreground">
              You're now signed in and ready to start connecting with other dog owners. 
              Next, we'll help you create your dog's profile!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
