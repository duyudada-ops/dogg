import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, MapPin, Heart, Calendar, ArrowRight, CheckCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div>
                <Badge className="mb-4 bg-white/20 text-white border-white/20">
                  #1 Dog Dating App
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold font-heading leading-tight">
                  Where Dog Lovers Find Their Perfect Match
                </h1>
                <p className="text-xl lg:text-2xl font-light text-white/90 mt-6 max-w-lg">
                  Connect your dog with compatible playmates and build lasting friendships in your community.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 shadow-xl text-lg px-8 py-6 rounded-full font-semibold"
                >
                  <Link to="/auth">
                    Try Free Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  asChild
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 rounded-full font-semibold"
                >
                  <Link to="/billing">
                    Go Premium
                    <Crown className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="aspect-square bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin className="h-16 w-16 mx-auto mb-4 text-white/80" />
                    <h3 className="text-xl font-semibold mb-2">Interactive Dog Map</h3>
                    <p className="text-white/80">See nearby dogs in real-time</p>
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
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold font-heading mb-4">Smart Matching</h3>
                <p className="text-muted-foreground font-body">
                  Our algorithm considers temperament, size, and play style to find perfect playmates for your dog.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold font-heading mb-4">Local Events</h3>
                <p className="text-muted-foreground font-body">
                  Discover dog-friendly events, playdates, and meetups happening in your neighborhood.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold font-heading mb-4">Safe Community</h3>
                <p className="text-muted-foreground font-body">
                  Verified profiles and safety features ensure a secure environment for you and your dog.
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
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-primary">S</span>
                  </div>
                  <div>
                    <div className="font-semibold">Sarah M.</div>
                    <div className="text-sm text-muted-foreground">Golden Retriever owner</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "My dog found his best friend within a week! The matching algorithm is incredibly accurate."
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-secondary">M</span>
                  </div>
                  <div>
                    <div className="font-semibold">Mike R.</div>
                    <div className="text-sm text-muted-foreground">German Shepherd owner</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "The events feature helped us find amazing dog meetups in our area. Highly recommend!"
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-green-600">L</span>
                  </div>
                  <div>
                    <div className="font-semibold">Lisa K.</div>
                    <div className="text-sm text-muted-foreground">Labrador owner</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "Safe, easy to use, and my dog has made so many new friends. Worth every penny of Premium!"
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
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold font-heading mb-2">How does the matching work?</h3>
                <p className="text-muted-foreground font-body">
                  Our smart algorithm considers your dog's breed, size, age, temperament, and activity level to suggest compatible playmates in your area.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold font-heading mb-2">Is TailCircle safe for my dog?</h3>
                <p className="text-muted-foreground font-body">
                  Yes! All profiles are verified, and we provide safety guidelines for meetups. You control who you connect with and where you meet.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold font-heading mb-2">What's included in Premium?</h3>
                <p className="text-muted-foreground font-body">
                  Premium includes unlimited likes, advanced filters, seeing who liked you, 50-mile event radius, profile boosts, and priority support.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold font-heading mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-muted-foreground font-body">
                  Absolutely! You can cancel your Premium subscription anytime from your account settings with no questions asked.
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
                <Link to="/auth">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 rounded-full font-semibold"
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