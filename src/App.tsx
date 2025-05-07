
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Rotte pubbliche */}
            <Route path="/login" element={<Login />} />

            {/* Rotte protette per tutti gli utenti autenticati */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Index />} />
            </Route>

            {/* Rotte protette per gestori CER */}
            <Route element={<ProtectedRoute allowedRoles={['cer_manager']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* Rotta non trovata */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
