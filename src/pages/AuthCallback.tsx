import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    
    const handleAuthCallback = async () => {
      const url = new URL(window.location.href);

      // Case A: Auth code in the query (OAuth/email code flow)
      const hasCode = !!url.searchParams.get("code");

      // Case B: Tokens in the hash (email confirmation / recovery)
      const hash = url.hash || "";
      const hashParams = new URLSearchParams(hash.replace(/^#/, ""));
      const access_token = hashParams.get("access_token");
      const refresh_token = hashParams.get("refresh_token");

      try {
        if (hasCode && typeof supabase.auth.exchangeCodeForSession === "function") {
          // Supabase v2: exchange the URL for a session (preferred when ?code= is present)
          await supabase.auth.exchangeCodeForSession(window.location.href);
        } else if (access_token && refresh_token) {
          // Fallback: set session directly from hash tokens (works for email confirmation links)
          await supabase.auth.setSession({ access_token, refresh_token });
        }

        // Set a flag to prevent redirect loops
        localStorage.setItem("authCallbackProcessed", "true");
        
        // Wait a moment for the AuthContext to process the session
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (!mounted) return;

        // Clean the URL so tokens aren't left in history
        window.history.replaceState({}, document.title, window.location.pathname);

        // Check if user needs onboarding or can go to discover
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // Check if user has completed onboarding by looking for a dog profile
          const { data: profiles } = await supabase
            .from('dog_profiles')
            .select('id')
            .eq('user_id', session.user.id)
            .limit(1);
            
          const next = profiles && profiles.length > 0 ? "/discover" : "/onboarding";
          navigate(next, { replace: true });
        } else {
          navigate("/", { replace: true });
        }
        
      } catch (e) {
        console.error("Auth callback error:", e);
        if (mounted) {
          navigate("/", { replace: true });
        }
      }
    };

    handleAuthCallback();
    
    return () => {
      mounted = false;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Signing you in…</p>
      </div>
    </div>
  );
}