
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const { authState } = useAuth();
  const { user, isLoading } = authState;

  // Aggiunge log per debug
  useEffect(() => {
    if (user) {
      console.log("Utente autenticato in Index.tsx:", user);
      console.log("Ruolo utente:", user.role);
    } else {
      console.log("Nessun utente autenticato in Index.tsx");
    }
  }, [user]);

  // Se l'utente è autenticato, reindirizzalo alla dashboard appropriata
  if (!isLoading && user) {
    console.log("Reindirizzamento alla dashboard per il ruolo:", user.role);
    
    // Reindirizza in base al ruolo con il basename corretto
    switch(user.role) {
      case 'cer_manager':
        toast({
          title: "Benvenuto Gestore CER",
          description: "Accesso alla dashboard amministrativa"
        });
        return <Navigate to="/energi-smart-view/admin" replace />;
      
      case 'consumer':
        toast({
          title: "Benvenuto Consumatore",
          description: "Accesso alla dashboard consumatore"
        });
        return <Navigate to="/energi-smart-view/consumer" replace />;
      
      case 'producer':
        toast({
          title: "Benvenuto Produttore",
          description: "Accesso alla dashboard produttore"
        });
        return <Navigate to="/energi-smart-view/producer" replace />;
      
      case 'prosumer':
        toast({
          title: "Benvenuto Prosumer",
          description: "Accesso alla dashboard prosumer"
        });
        return <Navigate to="/energi-smart-view/prosumer" replace />;
      
      default:
        console.log("Ruolo sconosciuto, reindirizzo alla pagina principale");
        return null;
    }
  }

  // Se stiamo ancora caricando, mostra un indicatore (opzionale)
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

  // Se l'utente non è autenticato, mostra la pagina di benvenuto normale
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <h1 className="text-xl font-bold text-gray-800">Energy Smart</h1>
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
