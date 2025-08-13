import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Heart, Camera } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Onboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // User profile data
  const [displayName, setDisplayName] = useState('');
  const [location, setLocation] = useState('');

  // Dog profile data
  const [dogName, setDogName] = useState('');
  const [dogAge, setDogAge] = useState('');
  const [dogSex, setDogSex] = useState('');
  const [dogSize, setDogSize] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [dogBio, setDogBio] = useState('');
  const [temperamentTags, setTemperamentTags] = useState<string[]>([]);

  // Preferences
  const [maxDistance, setMaxDistance] = useState('25');
  const [lookingFor, setLookingFor] = useState('playdates');

  const temperamentOptions = [
    'Friendly', 'Energetic', 'Calm', 'Playful', 'Shy', 'Confident',
    'Gentle', 'Protective', 'Social', 'Independent', 'Loyal', 'Curious'
  ];

  const handleTemperamentToggle = (tag: string) => {
    setTemperamentTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleLocationPermission = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude},${position.coords.longitude}`);
          setStep(2);
        },
        (error) => {
          console.error('Error getting location:', error);
          setStep(2); // Continue without location
        }
      );
    } else {
      setStep(2);
    }
  };

  const handleProfileSetup = async () => {
    if (!displayName.trim()) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }
    setStep(3);
  };

  const handleDogProfileSetup = async () => {
    if (!dogName.trim() || !dogAge || !dogSex || !dogSize || !dogBreed.trim()) {
      toast({ title: "Please fill in all required dog information", variant: "destructive" });
      return;
    }
    setStep(4);
  };

  const handleComplete = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // TODO: Save to database when types are updated
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate saving
      
      toast({ title: "Welcome to TailCircle! 🐾" });
      navigate('/discover');
    } catch (error) {
      console.error('Onboarding error:', error);
      toast({ title: "Error completing setup", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to TailCircle</CardTitle>
          <p className="text-muted-foreground">Let's set up your profile</p>
          <div className="flex justify-center space-x-2 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full ${
                  step >= i ? 'bg-primary' : 'bg-muted'
                }`} 
              />
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Location Permission</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  We need your location to show you nearby dogs and events
                </p>
              </div>
              <Button onClick={handleLocationPermission} className="w-full">
                Allow Location Access
              </Button>
              <Button variant="outline" onClick={() => setStep(2)} className="w-full">
                Skip for Now
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <Heart className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tell us about yourself</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="displayName">Your Name</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <Button onClick={handleProfileSetup} className="w-full">
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <Camera className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Add your dog</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="dogName">Dog's Name *</Label>
                  <Input
                    id="dogName"
                    value={dogName}
                    onChange={(e) => setDogName(e.target.value)}
                    placeholder="Enter your dog's name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dogAge">Age *</Label>
                    <Input
                      id="dogAge"
                      type="number"
                      value={dogAge}
                      onChange={(e) => setDogAge(e.target.value)}
                      placeholder="Age"
                      min="1"
                      max="20"
                    />
                  </div>
                  <div>
                    <Label>Sex *</Label>
                    <Select value={dogSex} onValueChange={setDogSex}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Size *</Label>
                  <Select value={dogSize} onValueChange={setDogSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (under 25 lbs)</SelectItem>
                      <SelectItem value="medium">Medium (25-60 lbs)</SelectItem>
                      <SelectItem value="large">Large (60-90 lbs)</SelectItem>
                      <SelectItem value="extra_large">Extra Large (90+ lbs)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dogBreed">Breed *</Label>
                  <Input
                    id="dogBreed"
                    value={dogBreed}
                    onChange={(e) => setDogBreed(e.target.value)}
                    placeholder="Enter breed"
                  />
                </div>
                <div>
                  <Label htmlFor="dogBio">Bio</Label>
                  <Textarea
                    id="dogBio"
                    value={dogBio}
                    onChange={(e) => setDogBio(e.target.value)}
                    placeholder="Tell us about your dog's personality..."
                    rows={3}
                  />
                </div>
                <Button onClick={handleDogProfileSetup} className="w-full">
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Preferences & Temperament</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Temperament Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {temperamentOptions.map((tag) => (
                      <Button
                        key={tag}
                        type="button"
                        variant={temperamentTags.includes(tag) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleTemperamentToggle(tag)}
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Looking for</Label>
                  <Select value={lookingFor} onValueChange={setLookingFor}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="playdates">Playdates</SelectItem>
                      <SelectItem value="socializing">Socializing</SelectItem>
                      <SelectItem value="training">Training Partners</SelectItem>
                      <SelectItem value="breeding">Breeding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Max Distance (miles)</Label>
                  <Select value={maxDistance} onValueChange={setMaxDistance}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 miles</SelectItem>
                      <SelectItem value="10">10 miles</SelectItem>
                      <SelectItem value="25">25 miles</SelectItem>
                      <SelectItem value="50">50 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleComplete} 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Setting up...' : 'Complete Setup'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;