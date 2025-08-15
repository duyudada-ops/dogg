import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, MessageCircle, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';
import { toast } from 'sonner';

interface SimpleThread {
  id: string;
  participant_name: string;
  participant_avatar?: string;
  last_message?: string;
  last_message_time?: string;
  unread_count: number;
}

interface SimpleMessage {
  id: string;
  thread_id: string;
  sender_id: string;
  body: string;
  created_at: string;
}

const Messages = () => {
  const { user } = useAuth();
  const [threads, setThreads] = useState<SimpleThread[]>([]);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [messages, setMessages] = useState<SimpleMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now - will be replaced once migration is complete
    setThreads([
      {
        id: '1',
        participant_name: 'Sarah & Buddy',
        participant_avatar: '',
        last_message: 'Great playdate! Buddy loved it 🐕',
        last_message_time: '2024-01-15T10:30:00Z',
        unread_count: 1
      },
      {
        id: '2',
        participant_name: 'Mike & Rex',
        participant_avatar: '',
        last_message: 'See you at the park tomorrow?',
        last_message_time: '2024-01-14T15:45:00Z',
        unread_count: 0
      }
    ]);
    setLoading(false);
    trackEvent({ eventName: AnalyticsEvents.PAGE_VIEW, properties: { page: 'messages' } });
  }, []);

  useEffect(() => {
    if (selectedThread) {
      // Mock messages for selected thread
      setMessages([
        {
          id: '1',
          thread_id: selectedThread,
          sender_id: selectedThread === '1' ? 'other' : user?.id || '',
          body: 'Hi! I saw you liked my dog\'s profile. Want to arrange a playdate?',
          created_at: '2024-01-15T09:00:00Z'
        },
        {
          id: '2',
          thread_id: selectedThread,
          sender_id: user?.id || '',
          body: 'That sounds great! What time works for you?',
          created_at: '2024-01-15T09:15:00Z'
        }
      ]);
    }
  }, [selectedThread, user?.id]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedThread) return;

    try {
      const mockMessage: SimpleMessage = {
        id: Date.now().toString(),
        thread_id: selectedThread,
        sender_id: user?.id || '',
        body: newMessage,
        created_at: new Date().toISOString()
      };

      setMessages(prev => [...prev, mockMessage]);
      setNewMessage('');
      
      trackEvent({ 
        eventName: AnalyticsEvents.MESSAGE_SEND,
        properties: { thread_id: selectedThread } 
      });
      
      toast.success('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <h2 className="text-xl font-semibold">Loading messages...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
          {/* Threads List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Messages
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {threads.length === 0 ? (
                    <div className="text-center p-6">
                      <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No conversations yet</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Start matching with dogs to begin chatting!
                      </p>
                    </div>
                  ) : (
                    threads.map((thread) => (
                      <div
                        key={thread.id}
                        className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedThread === thread.id ? 'bg-muted' : ''
                        }`}
                        onClick={() => setSelectedThread(thread.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={thread.participant_avatar} />
                            <AvatarFallback>
                              {thread.participant_name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium truncate">
                                {thread.participant_name}
                              </h4>
                              {thread.unread_count > 0 && (
                                <Badge variant="default" className="ml-2">
                                  {thread.unread_count}
                                </Badge>
                              )}
                            </div>
                            {thread.last_message && (
                              <p className="text-sm text-muted-foreground truncate">
                                {thread.last_message}
                              </p>
                            )}
                            {thread.last_message_time && (
                              <p className="text-xs text-muted-foreground">
                                {new Date(thread.last_message_time).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Messages View */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              {selectedThread ? (
                <>
                  <CardHeader>
                    <CardTitle>
                      {threads.find(t => t.id === selectedThread)?.participant_name}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender_id === user?.id ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[70%] p-3 rounded-lg ${
                              message.sender_id === user?.id
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.body}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {new Date(message.created_at).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground">
                      Choose a thread from the left to start messaging
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;