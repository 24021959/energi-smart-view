
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuthContext";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { getRedirectPathForRole, APP_CONFIG, getFullPath } from "@/lib/config";

const Index = () => {
  const { authState } = useAuth();
  const { user, isLoading } = authState;
  const navigate = useNavigate();
  const location = useLocation();

  // Debug logs
  useEffect(() => {
    console.log("Index page - Current location:", location);
    console.log("Current window location:", window.location.href);
    console.log("Base path:", APP_CONFIG.basePath);
    console.log("Auth state in Index:", authState);
    
    if (user && !isLoading) {
      console.log("Authenticated user detected in Index page:", user);
      
      const dashboardPath = getRedirectPathForRole(user.role);
      console.log("Dashboard path for role:", dashboardPath);
      
      let welcomeMessage = "Benvenuto";
      switch(user.role) {
        case 'cer_manager':
          welcomeMessage = "Benvenuto Gestore CER";
          break;
        case 'consumer':
          welcomeMessage = "Benvenuto Consumatore";
          break;
        case 'prosumer':
          welcomeMessage = "Benvenuto Prosumer";
          break;
        case 'producer':
          welcomeMessage = "Benvenuto Produttore";
          break;
      }
      
      // Show welcome toast
      toast.success(welcomeMessage, {
        description: "Accesso alla dashboard"
      });
      
      // Navigate to appropriate dashboard
      console.log("Redirecting to dashboard:", dashboardPath);
      navigate(dashboardPath);
    }
  }, [user, isLoading, navigate, location]);

  // Show loader while loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-primary border-primary/30 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Caricamento...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated, redirection will be handled by the effect
  if (user) {
    return null; // The effect will handle redirection
  }

  const handleLoginClick = () => {
    const loginPath = APP_CONFIG.paths.login;
    console.log("Navigating to login page, raw path:", loginPath);
    console.log("Full login path:", getFullPath(loginPath));
    navigate(loginPath);  // No need for getFullPath here since we use BrowserRouter with basename
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <h1 className="text-xl font-bold text-gray-800">Energy Smart</h1>
          </div>
          <div>
            <button 
              onClick={handleLoginClick} 
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
            >
              Accedi
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Benvenuto nella piattaforma Energy Smart</h2>
          <p className="text-lg text-gray-600 mb-8">
            Gestisci i tuoi dati energetici e monitora i consumi in tempo reale
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {/* Dashboard Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Dashboard Personale</h3>
              <p className="text-gray-600">Visualizza i tuoi dati di consumo e produzione energetica</p>
            </div>
            
            {/* Reports Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Report Energetici</h3>
              <p className="text-gray-600">Analizza l'andamento dei consumi e dei risparmi nel tempo</p>
            </div>
            
            {/* Community Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Comunità Energetica</h3>
              <p className="text-gray-600">Partecipa attivamente alla tua comunità energetica locale</p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Logo size="sm" />
            <p className="text-sm text-gray-600">© 2025 Energy Smart</p>
          </div>
          <p className="text-sm text-gray-500">Powered by EVAI Technologies</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
