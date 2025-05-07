import { Configuration, ConfigurationFormData } from '@/types/configuration';
import { toast } from '@/hooks/use-toast';

// Mock data to simulate database
export const mockConfigurations = [
  {
    id: '1',
    name: 'CER Di Peccioli',
    type: 'cer' as const,
    description: 'Simulazione Gruppo di autoconsumo',
    address: 'Via Carlo Serassi, 21',
    city: 'Bergamo',
    postalCode: '24124',
    province: 'BG',
    participants: 5,
    status: 'active' as const,
    imageUrl: '/lovable-uploads/24090a5a-717a-4091-908c-f28d226e8f71.png',
    createdAt: '2023-01-15T10:30:00Z',
    startDate: '2023-02-01',
    plants: ['impianto_001', 'impianto_002'],
    members: [
      { id: 'utente_001', role: 'consumer' as const, pod: 'IT001...', quota: '20%' },
      { id: 'utente_002', role: 'producer' as const, pod: 'IT002...', quota: '30%' }
    ],
    documents: ['statuto.pdf', 'contratto.pdf']
  },
  // ... other configurations
];

export const fetchConfigurationById = async (id: string): Promise<Configuration | null> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const foundConfig = mockConfigurations.find(c => c.id === id);
      resolve(foundConfig || null);
    }, 300);
  });
};

export const updateConfiguration = async (id: string, formData: ConfigurationFormData): Promise<void> => {
  try {
    // In a real app, this would be an API call
    console.log('Updating configuration:', { id, ...formData });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast({
      title: "Configurazione aggiornata",
      description: "La configurazione è stata aggiornata con successo"
    });
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error updating configuration:', error);
    toast({
      variant: "destructive",
      title: "Errore",
      description: "Si è verificato un errore durante l'aggiornamento della configurazione"
    });
    return Promise.reject(error);
  }
};
