import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { SafeImage } from '@/components/SafeImage';

const toyItems = [
  {
    id: 1,
    name: "Interactive Puzzle Ball",
    category: "Interactive",
    rating: 4.8,
    price: "$19.99",
    imageUrl: "/src/assets/dog-clean-12.jpg",
    description: "Keeps dogs mentally stimulated",
    popular: true,
  },
  {
    id: 2,
    name: "Rope Tug Toy",
    category: "Tug",
    rating: 4.6,
    price: "$12.99",
    imageUrl: "/src/assets/dog-clean-4.jpg",
    description: "Perfect for interactive play",
    popular: false,
  },
  {
    id: 3,
    name: "Squeaky Duck",
    category: "Squeaker",
    rating: 4.7,
    price: "$8.99",
    imageUrl: "/src/assets/dog-clean-17.jpg",
    description: "Classic squeaky fun",
    popular: true,
  },
  {
    id: 4,
    name: "Chew Bone",
    category: "Chew",
    rating: 4.9,
    price: "$15.99",
    imageUrl: "/src/assets/dog-clean-23.jpg",
    description: "Long-lasting dental health",
    popular: false,
  },
  {
    id: 5,
    name: "Frisbee Disc",
    category: "Fetch",
    rating: 4.5,
    price: "$14.99",
    imageUrl: "/src/assets/dog-replacement-4.jpg",
    description: "Perfect for outdoor play",
    popular: true,
  },
];

export function ToyGallery() {
  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          🎾 Popular Dog Toys
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full">
          <CarouselContent>
            {toyItems.map((toy) => (
              <CarouselItem key={toy.id} className="basis-full">
                <div className="border border-border rounded-lg p-3 space-y-3">
                  <div className="relative">
                    <div className="w-full h-32 rounded-lg overflow-hidden">
                      <SafeImage
                        src={toy.imageUrl}
                        alt={toy.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {toy.popular && (
                      <Badge className="absolute top-2 right-2 text-xs bg-primary">
                        Popular
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm">{toy.name}</h4>
                      <span className="text-sm font-bold text-primary">{toy.price}</span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">{toy.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">{toy.rating}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {toy.category}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 text-xs h-8">
                        <Heart className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" className="flex-1 text-xs h-8">
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Shop
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
        
        <div className="pt-3 border-t border-border mt-3">
          <button className="text-sm text-primary hover:text-primary/80 font-medium">
            Browse all toys →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}