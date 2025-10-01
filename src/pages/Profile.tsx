import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit, Camera, MapPin, Calendar, Heart, Plus, User, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DogProfileCreation } from '@/components/dog/DogProfileCreation';
import { PhotoGallery } from '@/components/gallery/PhotoGallery';
import { SafeImage } from '@/components/SafeImage';

interface DogProfile {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  bio?: string;
  location?: string;
  photo_url?: string;
  created_at: string;
}

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [dogProfiles, setDogProfiles] = useState<DogProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    if (user) {
      fetchDogProfiles();
    }
  }, [user]);

  const fetchDogProfiles = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('dog_profiles')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching dog profiles:', error);
        toast({
          title: "Error",
          description: "Failed to load dog profiles",
          variant: "destructive",
        });
        return;
      }

      setDogProfiles(data || []);
    } catch (error) {
      console.error('Error fetching dog profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateComplete = () => {
    setShowCreateForm(false);
    fetchDogProfiles(); // Refresh the profiles
  };

  if (showCreateForm) {
    return <DogProfileCreation onComplete={handleCreateComplete} />;
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6 max-w-4xl">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-32 w-32 bg-muted rounded-full mx-auto"></div>
                <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm relative overflow-hidden pb-20">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 right-10 text-primary/5 text-8xl animate-float">🐾</div>
        <div className="absolute bottom-40 left-12 text-secondary/5 text-6xl animate-wiggle">⭐</div>
        <div className="absolute top-1/3 right-1/4 text-accent/5 text-7xl animate-heart-beat">🎯</div>
      </div>
      
      <div className="relative container mx-auto py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Premium Profile Header */}
          <div className="text-center glass-morphism p-8 rounded-3xl border border-white/20 mb-8">
            <div className="mb-4">
              <Badge className="bg-gradient-primary text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                <User className="w-4 h-4 mr-2" />
                Your Premium Profile
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Profile Dashboard
            </h1>
            <p className="text-xl text-muted-foreground font-body">Manage your furry friends and connect with the pack! 🐕‍🦺</p>
          </div>

          {/* Dog Profiles */}
          {dogProfiles.length === 0 ? (
            <Card className="glass-morphism border-0 shadow-2xl">
              <CardHeader className="text-center pb-4">
                <div className="mb-6">
                  <div className="text-8xl mb-4 animate-bounce">🐕</div>
                  <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    Ready to Get Started?
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-center space-y-6 pb-8">
                <p className="text-xl text-muted-foreground leading-relaxed max-w-md mx-auto">
                  Create your first dog profile and start building amazing friendships in your community! 🎾
                </p>
                <Button 
                  onClick={() => setShowCreateForm(true)} 
                  className="bg-gradient-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Plus className="h-5 w-5 mr-3" />
                  Create Your First Profile
                  <ArrowRight className="h-5 w-5 ml-3" />
                </Button>
              </CardContent>
            </Card>
          ) : (
          <>
            {dogProfiles.map((dog) => (
              <Card key={dog.id} className="glass-morphism border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between text-2xl">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl animate-wiggle">{dog.gender === 'male' ? '🐕' : '🐕‍🦺'}</div>
                      <span className="bg-gradient-primary bg-clip-text text-transparent font-bold">
                        {dog.name}'s Profile
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 hover:scale-105 transition-all">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex flex-col items-center space-y-4 lg:w-1/3">
                      <div className="relative group">
                        <Avatar className="h-40 w-40 ring-4 ring-gradient-primary group-hover:ring-offset-4 transition-all duration-300">
                          <SafeImage 
                            src={dog.photo_url || ''} 
                            alt={`${dog.name} - ${dog.breed}`}
                            className="object-cover rounded-full"
                          />
                          <AvatarFallback className="text-4xl bg-gradient-primary text-white">🐕</AvatarFallback>
                        </Avatar>
                        <Button 
                          size="sm" 
                          className="absolute -bottom-2 -right-2 rounded-full h-10 w-10 p-0 bg-gradient-secondary text-white hover:scale-110 transition-all shadow-lg"
                        >
                          <Camera className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Verified Profile
                        </Badge>
                        <Badge className="bg-gradient-warm text-white px-4 py-2">
                          <Star className="w-4 h-4 mr-2" />
                          Premium Member
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-6">
                      <div className="space-y-3">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {dog.name}
                        </h2>
                        <div className="flex flex-wrap gap-3">
                          <Badge variant="outline" className="text-lg px-4 py-2 bg-primary/10 text-primary border-primary/20">
                            {dog.breed}
                          </Badge>
                          <Badge variant="outline" className="text-lg px-4 py-2 bg-secondary/10 text-secondary border-secondary/20">
                            {dog.gender.charAt(0).toUpperCase() + dog.gender.slice(1)}
                          </Badge>
                          <Badge variant="outline" className="text-lg px-4 py-2 bg-accent/10 text-accent border-accent/20">
                            {dog.age} years old
                          </Badge>
                        </div>
                      </div>
                      
                      {dog.bio && (
                        <div className="p-4 bg-muted/50 rounded-xl border border-muted/20">
                          <p className="text-base leading-relaxed italic">"{dog.bio}"</p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {dog.location && (
                          <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                            <MapPin className="h-5 w-5 text-primary" />
                            <span className="font-medium text-sm">{dog.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 p-3 bg-secondary/5 rounded-lg">
                          <Calendar className="h-5 w-5 text-secondary" />
                          <span className="font-medium text-sm">Joined {new Date(dog.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-accent/5 rounded-lg">
                          <Heart className="h-5 w-5 text-accent" />
                          <span className="font-medium text-sm">0 matches</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Add Another Dog Button */}
            <Card className="glass-morphism border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="mb-4">
                  <div className="text-6xl mb-4 animate-bounce">➕</div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Add Another Furry Friend</h3>
                <p className="text-muted-foreground mb-6">Expand your pack and double the fun!</p>
                <Button 
                  onClick={() => setShowCreateForm(true)} 
                  className="bg-gradient-secondary text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <Plus className="h-5 w-5 mr-3" />
                  Add Another Dog
                  <ArrowRight className="h-5 w-5 ml-3" />
                </Button>
              </CardContent>
            </Card>
          </>
          )}

          {/* Owner Profile Card */}  
          <Card className="glass-morphism border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-2xl">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">👤</div>
                  <span className="bg-gradient-secondary bg-clip-text text-transparent font-bold">
                    Owner Profile
                  </span>
                </div>
                <Button variant="outline" size="sm" className="bg-gradient-to-r from-secondary/10 to-accent/10 border-secondary/20 hover:scale-105 transition-all">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 ring-4 ring-gradient-secondary group-hover:ring-offset-4 transition-all duration-300">
                    <AvatarImage src={user?.user_metadata?.avatar_url} className="object-cover" />
                    <AvatarFallback className="text-2xl bg-gradient-secondary text-white">
                      {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                    {user?.user_metadata?.full_name || 'Dog Owner'}
                  </h3>
                  <p className="text-muted-foreground text-lg">{user?.email}</p>  
                  <div className="flex gap-3">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                      <Calendar className="w-4 h-4 mr-2" />
                      Dog lover since 2020
                    </Badge>
                    <Badge className="bg-gradient-warm text-white">
                      <Star className="w-4 h-4 mr-2" />
                      Premium Member
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo Gallery */}
          <Card className="glass-morphism border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="text-3xl">📸</div>
                <span className="bg-gradient-warm bg-clip-text text-transparent font-bold">
                  Photo Gallery
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PhotoGallery />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;