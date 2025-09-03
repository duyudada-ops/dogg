import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModernLandingHero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary via-secondary to-primary/80 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 animate-pulse"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 2 + 's',
              animationDuration: Math.random() * 3 + 2 + 's'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4 animate-bounce">🐕</div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Tail<span className="text-yellow-300">Circle</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed">
            Connect your furry friend with compatible playmates and build pawsome friendships in your community! 🎾
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link to="/auth">
            <Button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg border border-white/30 hover:scale-105 transition-all duration-300 hover:bg-white/30">
              <span className="mr-2">🚀</span>
              Try Free Now
            </Button>
          </Link>
          <Link to="/premium">
            <Button className="bg-yellow-400 text-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 hover:bg-yellow-300">
              <span className="mr-2">👑</span>
              Go Premium
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-8 text-white/80 flex-wrap justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold">10K+</div>
            <div className="text-sm">Happy Dogs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">500+</div>
            <div className="text-sm">Daily Matches</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">50+</div>
            <div className="text-sm">Cities</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowRight className="w-6 h-6 text-white/60 rotate-90" />
        </div>
      </div>
    </div>
  );
};

export default ModernLandingHero;