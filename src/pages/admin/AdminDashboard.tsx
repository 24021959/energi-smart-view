
import { useState, useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminOverview } from '@/components/admin/AdminOverview';
import { useAuth } from '@/hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { authState } = useAuth();
  const { user, isLoading, error } = authState;
  
  useEffect(() => {
    // Log per debug
    console.log("AdminDashboard - authState:", authState);
    console.log("AdminDashboard - user:", user);
    console.log("AdminDashboard - isLoading:", isLoading);
    console.log("AdminDashboard - error:", error);
    
    if (user) {
      console.log("AdminDashboard - user role:", user.role);
    }
  }, [authState, user, isLoading, error]);

  // Mostra un loader mentre verifica l'autenticazione
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-primary border-primary/30 rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground">Caricamento dashboard...</p>
      </div>
    );
  }

  // Verifica se l'utente è autenticato
  if (!user) {
    toast({
      variant: "destructive",
      title: "Accesso non autorizzato",
      description: "Effettua il login per accedere alla dashboard"
    });
    return <Navigate to="/login" replace />;
  }

  // Verifica se l'utente è un gestore CER
  if (user.role !== 'cer_manager') {
    toast({
      variant: "destructive",
      title: "Accesso non autorizzato",
      description: "Non hai i permessi necessari per accedere a questa pagina"
    });
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Area principale */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <AdminOverview />
        </main>
      </div>
    </div>
  );
}
