
import { ReactNode, useState } from 'react';
import { ProsumerSidebar } from '@/components/prosumer/ProsumerSidebar';
import { ProsumerHeader } from '@/components/prosumer/ProsumerHeader';
import { useAuth } from '@/hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface ProsumerLayoutProps {
  children: ReactNode;
  title?: string;
}

export function ProsumerLayout({ children, title = 'Dashboard Prosumer' }: ProsumerLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { authState } = useAuth();
  const { user, isLoading } = authState;
  
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
    toast({
      variant: "destructive",
      title: "Accesso non autorizzato",
      description: "Effettua il login per accedere alla dashboard"
    });
    return <Navigate to="/energi-smart-view/login" replace />;
  }

  // Verifica se l'utente è un prosumer
  if (user.role !== 'prosumer') {
    console.log(`Utente con ruolo ${user.role} non autorizzato, reindirizzamento`);
    toast({
      variant: "destructive",
      title: "Accesso non autorizzato",
      description: "Non hai i permessi necessari per accedere a questa pagina"
    });
    
    // Reindirizza in base al ruolo con il basename corretto
    if (user.role === 'cer_manager') {
      return <Navigate to="/energi-smart-view/admin" replace />;
    } else if (user.role === 'consumer') {
      return <Navigate to="/energi-smart-view/consumer" replace />;
    } else if (user.role === 'producer') {
      return <Navigate to="/energi-smart-view/producer" replace />;
    } else {
      return <Navigate to="/energi-smart-view/" replace />;
    }
  }

  console.log("ProsumerLayout renderizzato correttamente per", user.email);
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <ProsumerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Area principale */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <ProsumerHeader 
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
