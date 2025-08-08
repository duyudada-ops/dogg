import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Swipe from "./pages/Swipe";
import Matches from "./pages/Matches";
import Events from "./pages/Events";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import PremiumSuccess from "./pages/PremiumSuccess";
import BottomNav from "./components/layout/BottomNav";
import { useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        {!user ? (
          <Route path="*" element={<Index />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/messages" element={<Matches />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/premium-success" element={<PremiumSuccess />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
      {user && <BottomNav />}
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
          <div className="min-h-screen bg-background pb-16">
            <AppContent />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
