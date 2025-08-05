import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Calendar, MessageCircle, Sparkles, Trophy, Star } from 'lucide-react';
import dog1 from '@/assets/dog-1.jpg';
import dog2 from '@/assets/dog-2.jpg';
import dog3 from '@/assets/dog-3.jpg';
import dog4 from '@/assets/dog-4.jpg';
import dog5 from '@/assets/dog-5.jpg';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent bg-[length:200%_200%] animate-[gradient_15s_ease_infinite]">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative container mx-auto px-4 py-12">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
                  <Sparkles className="h-12 w-12" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Welcome PawPal 🐾
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 text-white/90 max-w-2xl mx-auto">
              Ready to find your pup's perfect playmate? Welcome to the pack! Where every pup has a match!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-xl text-lg px-8 py-6 rounded-full font-semibold"
                onClick={() => navigate('/swipe')}
              >
                <Heart className="mr-2 h-5 w-5" />
                Start Finding Matches
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-xl text-lg px-8 py-6 rounded-full font-semibold"
                onClick={() => navigate('/matches')}
              >
                <Users className="mr-2 h-5 w-5" />
                View Your Matches
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Dog Images */}
        <div className="absolute top-20 left-10 hidden lg:block">
          <div className="relative">
            <img src={dog1} alt="Happy dog" className="w-20 h-20 rounded-full object-cover border-4 border-white/20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
          </div>
        </div>
        <div className="absolute top-32 right-16 hidden lg:block">
          <div className="relative">
            <img src={dog2} alt="Cute dog" className="w-16 h-16 rounded-full object-cover border-4 border-white/20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }} />
          </div>
        </div>
        <div className="absolute bottom-20 left-20 hidden lg:block">
          <div className="relative">
            <img src={dog3} alt="Playful dog" className="w-24 h-24 rounded-full object-cover border-4 border-white/20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 space-y-16">
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/30 hover:scale-105 cursor-pointer" onClick={() => navigate('/swipe')}>
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Find Love</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Swipe through adorable pups and find the perfect playmate for your furry friend
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/30 hover:scale-105 cursor-pointer" onClick={() => navigate('/matches')}>
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Your Pack</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Connect with matched dog parents and plan amazing playdates together
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/30 hover:scale-105 cursor-pointer" onClick={() => navigate('/events')}>
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-success to-primary rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Paw Parties</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Join fun local events, dog shows, and community gatherings near you
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/30 hover:scale-105 cursor-pointer" onClick={() => navigate('/matches')}>
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-destructive to-accent rounded-full mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Paw Chat</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Share stories, tips, and arrange meetups with fellow dog lovers
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Dashboard */}
        <div className="bg-gradient-to-r from-muted/50 via-background to-muted/50 rounded-3xl p-8 border border-border/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Your Paw-some Journey
            </h2>
            <p className="text-muted-foreground">See how you're connecting with the community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <p className="text-4xl font-bold text-primary mb-2">12</p>
              <p className="text-muted-foreground font-medium">Perfect Matches</p>
              <p className="text-sm text-muted-foreground/70">Dogs who loved you back!</p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent to-secondary rounded-full mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="h-10 w-10 text-white" />
              </div>
              <p className="text-4xl font-bold text-accent mb-2">5</p>
              <p className="text-muted-foreground font-medium">Active Chats</p>
              <p className="text-sm text-muted-foreground/70">Conversations in progress</p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-success to-primary rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <p className="text-4xl font-bold text-success mb-2">3</p>
              <p className="text-muted-foreground font-medium">Events Joined</p>
              <p className="text-sm text-muted-foreground/70">Community adventures</p>
            </div>
          </div>
        </div>

        {/* Featured Dogs Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Meet Some Amazing Pups Nearby
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            These adorable dogs are looking for new friends. Start swiping to find your perfect match!
          </p>
          
          <div className="flex justify-center gap-6 mb-8 overflow-hidden">
            {[dog1, dog2, dog3, dog4, dog5].map((dogImg, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => navigate('/swipe')}>
                <div className="relative">
                  <img 
                    src={dogImg} 
                    alt={`Featured dog ${index + 1}`} 
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-xl text-lg px-8 py-6 rounded-full font-semibold"
            onClick={() => navigate('/swipe')}
          >
            <Heart className="mr-2 h-5 w-5" />
            Start Swiping Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;