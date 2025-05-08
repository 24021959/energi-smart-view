
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Le pagine pubbliche
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

// Le pagine admin
import AdminDashboard from "@/pages/admin/AdminDashboard";
import Configurations from "@/pages/admin/Configurations";
import ConfigurationDetail from "@/pages/admin/ConfigurationDetail";
import AddConfiguration from "@/pages/admin/AddConfiguration";
import EditConfiguration from "@/pages/admin/EditConfiguration";
import Members from "@/pages/admin/Members";
import MemberDetail from "@/pages/admin/MemberDetail";
import AddMember from "@/pages/admin/AddMember";
import Plants from "@/pages/admin/Plants";
import PlantDetail from "@/pages/admin/PlantDetail";
import AddPlant from "@/pages/admin/AddPlant";
import EditPlant from "@/pages/admin/EditPlant";
import EnergyData from "@/pages/admin/EnergyData";
import Reports from "@/pages/admin/Reports";
import Settings from "@/pages/admin/Settings";
import Properties from "@/pages/admin/Properties"; // Nuova pagina per la gestione proprietà
import AddProperty from "@/pages/admin/AddProperty"; // Nuova pagina per aggiungere proprietà
import PropertyDetail from "@/pages/admin/PropertyDetail"; // Nuova pagina per i dettagli proprietà

export default function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="login" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="admin" element={<ProtectedRoute allowedRoles={['cer_manager']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="admin/configurations" element={<ProtectedRoute allowedRoles={['cer_manager']}><Configurations /></ProtectedRoute>} />
        <Route path="admin/configurations/:id" element={<ProtectedRoute allowedRoles={['cer_manager']}><ConfigurationDetail /></ProtectedRoute>} />
        <Route path="admin/configurations/add" element={<ProtectedRoute allowedRoles={['cer_manager']}><AddConfiguration /></ProtectedRoute>} />
        <Route path="admin/configurations/edit/:id" element={<ProtectedRoute allowedRoles={['cer_manager']}><EditConfiguration /></ProtectedRoute>} />
        <Route path="admin/members" element={<ProtectedRoute allowedRoles={['cer_manager']}><Members /></ProtectedRoute>} />
        <Route path="admin/members/:id" element={<ProtectedRoute allowedRoles={['cer_manager']}><MemberDetail /></ProtectedRoute>} />
        <Route path="admin/members/add" element={<ProtectedRoute allowedRoles={['cer_manager']}><AddMember /></ProtectedRoute>} />
        <Route path="admin/plants" element={<ProtectedRoute allowedRoles={['cer_manager']}><Plants /></ProtectedRoute>} />
        <Route path="admin/plants/:id" element={<ProtectedRoute allowedRoles={['cer_manager']}><PlantDetail /></ProtectedRoute>} />
        <Route path="admin/plants/add" element={<ProtectedRoute allowedRoles={['cer_manager']}><AddPlant /></ProtectedRoute>} />
        <Route path="admin/plants/edit/:id" element={<ProtectedRoute allowedRoles={['cer_manager']}><EditPlant /></ProtectedRoute>} />
        <Route path="admin/energy" element={<ProtectedRoute allowedRoles={['cer_manager']}><EnergyData /></ProtectedRoute>} />
        <Route path="admin/reports" element={<ProtectedRoute allowedRoles={['cer_manager']}><Reports /></ProtectedRoute>} />
        <Route path="admin/settings" element={<ProtectedRoute allowedRoles={['cer_manager']}><Settings /></ProtectedRoute>} />
        
        {/* Nuove rotte per la gestione delle proprietà */}
        <Route path="admin/properties" element={<ProtectedRoute allowedRoles={['cer_manager']}><Properties /></ProtectedRoute>} />
        <Route path="admin/properties/add" element={<ProtectedRoute allowedRoles={['cer_manager']}><AddProperty /></ProtectedRoute>} />
        <Route path="admin/properties/:id" element={<ProtectedRoute allowedRoles={['cer_manager']}><PropertyDetail /></ProtectedRoute>} />

        {/* Default route for unmatched paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
