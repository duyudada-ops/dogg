import { useNavigate } from 'react-router-dom';
import { startCheckout, STRIPE_MONTHLY_URL, STRIPE_ANNUAL_URL } from "@/lib/payments";
import { useEntitlements } from "@/hooks/useEntitlements";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Premium() {
  const navigate = useNavigate();
  const { isPremium, loading } = useEntitlements();

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Go Premium</h1>
        <p className="text-muted-foreground text-lg">
          Unlock unlimited matches, see who liked you, and get priority visibility
        </p>
      </div>

      {isPremium && (
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Badge variant="default">Premium Active</Badge>
              <span className="text-sm text-muted-foreground">
                You're already Premium! Enjoy unlimited features.
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="relative">
          <CardHeader>
            <CardTitle className="text-2xl">Monthly Premium</CardTitle>
            <CardDescription>Perfect for trying out premium features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold">$4.99<span className="text-lg text-muted-foreground">/month</span></div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                Unlimited likes and super likes
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                See who liked your dog
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                Profile boosts for more visibility
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                Advanced matching filters
              </li>
            </ul>
            <Button 
              className="w-full" 
              onClick={() => startCheckout(STRIPE_MONTHLY_URL, navigate)}
              disabled={isPremium}
            >
              {isPremium ? "Already Premium" : "Start Monthly"}
            </Button>
          </CardContent>
        </Card>

        <Card className="relative border-primary">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-primary text-primary-foreground">Best Value</Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">Annual Premium</CardTitle>
            <CardDescription>Save 33% with yearly billing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold">$39.99<span className="text-lg text-muted-foreground">/year</span></div>
            <div className="text-sm text-muted-foreground">
              <span className="line-through">$59.88</span> Save $19.89
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                Everything in Monthly
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                Priority customer support
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                Early access to new features
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                Best value guarantee
              </li>
            </ul>
            <Button 
              className="w-full" 
              variant="default"
              onClick={() => startCheckout(STRIPE_ANNUAL_URL, navigate)}
              disabled={isPremium}
            >
              {isPremium ? "Already Premium" : "Start Annual"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          You'll be redirected to Stripe to complete your secure checkout. Cancel anytime.
        </p>
      </div>
    </div>
  );
}