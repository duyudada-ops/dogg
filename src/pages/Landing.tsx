
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, MapPin, Heart, Calendar, ArrowRight, CheckCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AutoCarousel } from '@/components/ui/auto-carousel';
import { CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { dogPhotos } from '../../data/dogPhotos';
import { SafeImage } from '@/components/SafeImage';
import { galleryService, GalleryPhoto } from '@/lib/galleryService';

const Landing = () => {
  const [displayPhotos, setDisplayPhotos] = React.useState<(GalleryPhoto | { src: string; alt: string; vibe: string })[]>(
    dogPhotos.slice(0, 12) // Fallback to static photos
  );

  // Load gallery photos on mount
  React.useEffect(() => {
    const loadGalleryPhotos = async () => {
      try {
        const galleryPhotos = await galleryService.getPublicPhotos(12);
        if (galleryPhotos.length > 0) {
          setDisplayPhotos(galleryPhotos);
        }
        // If no gallery photos, keep static photos as fallback
      } catch (error) {
        console.error('Error loading gallery photos:', error);
        // Keep static photos as fallback
      }
    };

    loadGalleryPhotos();
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated paw prints */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-primary/5 text-8xl animate-float">🐾</div>
        <div className="absolute top-32 right-16 text-secondary/5 text-6xl animate-float" style={{animationDelay: '1s'}}>🐾</div>
        <div className="absolute bottom-40 left-20 text-accent/5 text-7xl animate-float" style={{animationDelay: '2s'}}>🐾</div>
        <div className="absolute bottom-16 right-32 text-primary/5 text-5xl animate-float" style={{animationDelay: '0.5s'}}>🐾</div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary/80 min-h-screen flex items-center">
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
        <div className="relative container mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4 animate-bounce">🐕</div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Tail<span className="text-yellow-300">Circle</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Connect your furry friend with compatible playmates and build pawsome friendships in your community! 🎾
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8 text-center">
              <div>
                <Badge className="mb-6 bg-white/20 text-white border-white/20 rounded-full px-4 py-2 font-heading animate-bounce-gentle">
                  🏆 #1 Dog Connection App
                </Badge>
                <div className="flex items-center justify-center gap-3 mb-8">
                  <h1 className="text-5xl lg:text-8xl font-bold font-heading leading-tight bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                    TailCircle
                  </h1>
                  <div className="flex flex-col gap-2">
                    <div className="text-6xl animate-float">🐾</div>
                    <div className="text-6xl animate-float" style={{animationDelay: '0.5s'}}>🐾</div>
                  </div>
                </div>
                <p className="text-xl lg:text-2xl font-light text-white/90 mt-6 max-w-2xl mx-auto font-body">
                  Connect your furry friend with compatible playmates and build pawsome friendships in your community! 🎾
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  asChild
                  size="lg" 
                  variant="warm"
                  className="text-lg px-10 py-6 font-semibold font-heading shadow-xl"
                >
                  <Link to="/auth?signup=true">
                    <span className="mr-2">🚀</span>
                    Try Free Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  asChild
                  size="lg" 
                  variant="outline"
                  className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-primary bg-gradient-to-r from-yellow-400/10 to-orange-400/10 backdrop-blur-sm text-lg px-8 py-6 rounded-full font-semibold shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 hover:scale-105"
                >
                  <Link to="/billing">
                    Go Premium
                    <Crown className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative lg:flex lg:justify-center">
              {/* Happy Dog + Owner Photo Carousel */}
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 overflow-hidden">
                  <div className="relative aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden rounded-2xl">
                    <AutoCarousel className="w-full h-full" autoSlideInterval={2500}>
                      <CarouselContent className="h-full">
                        {displayPhotos.map((dog, i) => (
                          <CarouselItem key={i} className="h-full">
                            <div className="relative w-full h-full overflow-hidden rounded-xl">
                              <SafeImage 
                                src={dog.src}
                                alt={dog.alt}
                                priority={i === 0}
                                className="w-full h-full object-cover object-center"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-2 bg-white/20 border-white/30 text-white hover:bg-white/30" />
                      <CarouselNext className="right-2 bg-white/20 border-white/30 text-white hover:bg-white/30" />
                    </AutoCarousel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4">
              Why Choose TailCircle?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The smartest way to help your dog make friends and build a community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-warm transition-all duration-300 paw-animation border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-warm">
                  <Heart className="h-10 w-10 text-primary animate-heart-beat" />
                </div>
                <h3 className="text-xl font-semibold font-heading mb-4 text-foreground">Smart Matching</h3>
                <p className="text-muted-foreground font-body">
                  Our algorithm considers temperament, size, and play style to find perfect playmates for your dog! 🎾
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-warm transition-all duration-300 paw-animation border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-warm">
                  <Calendar className="h-10 w-10 text-secondary animate-wiggle" />
                </div>
                <h3 className="text-xl font-semibold font-heading mb-4 text-foreground">Local Events</h3>
                <p className="text-muted-foreground font-body">
                  Discover dog-friendly events, playdates, and meetups happening in your neighborhood! 📍
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-warm transition-all duration-300 paw-animation border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-accent/20 to-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-warm">
                  <Users className="h-10 w-10 text-accent animate-bounce-gentle" />
                </div>
                <h3 className="text-xl font-semibold font-heading mb-4 text-foreground">Safe Community</h3>
                <p className="text-muted-foreground font-body">
                  Verified profiles and safety features ensure a secure environment for you and your dog! 🛡️
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">
              Trusted by Dog Lovers Everywhere
            </h2>
            <div className="flex justify-center items-center gap-8 text-2xl font-bold text-muted-foreground">
              <div>10K+ Dogs</div>
              <div>5K+ Matches</div>
              <div>1K+ Events</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-warm border-0 bg-white/90 backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center shadow-lg">
                    <span className="font-bold text-primary text-lg">S</span>
                  </div>
                  <div>
                    <div className="font-bold font-heading text-foreground">Sarah M. 🐕</div>
                    <div className="text-sm text-muted-foreground font-body">Golden Retriever parent</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic font-body">
                  "My dog found his best friend within a week! The matching algorithm is incredibly accurate and my pup is so much happier! 🎾"
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-warm border-0 bg-white/90 backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center shadow-lg">
                    <span className="font-bold text-secondary text-lg">M</span>
                  </div>
                  <div>
                    <div className="font-bold font-heading text-foreground">Mike R. 🐕‍🦺</div>
                    <div className="text-sm text-muted-foreground font-body">German Shepherd dad</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic font-body">
                  "The events feature helped us find amazing dog meetups in our area. Both of us made new friends! Highly recommend! 🏞️"
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-warm border-0 bg-white/90 backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center shadow-lg">
                    <span className="font-bold text-accent text-lg">L</span>
                  </div>
                  <div>
                    <div className="font-bold font-heading text-foreground">Lisa K. 🐾</div>
                    <div className="text-sm text-muted-foreground font-body">Labrador mom</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic font-body">
                  "Safe, easy to use, and my dog has made so many new friends. Worth every penny of Premium! Best app ever! 💕"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-6">
            <Card className="shadow-warm border-0 bg-white/90 backdrop-blur-sm hover:shadow-paw transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="font-semibold font-heading mb-3 text-foreground flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  How does the matching work?
                </h3>
                <p className="text-muted-foreground font-body">
                  Our smart algorithm considers your dog's breed, size, age, temperament, and activity level to suggest compatible playmates in your area! 🎯
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-warm border-0 bg-white/90 backdrop-blur-sm hover:shadow-paw transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="font-semibold font-heading mb-3 text-foreground flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Is TailCircle safe for my dog?
                </h3>
                <p className="text-muted-foreground font-body">
                  Yes! All profiles are verified, and we provide safety guidelines for meetups. You control who you connect with and where you meet! 🛡️
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-warm border-0 bg-white/90 backdrop-blur-sm hover:shadow-paw transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="font-semibold font-heading mb-3 text-foreground flex items-center gap-2">
                  <Crown className="h-5 w-5 text-secondary" />
                  What's included in Premium?
                </h3>
                <p className="text-muted-foreground font-body">
                  Premium includes unlimited likes, advanced filters, seeing who liked you, 50-mile event radius, profile boosts, and priority support! ⭐
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-warm border-0 bg-white/90 backdrop-blur-sm hover:shadow-paw transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="font-semibold font-heading mb-3 text-foreground flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Can I cancel my subscription anytime?
                </h3>
                <p className="text-muted-foreground font-body">
                  Absolutely! You can cancel your Premium subscription anytime from your account settings with no questions asked! 😊
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto text-white">
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-6">
              Ready to Help Your Dog Make New Friends?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of happy dog owners and start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-xl text-lg px-8 py-6 rounded-full font-semibold"
              >
                <Link to="/auth?signup=true">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline"
                className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-primary bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm text-lg px-8 py-6 rounded-full font-semibold shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 hover:scale-105"
              >
                <Link to="/billing">
                  View Premium Plans
                  <Crown className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
