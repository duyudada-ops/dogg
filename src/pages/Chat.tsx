import React, { useState, useEffect, useRef } from 'react';
import { Send, Image, Smile, Phone, Video, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: Date;
  avatar?: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! Buddy would love to meet Luna for a playdate! 🐕",
      sender: 'other',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      avatar: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '2',
      text: "That sounds amazing! Luna loves making new friends. When works for you?",
      sender: 'me',
      timestamp: new Date(Date.now() - 1000 * 60 * 3)
    },
    {
      id: '3',
      text: "How about this Saturday at Central Dog Park around 2 PM?",
      sender: 'other',
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      avatar: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=40&h=40&fit=crop&crop=face'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'me',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate other person typing and responding
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const responses = [
          "Perfect! See you there! 🎾",
          "Luna is so excited! 🐕❤️",
          "Great! I'll bring some treats to share 🦴",
          "Sounds like a plan! Looking forward to it 🌟"
        ];
        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: 'other',
          timestamp: new Date(),
          avatar: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=40&h=40&fit=crop&crop=face'
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }, 1000);
  };

  const formatTime = (timestamp: Date) => {
    return formatDistanceToNow(timestamp, { addSuffix: true });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Chat Header */}
      <div className="bg-background/80 backdrop-blur-sm border-b border-border/50 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1544568100-847a948585b9?w=48&h=48&fit=crop&crop=face"
              alt="Chat partner"
              className="w-12 h-12 rounded-full border-2 border-primary/20"
            />
            <div>
              <h2 className="font-bold text-foreground">Sarah & Max</h2>
              <p className="text-sm text-green-500">Online now</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" className="rounded-full">
              <Phone className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full">
              <Video className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end gap-2 max-w-xs ${message.sender === 'me' ? 'flex-row-reverse' : 'flex-row'}`}>
              {message.sender === 'other' && message.avatar && (
                <img
                  src={message.avatar}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div
                className={`px-4 py-2 rounded-2xl shadow-sm backdrop-blur-sm ${
                  message.sender === 'me'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-background/80 text-foreground rounded-bl-md border border-border/50'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end gap-2 max-w-xs">
              <img
                src="https://images.unsplash.com/photo-1544568100-847a948585b9?w=32&h=32&fit=crop&crop=face"
                alt="Avatar"
                className="w-8 h-8 rounded-full"
              />
              <div className="bg-background/80 backdrop-blur-sm px-4 py-2 rounded-2xl rounded-bl-md border border-border/50 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="fixed bottom-16 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border/50 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <Button size="icon" variant="outline" className="rounded-full">
            <Image className="w-5 h-5" />
          </Button>
          <Button size="icon" variant="outline" className="rounded-full">
            <Smile className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="rounded-full bg-background/50 backdrop-blur-sm border-border/50"
            />
          </div>
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="rounded-full bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;