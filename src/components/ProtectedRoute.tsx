
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuthContext';
import { UserRole } from '@/types/auth';
import { useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  children?: ReactNode;
}

export const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
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
  
  // Log per debug
  console.log("ProtectedRoute - user:", user);
  console.log("ProtectedRoute - isLoading:", isLoading);
  console.log("ProtectedRoute - allowedRoles:", allowedRoles);

  // Mostra un loader mentre verifica l'autenticazione
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-primary border-primary/30 rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground">Verifica autenticazione...</p>
      </div>
    );
  }

  // Se c'è un errore di autenticazione
  if (error) {
    return <Navigate to="/login" replace />;
  }

  // Se non c'è un utente, reindirizza al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se ci sono ruoli consentiti e l'utente non ha il ruolo adeguato
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Mostra un toast per informare l'utente
    toast({
      variant: "destructive",
      title: "Accesso non autorizzato",
      description: "Non hai i permessi necessari per accedere a questa pagina",
    });
    // Reindirizza alla home page
    return <Navigate to="/" replace />;
  }

  // Se è presente il children, renderizzalo, altrimenti usa Outlet
  return children ? <>{children}</> : <Outlet />;
};
