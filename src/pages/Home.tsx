import React from 'react';
import { Button } from '@/components/ui/button';
import DogProfileGrid from '@/components/home/DogProfileGrid';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-12">
          <div className="text-center text-white">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/lovable-uploads/44625680-8965-4fb7-8695-83ae9b55184c.png" 
                alt="TailCircle Logo" 
                className="w-24 h-24 mr-4"
                style={{ clipPath: 'circle(50px at 150px 200px)' }}
              />
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                TailCircle
              </h1>
            </div>
            <p className="text-xl md:text-2xl font-light mb-8 text-white/90 max-w-2xl mx-auto">
              Where dog lovers meet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-xl text-lg px-8 py-6 rounded-full font-semibold"
              >
                Browse Nearby Dogs
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 rounded-full font-semibold"
              >
                Find Events
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <DogProfileGrid />
      </main>
    </div>
  );
};

export default Home;