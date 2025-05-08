
import { ReactNode, useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useAuth } from '@/hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getRedirectPathForRole, getFullPath, APP_CONFIG } from '@/lib/config';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

export function AdminLayout({ children, title = 'Dashboard Gestore CER' }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { authState } = useAuth();
  const { user, isLoading, error } = authState;
  
  // Debug logs
  console.log("AdminLayout rendering with user:", user, "isLoading:", isLoading);
  
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
    console.log("Utente non autenticato, reindirizzamento al login");
    toast.error("Accesso non autorizzato", {
      description: "Effettua il login per accedere alla dashboard"
    });
    return <Navigate to={APP_CONFIG.paths.login} replace />;
  }

  // Verifica se l'utente è un gestore CER
  if (user.role !== 'cer_manager') {
    console.log(`Utente con ruolo ${user.role} non autorizzato, reindirizzamento`);
    toast.error("Accesso non autorizzato", {
      description: "Non hai i permessi necessari per accedere a questa pagina"
    });
    
    // Reindirizza in base al ruolo
    const redirectPath = getRedirectPathForRole(user.role);
    return <Navigate to={redirectPath} replace />;
  }

  // Se l'utente è autenticato e ha il ruolo corretto, mostra il layout
  console.log("AdminLayout renderizzato correttamente per", user.email);
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Area principale */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader 
          isSidebarOpen={isSidebarOpen} 
          setIsSidebarOpen={setIsSidebarOpen} 
          title={title}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
