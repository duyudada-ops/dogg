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
    <div className="flex flex-col h-screen bg-gradient-warm relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 text-primary/3 text-8xl animate-float">💬</div>
        <div className="absolute bottom-40 left-12 text-secondary/3 text-6xl animate-wiggle">💕</div>
        <div className="absolute top-1/2 right-1/3 text-accent/3 text-7xl animate-heart-beat">✨</div>
      </div>
      
      {/* Premium Chat Header */}
      <div className="relative glass-morphism border-b border-white/20 p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544568100-847a948585b9?w=56&h=56&fit=crop&crop=face"
                alt="Chat partner"
                className="w-14 h-14 rounded-full border-4 border-white/30 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-glow-pulse"></div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Sarah & Max</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm text-green-600 font-medium">Online now • Active</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button size="icon" variant="outline" className="rounded-full glass-morphism border-white/30 hover:scale-110 transition-all">
              <Phone className="w-5 h-5 text-primary" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full glass-morphism border-white/30 hover:scale-110 transition-all">
              <Video className="w-5 h-5 text-secondary" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full glass-morphism border-white/30 hover:scale-110 transition-all">
              <MoreVertical className="w-5 h-5 text-accent" />
            </Button>
          </div>
        </div>
      </div>

      {/* Premium Messages Area */}
      <div className="relative flex-1 overflow-y-auto p-6 space-y-6 pb-24">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} group`}
          >
            <div className={`flex items-end gap-3 max-w-sm ${message.sender === 'me' ? 'flex-row-reverse' : 'flex-row'}`}>
              {message.sender === 'other' && message.avatar && (
                <img
                  src={message.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border-2 border-white/30 shadow-lg group-hover:scale-110 transition-transform"
                />
              )}
              <div
                className={`px-6 py-4 rounded-3xl shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-105 ${
                  message.sender === 'me'
                    ? 'bg-gradient-primary text-white rounded-br-lg shadow-primary/20'
                    : 'glass-morphism text-foreground rounded-bl-lg border border-white/20'
                }`}
              >
                <p className="text-base leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'me' ? 'text-white/70' : 'text-muted-foreground'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start group">
            <div className="flex items-end gap-3 max-w-sm">
              <img
                src="https://images.unsplash.com/photo-1544568100-847a948585b9?w=40&h=40&fit=crop&crop=face"
                alt="Avatar"
                className="w-10 h-10 rounded-full border-2 border-white/30 shadow-lg group-hover:scale-110 transition-transform"
              />
              <div className="glass-morphism px-6 py-4 rounded-3xl rounded-bl-lg border border-white/20 shadow-lg">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Premium Message Input */}
      <div className="relative">
        <div className="glass-morphism border-t border-white/20 p-6">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <Button size="icon" variant="outline" className="rounded-full glass-morphism border-white/30 hover:scale-110 transition-all">
              <Image className="w-5 h-5 text-primary" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full glass-morphism border-white/30 hover:scale-110 transition-all">
              <Smile className="w-5 h-5 text-secondary" />
            </Button>
            <div className="flex-1">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message... 💕"
                className="rounded-full bg-white/50 backdrop-blur-sm border-white/30 text-lg py-4 px-6 focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="rounded-full bg-gradient-primary text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl px-6 py-4"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;