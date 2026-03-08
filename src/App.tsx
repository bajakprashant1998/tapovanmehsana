import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Facilities from "./pages/Facilities";
import Admissions from "./pages/Admissions";
import ResidentialLife from "./pages/ResidentialLife";
import Gallery from "./pages/Gallery";
import Portal from "./pages/Portal";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Alumni from "./pages/Alumni";
import MandatoryDisclosure from "./pages/MandatoryDisclosure";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth pages - no layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/admin" element={<Admin />} />

            {/* Public pages with layout */}
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/academics" element={<Layout><Academics /></Layout>} />
            <Route path="/facilities" element={<Layout><Facilities /></Layout>} />
            <Route path="/admissions" element={<Layout><Admissions /></Layout>} />
            <Route path="/residential-life" element={<Layout><ResidentialLife /></Layout>} />
            <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
            <Route path="/careers" element={<Layout><Careers /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/events" element={<Layout><Events /></Layout>} />
            <Route path="/alumni" element={<Layout><Alumni /></Layout>} />
            <Route path="/mandatory-disclosure" element={<Layout><MandatoryDisclosure /></Layout>} />
            <Route path="/results" element={<Layout><Results /></Layout>} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
