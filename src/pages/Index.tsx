
import { Logo } from "@/components/Logo";

const Index = () => {
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
