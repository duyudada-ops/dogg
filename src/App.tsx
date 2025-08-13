import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";
import { AuthPage } from "./components/auth/AuthPage";
import Onboarding from "./pages/Onboarding";
import Discover from "./pages/Discover";
import Matches from "./pages/Matches";
import Chat from "./pages/Chat";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Billing from "./pages/Billing";
import Help from "./pages/Help";
import BottomNavigation from "./components/layout/BottomNavigation";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading TailCircle...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/events" element={<Events />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/help" element={<Help />} />
        <Route path="/" element={<Navigate to="/discover" replace />} />
        <Route path="*" element={<Navigate to="/discover" replace />} />
      </Routes>
      <BottomNavigation />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <AppContent />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
