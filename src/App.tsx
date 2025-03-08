import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./components/theme/ThemeProvider";

// Pages
import Index from "./pages/Index";
import Directory from "./pages/Directory";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AlumniProfile from "./pages/AlumniProfile";
import StudentProfile from "./pages/StudentProfile";
import CollegeProfile from "./pages/CollegeProfile";
import Jobs from "./pages/Jobs";

// Components
import ChatSystem from "./components/chat/ChatSystem";

// Community Pages
import Community from "./pages/Community";
import Forums from "@/components/community/pages/Forums";
import StudyGroups from "@/components/community/pages/StudyGroups";
import Mentorship from "@/components/community/pages/Mentorship";
import Resources from "@/components/community/pages/Resources";
import News from "@/components/community/pages/News";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="alumni-connect-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/directory" element={<Directory />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/alumni/:id" element={<AlumniProfile />} />
              <Route path="/student/:id" element={<StudentProfile />} />
              <Route path="/college/:id" element={<CollegeProfile />} />
              <Route path="/jobs" element={<Jobs />} />
              
              {/* Community Routes */}
              <Route path="/community" element={<Community />}>
                <Route index element={<Navigate to="forums" />} />
                <Route path="forums" element={<Forums />} />
                <Route path="study-groups" element={<StudyGroups />} />
                <Route path="mentorship" element={<Mentorship />} />
                <Route path="resources" element={<Resources />} />
                <Route path="news" element={<News />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
          <ChatSystem />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
