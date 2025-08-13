import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  AlertTriangle, 
  FileText, 
  Download,
  TrendingUp,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface AdminStats {
  total_users: number;
  active_users_today: number;
  total_matches: number;
  total_revenue: number;
  pending_reports: number;
  pending_events: number;
}

const AdminPanel: React.FC = () => {
  const [stats, setStats] = useState<AdminStats>({
    total_users: 0,
    active_users_today: 0,
    total_matches: 0,
    total_revenue: 0,
    pending_reports: 0,
    pending_events: 0
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      setLoading(true);
      
      // Fetch basic stats from database
      const [usersResult, matchesResult] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact' }),
        supabase.from('matches').select('*', { count: 'exact' })
      ]);

      setStats({
        total_users: usersResult.count || 0,
        active_users_today: Math.floor((usersResult.count || 0) * 0.1), // Mock: 10% daily active
        total_matches: matchesResult.count || 0,
        total_revenue: 2450.50, // Mock revenue data
        pending_reports: 3, // Mock pending reports
        pending_events: 2 // Mock pending events
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportData = (type: 'users' | 'events' | 'reports') => {
    // Mock CSV export functionality
    const csvData = `data:text/csv;charset=utf-8,${type},export,mock,data\n1,2,3,4\n`;
    const encodedUri = encodeURI(csvData);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${type}_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Check if user has admin role (you'd implement proper role checking)
  const isAdmin = user?.email === 'admin@tailcircle.com'; // Mock admin check

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">You don't have permission to access the admin panel.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading">Admin Dashboard</h1>
        <p className="text-muted-foreground font-body">Manage TailCircle operations and analytics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{stats.total_users.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Daily Active</p>
                <p className="text-2xl font-bold">{stats.active_users_today.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Matches</p>
                <p className="text-2xl font-bold">{stats.total_matches.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revenue (MRR)</p>
                <p className="text-2xl font-bold">${stats.total_revenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="chats">Flagged Chats</TabsTrigger>
          <TabsTrigger value="events">Event Approvals</TabsTrigger>
          <TabsTrigger value="refunds">Refunds</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="exports">Exports</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>User Reports</CardTitle>
              <Badge variant="destructive">{stats.pending_reports} Pending</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Inappropriate Profile Photo</h4>
                    <p className="text-sm text-muted-foreground">Reported by User #1234</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Dismiss</Button>
                    <Button size="sm" variant="destructive">Take Action</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Harassment in Messages</h4>
                    <p className="text-sm text-muted-foreground">Reported by User #5678</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Dismiss</Button>
                    <Button size="sm" variant="destructive">Take Action</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Flagged Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">Chat #12345</h4>
                    <Badge variant="secondary">Auto-flagged</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Between: Golden Retriever Owner & Labrador Owner
                  </p>
                  <p className="text-sm bg-red-50 p-2 rounded border-l-4 border-red-500">
                    Flagged message: "This message was flagged for inappropriate content..."
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">Review Full Chat</Button>
                    <Button size="sm" variant="destructive">Suspend User</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Pending Event Approvals</CardTitle>
              <Badge variant="secondary">{stats.pending_events} Pending</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">Dog Park Meetup - Central Park</h4>
                  <p className="text-sm text-muted-foreground">Organized by Sarah M.</p>
                  <p className="text-sm text-muted-foreground">Date: This Saturday, 2:00 PM</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm">Approve</Button>
                    <Button size="sm" variant="destructive">Reject</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="refunds" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Refund Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Pending Refunds</h3>
                <p className="text-muted-foreground">All refund requests have been processed.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Growth Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>DAU (Daily Active Users)</span>
                    <span className="font-semibold">{stats.active_users_today}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>D1 Retention</span>
                    <span className="font-semibold">72%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>D7 Retention</span>
                    <span className="font-semibold">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Churn</span>
                    <span className="font-semibold">8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>MRR (Monthly Recurring Revenue)</span>
                    <span className="font-semibold">${stats.total_revenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversion Rate</span>
                    <span className="font-semibold">3.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ARPU (Average Revenue Per User)</span>
                    <span className="font-semibold">$4.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LTV (Lifetime Value)</span>
                    <span className="font-semibold">$24.95</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="exports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Exports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">User Data Export</h4>
                    <p className="text-sm text-muted-foreground">Export all user profiles and statistics</p>
                  </div>
                  <Button onClick={() => exportData('users')} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Events Data Export</h4>
                    <p className="text-sm text-muted-foreground">Export all events and attendance data</p>
                  </div>
                  <Button onClick={() => exportData('events')} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Reports Export</h4>
                    <p className="text-sm text-muted-foreground">Export all user reports and moderation actions</p>
                  </div>
                  <Button onClick={() => exportData('reports')} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;