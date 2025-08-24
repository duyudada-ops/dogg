import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const url = new URL(window.location.href);
      const hasCode = !!url.searchParams.get("code");
      const hash = new URLSearchParams((url.hash || "").replace(/^#/, ""));
      const access_token = hash.get("access_token");
      const refresh_token = hash.get("refresh_token");
      const error_description = url.searchParams.get("error_description");

      console.log("AuthCallback Debug:", {
        hasCode,
        access_token: !!access_token,
        refresh_token: !!refresh_token,
        error_description,
        fullUrl: window.location.href
      });

      try {
        if (error_description) {
          console.error("Auth callback error:", error_description);
          setError(error_description);
          toast({
            title: "Authentication Error",
            description: error_description,
            variant: "destructive",
          });
          setTimeout(() => navigate("/", { replace: true }), 3000);
          return;
        }

        if (hasCode && typeof supabase.auth.exchangeCodeForSession === "function") {
          console.log("Exchanging code for session...");
          const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);
          if (error) {
            console.error("Exchange code error:", error);
            setError(error.message);
            toast({
              title: "Authentication Error",
              description: error.message,
              variant: "destructive",
            });
            return;
          }
          console.log("Code exchange successful:", !!data.session);
        } else if (access_token && refresh_token) {
          console.log("Setting session with tokens...");
          const { error } = await supabase.auth.setSession({ access_token, refresh_token });
          if (error) {
            console.error("Set session error:", error);
            setError(error.message);
            toast({
              title: "Authentication Error", 
              description: error.message,
              variant: "destructive",
            });
            return;
          }
          console.log("Session set successfully");
        }

        toast({
          title: "Welcome!",
          description: "You have been successfully signed in.",
        });
      } catch (err: any) {
        console.error("AuthCallback unexpected error:", err);
        setError(err.message || "An unexpected error occurred");
        toast({
          title: "Authentication Error",
          description: err.message || "An unexpected error occurred",
          variant: "destructive",
        });
      } finally {
        window.history.replaceState({}, document.title, "/auth/callback");
        const next = localStorage.getItem("postAuthRedirect") || "/discover";
        setTimeout(() => navigate(next, { replace: true }), error ? 3000 : 1000);
      }
    })();
  }, [navigate, toast]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-destructive">Authentication Error</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <p className="text-sm text-muted-foreground">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Signing you in…</p>
      </div>
    </div>
  );
}