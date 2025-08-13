import React from 'react';
import { Button } from '@/components/ui/button';
import DogProfileGrid from '@/components/home/DogProfileGrid';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Floating paw prints background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-primary/10 text-6xl animate-float">🐾</div>
        <div className="absolute top-40 right-20 text-secondary/10 text-4xl animate-float" style={{animationDelay: '1s'}}>🐾</div>
        <div className="absolute bottom-32 left-1/4 text-accent/10 text-5xl animate-float" style={{animationDelay: '2s'}}>🐾</div>
        <div className="absolute bottom-20 right-1/3 text-primary/10 text-3xl animate-float" style={{animationDelay: '0.5s'}}>🐾</div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <div className="flex items-center justify-center mb-8 animate-bounce-gentle">
              <div className="relative">
                <img 
                  src="/lovable-uploads/44625680-8965-4fb7-8695-83ae9b55184c.png" 
                  alt="TailCircle Logo" 
                  className="w-24 h-24 mr-4 rounded-full shadow-glow animate-paw-wiggle"
                />
                <div className="absolute -top-2 -right-2 text-2xl animate-heart-beat">❤️</div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight">
                TailCircle
              </h1>
            </div>
            <p className="text-xl md:text-3xl font-light mb-8 text-white/90 max-w-3xl mx-auto font-body">
              Where every tail tells a story and every walk leads to friendship! 🐕💕
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                variant="warm"
                className="text-lg px-10 py-6 font-semibold font-heading shadow-xl transform hover:scale-110 transition-all duration-300"
              >
                <span className="mr-2">🎾</span>
                Find Playmates
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/20 hover:text-white text-lg px-10 py-6 font-semibold font-heading backdrop-blur-sm"
              >
                <span className="mr-2">📅</span>
                Join Events
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
            Meet Your Local Pack! 🐾
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Discover amazing dogs in your neighborhood and help your furry friend make new buddies
          </p>
        </div>
        <DogProfileGrid />
      </main>
    </div>
  );
};

export default Home;