import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const PremiumSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Refresh subscription status after successful payment
    const refreshSubscription = async () => {
      try {
        await supabase.functions.invoke('check-subscription');
      } catch (error) {
        console.error('Error refreshing subscription:', error);
      }
    };
    
    refreshSubscription();
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Welcome to Premium!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your payment was successful. You now have access to all premium features!
          </p>
          <div className="space-y-2">
            <Button 
              onClick={() => navigate('/settings')} 
              className="w-full"
            >
              Manage Subscription
            </Button>
            <Button 
              onClick={() => navigate('/')} 
              variant="outline" 
              className="w-full"
            >
              Continue to App
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumSuccess;