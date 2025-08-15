import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';

interface MessageThread {
  id: string;
  other_user: {
    id: string;
    display_name: string;
    avatar_url?: string;
  };
  other_dog: {
    id: string;
    name: string;
    photo_url?: string;
  };
  last_message?: {
    body?: string;
    created_at: string;
    sender_id: string;
  };
  unread_count: number;
}

interface Message {
  id: string;
  thread_id: string;
  sender_id: string;
  body?: string;
  image_url?: string;
  created_at: string;
  read_at?: string;
}

const Messages = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { threadId } = useParams();
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (user) {
      fetchThreads();
      if (threadId) {
        fetchMessages(threadId);
      }
    }
    trackEvent({ eventName: AnalyticsEvents.PAGE_VIEW, properties: { page: 'messages' } });
  }, [user, threadId]);

  useEffect(() => {
    if (!selectedThread?.id) return;

    // Subscribe to realtime messages
    const channel = supabase
      .channel(`messages-${selectedThread.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `thread_id=eq.${selectedThread.id}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages(prev => [...prev, newMessage]);
          
          // Mark as read if not from current user
          if (newMessage.sender_id !== user?.id) {
            markAsRead(newMessage.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedThread?.id, user?.id]);

  const fetchThreads = async () => {
    if (!user) return;

    try {
      // Get matches that are mutual
      const { data: matches, error } = await supabase
        .from('matches')
        .select(`
          id,
          liker_user_id,
          liked_user_id,
          liker_dog_id,
          liked_dog_id,
          dog_profiles!matches_liker_dog_id_fkey(id, name, photo_url, user_id),
          dog_profiles_liked:dog_profiles!matches_liked_dog_id_fkey(id, name, photo_url, user_id),
          profiles!matches_liker_user_id_fkey(user_id, display_name, avatar_url),
          profiles_liked:profiles!matches_liked_user_id_fkey(user_id, display_name, avatar_url)
        `)
        .eq('status', 'mutual')
        .or(`liker_user_id.eq.${user.id},liked_user_id.eq.${user.id}`);

      if (error) throw error;

      // Convert matches to threads
      const threadList: MessageThread[] = matches?.map(match => {
        const isLiker = match.liker_user_id === user.id;
        const otherUser = isLiker ? match.profiles_liked : match.profiles;
        const otherDog = isLiker ? match.dog_profiles_liked : match.dog_profiles;

        return {
          id: match.id,
          other_user: {
            id: otherUser.user_id,
            display_name: otherUser.display_name || 'Unknown User',
            avatar_url: otherUser.avatar_url,
          },
          other_dog: {
            id: otherDog.id,
            name: otherDog.name,
            photo_url: otherDog.photo_url,
          },
          unread_count: 0, // TODO: Calculate unread count
        };
      }) || [];

      setThreads(threadList);
    } catch (error) {
      console.error('Error fetching threads:', error);
      toast.error('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (threadId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
      
      // Find the thread
      const thread = threads.find(t => t.id === threadId);
      if (thread) {
        setSelectedThread(thread);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    }
  };

  const sendMessage = async () => {
    if (!user || !selectedThread || !newMessage.trim()) return;

    setSending(true);
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          thread_id: selectedThread.id,
          sender_id: user.id,
          body: newMessage.trim(),
        });

      if (error) throw error;

      setNewMessage('');
      trackEvent({ 
        eventName: AnalyticsEvents.MESSAGE_SEND,
        properties: { thread_id: selectedThread.id } 
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .eq('id', messageId);
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <h2 className="text-xl font-semibold">Loading conversations...</h2>
        </div>
      </div>
    );
  }

  // Mobile view when thread is selected
  if (selectedThread && window.innerWidth < 768) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="bg-white border-b p-4 flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setSelectedThread(null);
              navigate('/messages');
            }}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={selectedThread.other_dog.photo_url} />
            <AvatarFallback>{selectedThread.other_dog.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{selectedThread.other_dog.name}</h3>
            <p className="text-sm text-muted-foreground">
              with {selectedThread.other_user.display_name}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                  message.sender_id === user?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.body && <p>{message.body}</p>}
                {message.image_url && (
                  <img
                    src={message.image_url}
                    alt="Shared image"
                    className="max-w-full rounded mt-2"
                  />
                )}
                <p className="text-xs opacity-70 mt-1">
                  {formatTime(message.created_at)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button onClick={sendMessage} disabled={sending || !newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="grid lg:grid-cols-3 gap-6 h-[80vh]">
          {/* Threads List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {threads.length === 0 ? (
                  <div className="text-center p-8">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2">No conversations yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Start swiping to find matches and begin chatting!
                    </p>
                    <Button
                      className="mt-4"
                      onClick={() => navigate('/swipe')}
                    >
                      Find Matches
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y">
                    {threads.map((thread) => (
                      <div
                        key={thread.id}
                        className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedThread?.id === thread.id ? 'bg-muted' : ''
                        }`}
                        onClick={() => {
                          setSelectedThread(thread);
                          fetchMessages(thread.id);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={thread.other_dog.photo_url} />
                            <AvatarFallback>{thread.other_dog.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold truncate">
                                {thread.other_dog.name}
                              </h4>
                              {thread.unread_count > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {thread.unread_count}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              with {thread.other_user.display_name}
                            </p>
                            {thread.last_message && (
                              <p className="text-xs text-muted-foreground truncate">
                                {thread.last_message.body}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {selectedThread ? (
              <Card className="h-full flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedThread.other_dog.photo_url} />
                      <AvatarFallback>{selectedThread.other_dog.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{selectedThread.other_dog.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        with {selectedThread.other_user.display_name}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                          message.sender_id === user?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        {message.body && <p>{message.body}</p>}
                        {message.image_url && (
                          <img
                            src={message.image_url}
                            alt="Shared image"
                            className="max-w-full rounded mt-2"
                          />
                        )}
                        <p className="text-xs opacity-70 mt-1">
                          {formatTime(message.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>

                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button onClick={sendMessage} disabled={sending || !newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">
                    Choose a conversation from the list to start chatting
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;