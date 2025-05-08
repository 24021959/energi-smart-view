
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuthContext';
import { UserRole } from '@/types/auth';
import { useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  children?: ReactNode;
  redirectPath?: string;
}

export const ProtectedRoute = ({ 
  allowedRoles, 
  children, 
  redirectPath = '/login' 
}: ProtectedRouteProps) => {
  const { authState } = useAuth();
  const { user, isLoading, error } = authState;

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Errore di autenticazione",
        description: error,
      });
    }
  }, [error]);

  // Mostra un loader mentre verifica l'autenticazione
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-primary border-primary/30 rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground">Verifica autenticazione...</p>
      </div>
    );
  }

  // Se c'è un errore di autenticazione o non c'è un utente, reindirizza al login
  if (error || !user) {
    return <Navigate to={redirectPath} replace />;
  }

  // Se ci sono ruoli consentiti e l'utente non ha il ruolo adeguato
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Mostra un toast per informare l'utente
    toast({
      variant: "destructive",
      title: "Accesso non autorizzato",
      description: "Non hai i permessi necessari per accedere a questa pagina",
    });
    
    // Reindirizza alla dashboard appropriata in base al ruolo
    let redirectTo = '/';
    
    switch(user.role) {
      case 'cer_manager':
        redirectTo = '/admin';
        break;
      case 'producer':
        redirectTo = '/producer';
        break;
      case 'consumer':
        redirectTo = '/consumer';
        break;
      case 'prosumer':
        redirectTo = '/prosumer';
        break;
      default:
        redirectTo = '/';
    }
    
    return <Navigate to={redirectTo} replace />;
  }

  // Se è presente il children, renderizzalo, altrimenti usa Outlet
  return children ? <>{children}</> : <Outlet />;
};
