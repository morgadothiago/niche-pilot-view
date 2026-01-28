import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PaletteInitializer } from "@/components/PaletteInitializer";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppConfigProvider } from "@/contexts/AppConfigContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminGuard } from "@/components/admin/AdminGuard";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Auth from "./pages/Auth";
import Pricing from "./pages/Pricing";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import ChangePlan from "./pages/ChangePlan";
import BuyCredits from "./pages/BuyCredits";
import NotFound from "./pages/NotFound";

// Lazy-loaded heavy pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Chat = lazy(() => import("./pages/Chat"));
const Agents = lazy(() => import("./pages/Agents"));
const CreateAgent = lazy(() => import("./pages/CreateAgent"));

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminAgents = lazy(() => import("./pages/admin/AdminAgents"));
const AdminSubscriptions = lazy(() => import("./pages/admin/AdminSubscriptions"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

import { Loader2 } from "lucide-react";
import scheduleIdlePrefetch from "@/lib/idlePreload";

function RouteFallback() {
  return (
    <div className="flex items-center justify-center h-48">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}

function IdlePrefetch() {
  useEffect(() => {
    scheduleIdlePrefetch();
  }, []);
  return null;
}

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/chat/:chatId"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/chat/new"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/agents"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ProtectedRoute>
                <Agents />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/agents/create"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ProtectedRoute>
                <CreateAgent />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-plan"
          element={
            <ProtectedRoute>
              <ChangePlan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buy-credits"
          element={
            <ProtectedRoute>
              <BuyCredits />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AdminGuard>
                <AdminDashboard />
              </AdminGuard>
            </Suspense>
          }
        />
        <Route
          path="/admin/users"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AdminGuard>
                <AdminUsers />
              </AdminGuard>
            </Suspense>
          }
        />
        <Route
          path="/admin/agents"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AdminGuard>
                <AdminAgents />
              </AdminGuard>
            </Suspense>
          }
        />
        <Route
          path="/admin/subscriptions"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AdminGuard>
                <AdminSubscriptions />
              </AdminGuard>
            </Suspense>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AdminGuard>
                <AdminSettings />
              </AdminGuard>
            </Suspense>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AppConfigProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <PaletteInitializer />
            <ErrorBoundary>
              <BrowserRouter>
                <AnimatedRoutes />
              </BrowserRouter>
            </ErrorBoundary>
            <IdlePrefetch />
          </TooltipProvider>
        </AuthProvider>
      </AppConfigProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
