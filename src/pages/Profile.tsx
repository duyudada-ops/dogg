import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit, Camera, MapPin, Calendar, Heart, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DogProfileCreation } from '@/components/dog/DogProfileCreation';

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
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="space-y-6">
        {/* Dog Profiles */}
        {dogProfiles.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">No Dog Profiles Yet</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Create your first dog profile to start connecting with other dog owners!
              </p>
              <Button onClick={() => setShowCreateForm(true)} className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Create Dog Profile
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {dogProfiles.map((dog) => (
              <Card key={dog.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {dog.name}'s Profile
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <Avatar className="h-32 w-32">
                          <AvatarImage src={dog.photo_url || undefined} />
                          <AvatarFallback className="text-2xl">🐕</AvatarFallback>
                        </Avatar>
                        <Button 
                          size="sm" 
                          className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                      <Badge variant="secondary">Verified Profile</Badge>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold">{dog.name}</h2>
                        <p className="text-muted-foreground">
                          {dog.breed} • {dog.gender.charAt(0).toUpperCase() + dog.gender.slice(1)} • {dog.age} years old
                        </p>
                      </div>
                      
                      {dog.bio && (
                        <p className="text-sm">{dog.bio}</p>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {dog.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {dog.location}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Joined {new Date(dog.created_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          0 matches
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Add Another Dog Button */}
            <Card>
              <CardContent className="p-6 text-center">
                <Button onClick={() => setShowCreateForm(true)} variant="outline" className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Dog
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {/* Owner Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Owner Profile
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback>
                  {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">
                  {user?.user_metadata?.full_name || 'Dog Owner'}
                </h3>
                <p className="text-muted-foreground">{user?.email}</p>
                <p className="text-sm text-muted-foreground">Dog lover since 2020</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photo Gallery */}
        <Card>
          <CardHeader>
            <CardTitle>Photo Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Add Photos
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;