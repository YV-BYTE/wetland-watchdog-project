
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VolunteerPage from "./pages/VolunteerPage";
import CommunityPage from "./pages/CommunityPage";
import ReportPage from "./pages/ReportPage";
import LearnPage from "./pages/LearnPage";
import QuizPage from "./pages/QuizPage";
import ProfilePage from "./pages/ProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
