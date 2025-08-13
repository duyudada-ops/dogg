import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Chat = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-4 pb-20">
      <div className="max-w-md mx-auto pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Chat feature coming soon!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;