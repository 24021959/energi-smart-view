
import { ReactNode, useState } from 'react';
import { ConsumerSidebar } from '@/components/consumer/ConsumerSidebar';
import { ConsumerHeader } from '@/components/consumer/ConsumerHeader';
import { useAuth } from '@/hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface ConsumerLayoutProps {
  children: ReactNode;
  title?: string;
}

export function ConsumerLayout({ children, title = 'Dashboard Consumatore' }: ConsumerLayoutProps) {
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
    toast({
      variant: "destructive",
      title: "Accesso non autorizzato",
      description: "Effettua il login per accedere alla dashboard"
    });
    return <Navigate to="/login" replace />;
  }

  // Verifica se l'utente è un consumer
  if (user.role !== 'consumer') {
    toast({
      variant: "destructive",
      title: "Accesso non autorizzato",
      description: "Non hai i permessi necessari per accedere a questa pagina"
    });
    
    // Reindirizza in base al ruolo
    if (user.role === 'cer_manager') {
      return <Navigate to="/admin" replace />;
    } else if (user.role === 'prosumer') {
      return <Navigate to="/prosumer" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <ConsumerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Area principale */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <ConsumerHeader 
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
