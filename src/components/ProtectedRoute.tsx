
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuthContext';
import { UserRole } from '@/types/auth';
import { useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { getRedirectPathForRole, APP_CONFIG } from '@/lib/config';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  children?: ReactNode;
  redirectPath?: string;
}

export const ProtectedRoute = ({ 
  allowedRoles, 
  children, 
  redirectPath = APP_CONFIG.paths.login 
}: ProtectedRouteProps) => {
  const { authState } = useAuth();
  const { user, isLoading, error } = authState;

  useEffect(() => {
    if (error) {
      toast.error("Errore di autenticazione", {
        description: error
      });
    }
  }, [error]);

  // Debug logs
  useEffect(() => {
    console.log("ProtectedRoute - Auth state:", { 
      user, 
      isLoading, 
      error, 
      allowedRoles,
      pathname: window.location.pathname 
    });
  }, [user, isLoading, error, allowedRoles]);

  // Show loader while checking authentication
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-primary border-primary/30 rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground">Verifica autenticazione...</p>
      </div>
    );
  }

  // If authentication error or no user, redirect to login
  if (error || !user) {
    console.log("Redirecting to login due to:", { error, user });
    return <Navigate to={redirectPath} replace />;
  }

  // If there are allowed roles and user doesn't have the required role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log("User does not have required role", { userRole: user.role, allowedRoles });
    
    // Show toast
    toast.error("Accesso non autorizzato", {
      description: "Non hai i permessi necessari per accedere a questa pagina"
    });
    
    // Redirect to appropriate dashboard based on role
    const redirectTo = getRedirectPathForRole(user.role);
    
    console.log("Redirecting user to:", redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  // If there's a children component, render it, otherwise use Outlet
  return children ? <>{children}</> : <Outlet />;
};
