import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, MessageCircle, Calendar, Heart, Users } from 'lucide-react';

interface NotificationPreferences {
  matches: boolean;
  messages: boolean;
  events: boolean;
  likes: boolean;
  reminders: boolean;
  marketing: boolean;
}

const NotificationSettings: React.FC = () => {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    matches: true,
    messages: true,
    events: true,
    likes: true,
    reminders: true,
    marketing: false
  });

  const updatePreference = (key: keyof NotificationPreferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    // Here you would save to backend/localStorage
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-red-500" />
              <div>
                <Label className="font-medium">New Matches</Label>
                <p className="text-sm text-muted-foreground">When your dog gets a new match</p>
              </div>
            </div>
            <Switch
              checked={preferences.matches}
              onCheckedChange={(value) => updatePreference('matches', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              <div>
                <Label className="font-medium">New Messages</Label>
                <p className="text-sm text-muted-foreground">When someone messages you</p>
              </div>
            </div>
            <Switch
              checked={preferences.messages}
              onCheckedChange={(value) => updatePreference('messages', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-green-500" />
              <div>
                <Label className="font-medium">Event Reminders</Label>
                <p className="text-sm text-muted-foreground">24h and 2h before events</p>
              </div>
            </div>
            <Switch
              checked={preferences.events}
              onCheckedChange={(value) => updatePreference('events', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <Label className="font-medium">Likes & Super Likes</Label>
                <p className="text-sm text-muted-foreground">When someone likes your dog</p>
              </div>
            </div>
            <Switch
              checked={preferences.likes}
              onCheckedChange={(value) => updatePreference('likes', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-orange-500" />
              <div>
                <Label className="font-medium">App Reminders</Label>
                <p className="text-sm text-muted-foreground">Daily streak and engagement reminders</p>
              </div>
            </div>
            <Switch
              checked={preferences.reminders}
              onCheckedChange={(value) => updatePreference('reminders', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 bg-gradient-to-r from-primary to-secondary rounded" />
              <div>
                <Label className="font-medium">Weekly Digest</Label>
                <p className="text-sm text-muted-foreground">Events near you and new dogs</p>
              </div>
            </div>
            <Switch
              checked={preferences.marketing}
              onCheckedChange={(value) => updatePreference('marketing', value)}
            />
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Important security and account notifications cannot be disabled.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;