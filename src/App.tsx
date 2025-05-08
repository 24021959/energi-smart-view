
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { APP_CONFIG } from "@/lib/config";

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
import Properties from "@/pages/admin/Properties"; 
import AddProperty from "@/pages/admin/AddProperty"; 
import PropertyDetail from "@/pages/admin/PropertyDetail"; 

// Le pagine consumer
import ConsumerDashboard from "@/pages/consumer/ConsumerDashboard";
import ConsumerBills from "@/pages/consumer/ConsumerBills";
import ConsumerBillUpload from "@/pages/consumer/ConsumerBillUpload";

// Le pagine prosumer
import ProsumerDashboard from "@/pages/prosumer/ProsumerDashboard";
import ProsumerBills from "@/pages/prosumer/ProsumerBills";
import ProsumerBillUpload from "@/pages/prosumer/ProsumerBillUpload";

// Le pagine producer
import ProducerDashboard from "@/pages/producer/ProducerDashboard";
import ProducerBills from "@/pages/producer/ProducerBills";
import ProducerProduction from "@/pages/producer/ProducerProduction";

export default function App() {
  console.log("App rendering with base path:", APP_CONFIG.basePath);
  
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public Routes */}
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
        <Route path="admin/properties" element={<ProtectedRoute allowedRoles={['cer_manager']}><Properties /></ProtectedRoute>} />
        <Route path="admin/properties/add" element={<ProtectedRoute allowedRoles={['cer_manager']}><AddProperty /></ProtectedRoute>} />
        <Route path="admin/properties/:id" element={<ProtectedRoute allowedRoles={['cer_manager']}><PropertyDetail /></ProtectedRoute>} />

        {/* Consumer Routes */}
        <Route path="consumer" element={<ProtectedRoute allowedRoles={['consumer']}><ConsumerDashboard /></ProtectedRoute>} />
        <Route path="consumer/bills" element={<ProtectedRoute allowedRoles={['consumer']}><ConsumerBills /></ProtectedRoute>} />
        <Route path="consumer/bills/upload" element={<ProtectedRoute allowedRoles={['consumer']}><ConsumerBillUpload /></ProtectedRoute>} />
        
        {/* Prosumer Routes */}
        <Route path="prosumer" element={<ProtectedRoute allowedRoles={['prosumer']}><ProsumerDashboard /></ProtectedRoute>} />
        <Route path="prosumer/bills" element={<ProtectedRoute allowedRoles={['prosumer']}><ProsumerBills /></ProtectedRoute>} />
        <Route path="prosumer/bills/upload" element={<ProtectedRoute allowedRoles={['prosumer']}><ProsumerBillUpload /></ProtectedRoute>} />
        
        {/* Producer Routes */}
        <Route path="producer" element={<ProtectedRoute allowedRoles={['producer']}><ProducerDashboard /></ProtectedRoute>} />
        <Route path="producer/bills" element={<ProtectedRoute allowedRoles={['producer']}><ProducerBills /></ProtectedRoute>} />
        <Route path="producer/production" element={<ProtectedRoute allowedRoles={['producer']}><ProducerProduction /></ProtectedRoute>} />

        {/* Default route for unmatched paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
