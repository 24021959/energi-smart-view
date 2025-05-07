
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
import MemberDetail from "./pages/admin/MemberDetail";
import Plants from "./pages/admin/Plants";
import AddPlant from "./pages/admin/AddPlant";
import PlantDetail from "./pages/admin/PlantDetail";
import Configurations from "./pages/admin/Configurations";
import AddConfiguration from "./pages/admin/AddConfiguration";
import ConfigurationDetail from "./pages/admin/ConfigurationDetail";

const queryClient = new QueryClient();

// Gruppo di route che richiedono il ruolo 'cer_manager'
const adminRoutes = [
  { path: "/admin", element: <AdminDashboard /> },
  { path: "/admin/members", element: <Members /> },
  { path: "/admin/members/add", element: <AddMember /> },
  { path: "/admin/members/:id", element: <MemberDetail /> },
  { path: "/admin/plants", element: <Plants /> },
  { path: "/admin/plants/add", element: <AddPlant /> },
  { path: "/admin/plants/:id", element: <PlantDetail /> },
  { path: "/admin/configurations", element: <Configurations /> },
  { path: "/admin/configurations/add", element: <AddConfiguration /> },
  { path: "/admin/configurations/:id", element: <ConfigurationDetail /> },
  { path: "/admin/energy", element: <EnergyData /> },
  { path: "/admin/reports", element: <Reports /> },
  { path: "/admin/settings", element: <Settings /> },
];

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
            {adminRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute allowedRoles={['cer_manager']}>
                    {route.element}
                  </ProtectedRoute>
                }
              />
            ))}

            {/* Rotta non trovata */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
