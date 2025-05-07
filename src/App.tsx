
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
import Members from "./pages/admin/Members";
import AddMember from "./pages/admin/AddMember";
import EnergyData from "./pages/admin/EnergyData";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

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
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['cer_manager']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/admin/members" 
              element={
                <ProtectedRoute allowedRoles={['cer_manager']}>
                  <Members />
                </ProtectedRoute>
              } 
            />
            
            {/* Nuova rotta per l'aggiunta di membri */}
            <Route 
              path="/admin/members/add" 
              element={
                <ProtectedRoute allowedRoles={['cer_manager']}>
                  <AddMember />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/admin/energy" 
              element={
                <ProtectedRoute allowedRoles={['cer_manager']}>
                  <EnergyData />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/admin/reports" 
              element={
                <ProtectedRoute allowedRoles={['cer_manager']}>
                  <Reports />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute allowedRoles={['cer_manager']}>
                  <Settings />
                </ProtectedRoute>
              } 
            />

            {/* Rotta non trovata */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
