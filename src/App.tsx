
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VolunteerPage from "./pages/VolunteerPage";
import CommunityPage from "./pages/CommunityPage";
import ReportPage from "./pages/ReportPage";
import LearnPage from "./pages/LearnPage";
import QuizPage from "./pages/QuizPage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import NewsPage from "./pages/NewsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/volunteer" element={<VolunteerPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/news" element={<NewsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
