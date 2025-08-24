import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const url = new URL(window.location.href);
      const hasCode = !!url.searchParams.get("code");
      const hash = new URLSearchParams((url.hash || "").replace(/^#/, ""));
      const access_token = hash.get("access_token");
      const refresh_token = hash.get("refresh_token");

      try {
        if (hasCode && typeof supabase.auth.exchangeCodeForSession === "function") {
          await supabase.auth.exchangeCodeForSession(window.location.href);
        } else if (access_token && refresh_token) {
          await supabase.auth.setSession({ access_token, refresh_token });
        }
      } finally {
        window.history.replaceState({}, document.title, "/auth/callback");
        const next = localStorage.getItem("postAuthRedirect") || "/discover";
        navigate(next, { replace: true });
      }
    })();
  }, [navigate]);

  return <div className="p-6 text-center">Signing you in…</div>;
}