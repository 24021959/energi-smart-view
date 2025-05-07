import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AdminLayout } from '@/layouts/AdminLayout';
import { ConfigurationForm } from '@/components/admin/configuration/ConfigurationForm';
import { Configuration, ConfigurationFormData } from '@/types/configuration';
import { toast } from '@/hooks/use-toast';

// Mock data to simulate database
const mockConfigurations = [
  {
    id: '1',
    name: 'CER Di Peccioli',
    type: 'cer',
    description: 'Simulazione Gruppo di autoconsumo',
    address: 'Via Carlo Serassi, 21',
    city: 'Bergamo',
    postalCode: '24124',
    province: 'BG',
    participants: 5,
    status: 'active',
    imageUrl: '/lovable-uploads/24090a5a-717a-4091-908c-f28d226e8f71.png',
    createdAt: '2023-01-15T10:30:00Z',
    startDate: '2023-02-01',
    plants: ['impianto_001', 'impianto_002'],
    members: [
      { id: 'utente_001', role: 'consumer', pod: 'IT001...', quota: '20%' },
      { id: 'utente_002', role: 'producer', pod: 'IT002...', quota: '30%' }
    ],
    documents: ['statuto.pdf', 'contratto.pdf']
  },
  // ... other configurations
];

const EditConfiguration = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [configuration, setConfiguration] = useState<Configuration | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const loadConfiguration = () => {
      setIsLoading(true);
      const foundConfig = mockConfigurations.find(c => c.id === id);
      
      if (foundConfig) {
        setConfiguration(foundConfig);
      }
      
      setIsLoading(false);
    };
    
    loadConfiguration();
  }, [id]);

  const handleUpdateConfiguration = async (formData: ConfigurationFormData) => {
    try {
      // In a real app, this would be an API call to update the configuration
      console.log('Updating configuration:', { id, ...formData });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Configurazione aggiornata",
        description: "La configurazione è stata aggiornata con successo"
      });
      
      navigate(`/admin/configurations/${id}`);
    } catch (error) {
      console.error('Error updating configuration:', error);
      toast({
        variant: "destructive",
        title: "Errore",
        description: "Si è verificato un errore durante l'aggiornamento della configurazione"
      });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Modifica Configurazione">
        <div className="container mx-auto px-4 py-8">
          <p>Caricamento in corso...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!configuration) {
    return (
      <AdminLayout title="Modifica Configurazione">
        <div className="container mx-auto px-4 py-8">
          <p>Configurazione non trovata</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Modifica ${configuration.name}`}>
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-purple-900">Modifica Configurazione</h1>
          <p className="text-gray-500">Aggiorna i dettagli della configurazione energetica</p>
        </div>
        
        <ConfigurationForm 
          isEditing={true} 
          initialData={configuration} 
          onSubmit={handleUpdateConfiguration} 
        />
      </div>
    </AdminLayout>
  );
};

export default EditConfiguration;
