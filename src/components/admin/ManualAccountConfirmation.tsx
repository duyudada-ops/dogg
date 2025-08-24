import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const ManualAccountConfirmation: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleConfirmAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      toast({
        title: "Manual Confirmation Instructions",
        description: "Go to your Supabase dashboard → Authentication → Users, find the user, and click 'Confirm User'.",
      });
    } catch (e) {
      console.error('Manual confirmation error:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Manual Account Confirmation</CardTitle>
        <CardDescription>
          Manually confirm user accounts for testing purposes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleConfirmAccount} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">User Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            Show Instructions
          </Button>
        </form>
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Manual Confirmation Steps:</strong></p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Go to your Supabase Dashboard</li>
            <li>Navigate to Authentication → Users</li>
            <li>Find the user by email</li>
            <li>Click the three dots menu</li>
            <li>Select "Confirm User"</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};