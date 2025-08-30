import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink } from 'lucide-react';
import { SafeImage } from '@/components/SafeImage';

const dogNews = [
  {
    id: 1,
    title: "Summer Safety Tips for Dogs",
    excerpt: "Keep your furry friend cool and hydrated during hot weather",
    category: "Health",
    readTime: "3 min read",
    publishedAt: "2 days ago",
    imageUrl: "/src/assets/dog-clean-1.jpg",
    url: "#",
  },
  {
    id: 2,
    title: "Best Dog Parks Near You",
    excerpt: "Top-rated parks where your dog can socialize and play",
    category: "Lifestyle",
    readTime: "5 min read",
    publishedAt: "1 week ago",
    imageUrl: "/src/assets/dog-clean-12.jpg",
    url: "#",
  },
  {
    id: 3,
    title: "Training Tips for Puppies",
    excerpt: "Essential commands every puppy should learn",
    category: "Training",
    readTime: "4 min read",
    publishedAt: "2 weeks ago",
    imageUrl: "/src/assets/dog-clean-7.jpg",
    url: "#",
  },
  {
    id: 4,
    title: "Healthy Dog Treats to Make at Home",
    excerpt: "Simple recipes your dog will love",
    category: "Nutrition",
    readTime: "6 min read",
    publishedAt: "3 weeks ago",
    imageUrl: "/src/assets/dog-clean-18.jpg",
    url: "#",
  },
];

export function DogNewsWidget() {
  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          🐾 Dog News & Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {dogNews.map((article) => (
          <div
            key={article.id}
            className="group cursor-pointer border border-border rounded-lg p-3 hover:shadow-md transition-all duration-200 hover:border-primary/30"
          >
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <SafeImage
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                  <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {article.publishedAt}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t border-border">
          <button className="text-sm text-primary hover:text-primary/80 font-medium">
            View all articles →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}