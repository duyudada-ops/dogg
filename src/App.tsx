import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { NotificationProvider } from "./components/ui/notification-provider";
import Landing from "./pages/Landing";
import { AuthPage } from "./components/auth/AuthPage";
import AuthCallback from "./pages/AuthCallback";
import Onboarding from "./pages/Onboarding";
import Discover from "./pages/Discover";
import Matches from "./pages/Matches";
import Chat from "./pages/Chat";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Billing from "./pages/Billing";
import Premium from "./pages/Premium";
import BillingThankYou from "./pages/BillingThankYou";
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

  return (
    <>
      <Routes>
        <Route path="/" element={
          !user ? <Landing /> : (
            localStorage.getItem("authCallbackProcessed") === "true" ? (
              (() => {
                localStorage.removeItem("authCallbackProcessed");
                return <Navigate to="/onboarding" replace />;
              })()
            ) : <Navigate to="/discover" replace />
          )
        } />
        <Route path="/auth" element={
          !user ? <AuthPage /> : <Navigate to="/discover" replace />
        } />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/onboarding" element={user ? <Onboarding /> : <Navigate to="/" replace />} />
        <Route path="/discover" element={user ? <Discover /> : <Navigate to="/" replace />} />
        <Route path="/matches" element={user ? <Matches /> : <Navigate to="/" replace />} />
        <Route path="/chat" element={user ? <Chat /> : <Navigate to="/" replace />} />
        <Route path="/events" element={user ? <Events /> : <Navigate to="/" replace />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" replace />} />
        <Route path="/settings" element={user ? <Settings /> : <Navigate to="/" replace />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/billing/thank-you" element={<BillingThankYou />} />
        <Route path="/premium" element={user ? <Premium /> : <Navigate to="/" replace />} />
        <Route path="/help" element={user ? <Help /> : <Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to={user ? "/discover" : "/"} replace />} />
      </Routes>
      {user && <BottomNavigation />}
    </>
  );
};

const App = () => (
  <ErrorBoundary>
    <NotificationProvider>
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
    </NotificationProvider>
  </ErrorBoundary>
);

export default App;
