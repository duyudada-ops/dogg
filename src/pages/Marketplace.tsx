import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, DollarSign, Package, Star, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { MarketplaceItem } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';
import { useEntitlements } from '@/lib/entitlements';
import { createCheckoutSession } from '@/lib/billing';
import { toast } from 'sonner';

const Marketplace = () => {
  const { user } = useAuth();
  const { isPaid } = useEntitlements();
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    price_cents: 0,
    images: [] as string[],
  });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchItems();
    trackEvent({ eventName: AnalyticsEvents.PAGE_VIEW, properties: { page: 'marketplace' } });
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('marketplace_items')
        .select(`
          *,
          profiles!marketplace_items_seller_id_fkey(user_id, display_name, avatar_url)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error('Failed to load marketplace items');
    } finally {
      setLoading(false);
    }
  };

  const createItem = async () => {
    if (!user || !newItem.title || newItem.price_cents <= 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setCreating(true);
    try {
      const { error } = await supabase
        .from('marketplace_items')
        .insert({
          seller_id: user.id,
          title: newItem.title,
          description: newItem.description,
          price_cents: Math.round(newItem.price_cents * 100), // Convert to cents
          images: newItem.images,
        });

      if (error) throw error;

      toast.success('Item listed successfully!');
      setCreateModalOpen(false);
      setNewItem({ title: '', description: '', price_cents: 0, images: [] });
      await fetchItems();

      trackEvent({ 
        eventName: AnalyticsEvents.ITEM_LIST,
        properties: { title: newItem.title, price: newItem.price_cents } 
      });
    } catch (error) {
      console.error('Error creating item:', error);
      toast.error('Failed to create listing');
    } finally {
      setCreating(false);
    }
  };

  const handlePurchase = async (item: MarketplaceItem) => {
    if (!user) {
      toast.error('Please sign in to purchase');
      return;
    }

    try {
      // Create one-time payment for marketplace item
      window.open(`https://buy.stripe.com/test_placeholder`, '_blank');

      if (url) {
        window.open(url, '_blank');
        trackEvent({ 
          eventName: AnalyticsEvents.CHECKOUT_START,
          properties: { item_id: item.id, amount: item.price_cents } 
        });
      }
    } catch (error) {
      console.error('Error starting purchase:', error);
      toast.error('Failed to start purchase');
    }
  };

  const formatPrice = (cents: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(cents / 100);
  };

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Package className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <h2 className="text-xl font-semibold">Loading marketplace...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold font-heading">Dog Marketplace</h1>
            <p className="text-muted-foreground">
              Buy and sell dog supplies, toys, and accessories
            </p>
          </div>
          
          <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                List Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Listing</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title *</label>
                  <Input
                    value={newItem.title}
                    onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="What are you selling?"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={newItem.description}
                    onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your item..."
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Price (USD) *</label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={newItem.price_cents}
                    onChange={(e) => setNewItem(prev => ({ ...prev, price_cents: parseFloat(e.target.value) || 0 }))}
                    placeholder="0.00"
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createItem} disabled={creating}>
                    {creating ? 'Creating...' : 'List Item'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="text-center p-12">
              <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'Try adjusting your search' : 'Be the first to list an item!'}
              </p>
              {!searchTerm && (
                <Button onClick={() => setCreateModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  List First Item
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted rounded-t-lg overflow-hidden">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                      {isPaid && item.seller_id === user?.id && (
                        <Badge variant="secondary">
                          <Star className="h-3 w-3 mr-1" />
                          Pro
                        </Badge>
                      )}
                    </div>
                    
                    {item.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-lg font-bold">
                        <DollarSign className="h-4 w-4" />
                        {formatPrice(item.price_cents, item.currency)}
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        by {(item as any).profiles?.display_name || 'Unknown'}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {item.seller_id !== user?.id ? (
                        <>
                          <Button 
                            className="flex-1" 
                            onClick={() => handlePurchase(item)}
                          >
                            Buy Now
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Badge variant="outline" className="w-full justify-center">
                          Your Listing
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;