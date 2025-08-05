import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit, Camera, MapPin, Calendar, Heart } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="space-y-6">
        {/* Dog Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              My Dog's Profile
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
                    <AvatarImage src="/placeholder-dog.jpg" />
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
                  <h2 className="text-2xl font-bold">Buddy</h2>
                  <p className="text-muted-foreground">Golden Retriever • Male • 3 years old</p>
                </div>
                
                <p className="text-sm">
                  Friendly and energetic Golden Retriever who loves playing fetch and swimming. 
                  Great with kids and other dogs. Looking for playmates in the area!
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <Badge>Friendly</Badge>
                  <Badge>Energy: High</Badge>
                  <Badge>Good with kids</Badge>
                  <Badge>Loves water</Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    San Francisco, CA
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined March 2024
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    12 matches
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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