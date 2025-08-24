import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldX } from 'lucide-react';

export const ManualAccountConfirmation: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { isAdmin, loading: adminLoading, error: adminError } = useAdminAccess();

  const handleConfirmAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('confirm-user', {
        body: { email: email.trim() }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Success!",
        description: data.message || "User account has been confirmed successfully.",
      });
      setEmail('');
    } catch (error: any) {
      console.error('Manual confirmation error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to confirm user account. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (adminLoading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Checking permissions...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (adminError || !isAdmin) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <Alert variant="destructive">
            <ShieldX className="h-4 w-4" />
            <AlertDescription>
              {adminError ? `Error: ${adminError}` : "Access denied. Admin privileges required to use this feature."}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Manual Account Confirmation</CardTitle>
        <CardDescription>
          Instantly confirm user accounts to bypass email verification
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
            {loading ? "Confirming..." : "Confirm Account"}
          </Button>
        </form>
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Usage:</strong></p>
          <p className="mt-2">Enter the email address of the user account you want to confirm. This will instantly mark their email as verified so they can sign in.</p>
          
          <p className="mt-3"><strong>For the current issue:</strong></p>
          <p className="mt-1">Use email: <code className="bg-muted px-1 py-0.5 rounded text-xs">ogi.akamu.pap@gmail.com</code></p>
        </div>
      </CardContent>
    </Card>
  );
};