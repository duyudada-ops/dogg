import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CALLBACK_URL } from '@/lib/constants';

interface LoginFormProps {
  onToggleForm: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  
  // Store next parameter for post-auth redirect
  React.useEffect(() => {
    const next = searchParams.get('next');
    if (next) {
      localStorage.setItem("postAuthRedirect", next);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);
    
    if (error) {
      if (error.message?.includes('Email not confirmed')) {
        setShowResendButton(true);
        toast({
          title: "Email Not Confirmed",
          description: "Please check your email and click the confirmation link, or resend a new confirmation email.",
          variant: "destructive",
        });
        // Store email for potential resend
        localStorage.setItem('unconfirmed_email', email);
      } else {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
    }
    
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    
    const { error } = await signInWithGoogle();
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
    
    setGoogleLoading(false);
  };

  const handleResendConfirmation = async () => {
    setIsResending(true);
    try {
      const emailToResend = localStorage.getItem('unconfirmed_email') || email;
      if (emailToResend) {
        await supabase.auth.resend({ 
          type: 'signup', 
          email: emailToResend,
          options: {
            emailRedirectTo: CALLBACK_URL
          }
        });
        toast({
          title: "Confirmation Email Sent!",
          description: "Please check your email for a new confirmation link.",
        });
        setShowResendButton(false);
      }
    } catch (e) {
      console.error('Resend error:', e);
      toast({
        title: "Error",
        description: "Failed to resend confirmation email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Sign in to connect with fellow dog owners</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        
        {showResendButton && (
          <div className="mt-4">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleResendConfirmation}
              disabled={isResending}
            >
              {isResending ? "Sending..." : "Resend Confirmation Email"}
            </Button>
          </div>
        )}
        
        <div className="mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4" 
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
          >
            {googleLoading ? "Signing in..." : "Sign in with Google"}
          </Button>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={onToggleForm}
            className="text-sm text-teal-600 hover:text-teal-700"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </CardContent>
    </Card>
  );
};