
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuthContext';
import { UserRole } from '@/types/auth';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { authState } = useAuth();
  const { user, isLoading } = authState;

  // Se sta ancora caricando, mostra un loader
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Caricamento...</div>;
  }

  // Se non c'è un utente, reindirizza al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se ci sono ruoli consentiti e l'utente non ha il ruolo adeguato
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Reindirizza alla pagina non autorizzata o alla home
    return <Navigate to="/" replace />;
  }

  // Altrimenti, renderizza i componenti figlio
  return <Outlet />;
};
