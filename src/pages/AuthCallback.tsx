import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    const handleAuthCallback = async () => {
      const url = new URL(window.location.href);
      console.log('Auth callback processing URL:', url.href);

      // Case A: Auth code in the query (OAuth/email code flow)
      const hasCode = !!url.searchParams.get("code");

      // Case B: Tokens in the hash (email confirmation / recovery)
      const hash = url.hash || "";
      const hashParams = new URLSearchParams(hash.replace(/^#/, ""));
      const access_token = hashParams.get("access_token");
      const refresh_token = hashParams.get("refresh_token");
      const error_code = hashParams.get("error_code");
      const error_description = hashParams.get("error_description");

      // Case C: Check for email confirmation type
      const type = hashParams.get("type");
      console.log('Auth callback details:', { hasCode, access_token: !!access_token, refresh_token: !!refresh_token, type, error_code });

      // Handle errors from email confirmation
      if (error_code) {
        console.error('Auth callback error from URL:', { error_code, error_description });
        if (mounted) {
          if (error_code === 'email_not_confirmed') {
            setError('Your email has not been confirmed yet. Please check your email and click the confirmation link.');
          } else if (error_code === 'expired_token') {
            setError('Your confirmation link has expired. Please request a new confirmation email.');
          } else {
            setError(error_description || 'Authentication failed. Please try again.');
          }
        }
        return;
      }

      try {
        let sessionResult = null;

        if (hasCode && typeof supabase.auth.exchangeCodeForSession === "function") {
          console.log('Processing auth code exchange...');
          sessionResult = await supabase.auth.exchangeCodeForSession(window.location.href);
          console.log('Auth code exchange result:', { error: sessionResult.error, hasSession: !!sessionResult.data.session });
        } else if (access_token && refresh_token) {
          console.log('Processing token-based session...');
          sessionResult = await supabase.auth.setSession({ access_token, refresh_token });
          console.log('Token session result:', { error: sessionResult.error, hasSession: !!sessionResult.data.session });
        }

        // Check for session errors
        if (sessionResult?.error) {
          console.error('Session creation error:', sessionResult.error);
          if (mounted) {
            if (sessionResult.error.message?.includes('expired')) {
              setError('Your confirmation link has expired. Please request a new confirmation email.');
            } else if (sessionResult.error.message?.includes('invalid')) {
              setError('Invalid confirmation link. Please try requesting a new confirmation email.');
            } else {
              setError(`Authentication failed: ${sessionResult.error.message}`);
            }
          }
          return;
        }

        // Set a flag to prevent redirect loops
        localStorage.setItem("authCallbackProcessed", "true");
        
        // Clean the URL so tokens aren't left in history
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Wait for auth state to settle
        let retries = 0;
        const maxRetries = 10;
        
        while (retries < maxRetries && mounted) {
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) {
            console.error('Error getting session:', sessionError);
            if (mounted) {
              setError('Failed to establish session. Please try logging in again.');
            }
            return;
          }
          
          if (session?.user) {
            console.log('User authenticated successfully:', session.user.email);
            
            // Check if user has completed onboarding by looking for a dog profile
            const { data: profiles, error: profileError } = await supabase
              .from('dog_profiles')
              .select('id')
              .eq('user_id', session.user.id)
              .limit(1);
              
            if (profileError) {
              console.error('Error checking dog profiles:', profileError);
            }
              
            const next = profiles && profiles.length > 0 ? "/discover" : "/onboarding";
            console.log('Redirecting to:', next);
            navigate(next, { replace: true });
            return;
          }
          
          console.log(`Waiting for session... retry ${retries + 1}/${maxRetries}`);
          retries++;
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // If we get here, something went wrong
        console.warn('Session not established after retries');
        if (mounted) {
          navigate("/", { replace: true });
        }
        
      } catch (e) {
        console.error("Auth callback error:", e);
        if (mounted) {
          const errorMessage = e instanceof Error ? e.message : 'Authentication failed';
          if (errorMessage.includes('expired') || errorMessage.includes('invalid') || errorMessage.includes('token')) {
            setError('Your email confirmation link has expired or is invalid. Please try signing up again or request a new confirmation email.');
          } else if (errorMessage.includes('email_not_confirmed')) {
            setError('Your email has not been confirmed yet. Please check your email and click the confirmation link.');
          } else {
            setError(`Authentication failed: ${errorMessage}`);
          }
        }
      }
    };

    handleAuthCallback();
    
    return () => {
      mounted = false;
    };
  }, [navigate]);

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      const email = localStorage.getItem('signup_email');
      if (email) {
        await supabase.auth.resend({ 
          type: 'signup', 
          email: email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });
        toast({
          title: "Email sent!",
          description: "Please check your email for a new confirmation link.",
        });
      }
    } catch (e) {
      console.error('Resend error:', e);
      toast({
        title: "Error",
        description: "Failed to resend email. Please try signing up again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-destructive text-2xl">⚠️</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Authentication Error</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
          </div>
          <div className="space-y-3">
            <Button 
              onClick={handleResendEmail} 
              disabled={isResending}
              className="w-full"
            >
              {isResending ? "Sending..." : "Resend Confirmation Email"}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/auth?signup=true")}
              className="w-full"
            >
              Try Signing Up Again
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="w-full"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Signing you in…</p>
      </div>
    </div>
  );
}