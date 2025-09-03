import React from 'react';
import { Newspaper, TrendingUp, Heart, Star, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ProfileSidebar = () => {
  const dogNews = [
    { 
      title: "New Dog Park Opens Downtown", 
      snippet: "Perfect for socialization and exercise with agility equipment and separate areas for small and large dogs.",
      time: "2 hours ago"
    },
    { 
      title: "Healthy Treats Recipe", 
      snippet: "3 simple ingredients for homemade peanut butter and oat treats your dog will love.",
      time: "5 hours ago"
    },
    { 
      title: "Summer Safety Tips", 
      snippet: "Keep your furry friend cool this season with these essential hot weather guidelines.",
      time: "1 day ago"
    }
  ];

  const trendingToys = [
    { name: "Interactive Puzzle Ball", price: "$24.99", rating: 4.8, image: "🧩" },
    { name: "Rope Tug Toy", price: "$12.99", rating: 4.6, image: "🪢" },
    { name: "Squeaky Duck", price: "$8.99", rating: 4.9, image: "🦆" }
  ];

  const careTips = [
    "Brush your dog's teeth 2-3 times per week to prevent dental issues!",
    "Regular grooming helps detect skin issues early and keeps your pup comfortable.",
    "Mental stimulation is just as important as physical exercise for a happy dog.",
    "Always have fresh water available, especially after meals and exercise."
  ];

  const [currentTip] = React.useState(
    careTips[Math.floor(Math.random() * careTips.length)]
  );

  return (
    <div className="space-y-6">
      {/* Dog News Widget */}
      <Card className="bg-background/80 backdrop-blur-sm border border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Newspaper className="w-5 h-5 text-blue-500" />
            Dog News
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {dogNews.map((news, index) => (
            <div key={index} className="border-l-2 border-blue-500 pl-4">
              <h4 className="font-medium text-foreground text-sm">{news.title}</h4>
              <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{news.snippet}</p>
              <p className="text-xs text-muted-foreground mt-1">{news.time}</p>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full">
            <ExternalLink className="w-4 h-4 mr-2" />
            View All News
          </Button>
        </CardContent>
      </Card>

      {/* Trending Toys Widget */}
      <Card className="bg-background/80 backdrop-blur-sm border border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-pink-500" />
            Trending Toys
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingToys.map((toy, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="text-2xl">{toy.image}</div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground text-sm">{toy.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-primary font-bold text-sm">{toy.price}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-muted-foreground">{toy.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full">
            <ExternalLink className="w-4 h-4 mr-2" />
            Shop More Toys
          </Button>
        </CardContent>
      </Card>

      {/* Daily Care Tip Widget */}
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="w-5 h-5 text-green-500" />
            Daily Care Tip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground text-sm leading-relaxed">{currentTip}</p>
          <Badge variant="secondary" className="mt-3">
            💡 Pro Tip
          </Badge>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card className="bg-background/80 backdrop-blur-sm border border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Your Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-primary">24</div>
              <div className="text-muted-foreground text-sm">Matches</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-secondary">8</div>
              <div className="text-muted-foreground text-sm">Events</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-muted-foreground text-sm">Profile Views</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-orange-600">92%</div>
              <div className="text-muted-foreground text-sm">Match Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSidebar;