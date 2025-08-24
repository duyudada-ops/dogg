import { useEffect } from "react";
import { useEntitlements } from "@/hooks/useEntitlements";
import { useNavigate } from "react-router-dom";

export default function BillingThankYou() {
  const { refresh } = useEntitlements();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(async () => {
      await refresh();           // pulls latest from 'subscribers'
      navigate("/discover");     // or wherever
    }, 1500);
    return () => clearTimeout(t);
  }, [refresh, navigate]);

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">Thanks!</h1>
      <p className="mt-2 text-neutral-600">
        Activating your Premium features…
      </p>
    </div>
  );
}