
import { ReactNode, useState, useEffect } from 'react';
import { ProducerHeader } from '@/components/producer/ProducerHeader';
import { ProducerSidebar } from '@/components/producer/ProducerSidebar';
import { useAuth } from '@/hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { getRedirectPathForRole, getFullPath, APP_CONFIG } from '@/lib/config';

interface ProducerLayoutProps {
  children: ReactNode;
  title?: string;
}

export function ProducerLayout({ children, title = 'Dashboard Produttore' }: ProducerLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { authState } = useAuth();
  const { user, isLoading } = authState;
  
  useEffect(() => {
    console.log("ProducerLayout - Auth state:", { user, isLoading });
  }, [user, isLoading]);
  
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
    return <Navigate to={getFullPath(APP_CONFIG.paths.login)} replace />;
  }

  // Verifica se l'utente è un produttore
  if (user.role !== 'producer') {
    console.log(`Utente con ruolo ${user.role} non autorizzato, reindirizzamento`);
    toast({
      variant: "destructive",
      title: "Accesso non autorizzato",
      description: "Non hai i permessi necessari per accedere a questa pagina"
    });
    
    // Reindirizza in base al ruolo con il basename corretto
    const redirectPath = getFullPath(getRedirectPathForRole(user.role));
    return <Navigate to={redirectPath} replace />;
  }

  console.log("ProducerLayout renderizzato correttamente per", user.email);
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <ProducerSidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      
      {/* Area principale */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <ProducerHeader 
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
