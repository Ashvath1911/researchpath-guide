import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProjectProvider } from "@/contexts/ProjectContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/components/AppLayout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ResearchTracks from "./pages/ResearchTracks";
import TrackDetail from "./pages/TrackDetail";
import StageGuide from "./pages/StageGuide";
import StageDetail from "./pages/StageDetail";
import Tools from "./pages/Tools";
import Templates from "./pages/Templates";
import Glossary from "./pages/Glossary";
import LearningCenter from "./pages/LearningCenter";
import ProgressPage from "./pages/ProgressPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const OnboardingGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (user && !user.onboarded) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
};

const ProtectedWithLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute>
    <OnboardingGate>
      <ProjectProvider>
        <AppLayout>{children}</AppLayout>
      </ProjectProvider>
    </OnboardingGate>
  </ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />

            <Route path="/" element={<ProtectedWithLayout><Dashboard /></ProtectedWithLayout>} />
            <Route path="/projects" element={<ProtectedWithLayout><Projects /></ProtectedWithLayout>} />
            <Route path="/tracks" element={<ProtectedWithLayout><ResearchTracks /></ProtectedWithLayout>} />
            <Route path="/tracks/:id" element={<ProtectedWithLayout><TrackDetail /></ProtectedWithLayout>} />
            <Route path="/stages" element={<ProtectedWithLayout><StageGuide /></ProtectedWithLayout>} />
            <Route path="/stages/:id" element={<ProtectedWithLayout><StageDetail /></ProtectedWithLayout>} />
            <Route path="/tools" element={<ProtectedWithLayout><Tools /></ProtectedWithLayout>} />
            <Route path="/templates" element={<ProtectedWithLayout><Templates /></ProtectedWithLayout>} />
            <Route path="/glossary" element={<ProtectedWithLayout><Glossary /></ProtectedWithLayout>} />
            <Route path="/learning" element={<ProtectedWithLayout><LearningCenter /></ProtectedWithLayout>} />
            <Route path="/progress" element={<ProtectedWithLayout><ProgressPage /></ProtectedWithLayout>} />
            <Route path="/settings" element={<ProtectedWithLayout><SettingsPage /></ProtectedWithLayout>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
