
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card,
  CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Configuration, ConfigurationType } from '@/types/configuration';
import { PlusCircle } from 'lucide-react';

// Dati di esempio per le configurazioni
const mockConfigurations: Configuration[] = [
  {
    id: '1',
    name: 'CER Di Peccioli',
    type: 'CER',
    description: 'Simulazione Gruppo di autoconsumo',
    address: 'Via Carlo Serassi, 21',
    city: 'Bergamo',
    postalCode: '24124',
    participants: 5,
    status: 'active',
    imageUrl: '/lovable-uploads/24090a5a-717a-4091-908c-f28d226e8f71.png',
    createdAt: '2023-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'CECER Testing',
    type: 'CECER',
    description: 'Via Roma 123',
    address: 'Via Roma, 123',
    city: 'Roma',
    postalCode: '00100',
    participants: 16,
    status: 'pending',
    createdAt: '2023-02-20T14:15:00Z'
  },
  {
    id: '3',
    name: 'Energy Dream',
    type: 'CER',
    description: 'Test CER 2 Gate',
    address: 'Via Energia, 45',
    city: 'Milano',
    postalCode: '20100',
    participants: 8,
    status: 'active',
    imageUrl: '/lovable-uploads/24090a5a-717a-4091-908c-f28d226e8f71.png',
    createdAt: '2023-03-10T09:45:00Z'
  },
  {
    id: '4',
    name: 'Stefano Pistoia',
    type: 'monitoraggio',
    description: 'Monitoraggio utenza Stefano Pistoia',
    address: 'Via Immaginetta, 28',
    city: 'Pisa',
    postalCode: '56100',
    participants: 1,
    status: 'active',
    createdAt: '2023-04-05T16:20:00Z'
  },
];

// Badge per visualizzare il tipo di configurazione
const TypeBadge = ({ type }: { type: ConfigurationType }) => {
  const colors: Record<ConfigurationType, string> = {
    'CER': 'bg-green-100 text-green-800',
    'CECER': 'bg-blue-100 text-blue-800',
    'test': 'bg-purple-100 text-purple-800',
    'pilota': 'bg-yellow-100 text-yellow-800',
    'monitoraggio': 'bg-orange-100 text-orange-800',
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${colors[type]}`}>
      {type}
    </span>
  );
};

// Badge per visualizzare lo stato della configurazione
const StatusBadge = ({ status }: { status: 'active' | 'pending' | 'planning' }) => {
  const colors = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-orange-100 text-orange-800',
    planning: 'bg-blue-100 text-blue-800',
  };

  const labels = {
    active: 'Attivo',
    pending: 'In attesa',
    planning: 'Pianificato',
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${colors[status]}`}>
      {labels[status]}
    </span>
  );
};

export function ConfigurationList() {
  const [configurations] = useState<Configuration[]>(mockConfigurations);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card per aggiungere una nuova configurazione */}
        <Link to="/admin/configurations/add">
          <Card className="h-full border-2 border-dashed border-gray-300 hover:border-purple-400 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center h-full py-12">
              <PlusCircle className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-600">Aggiungi Configurazione</h3>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Crea una nuova configurazione energetica
              </p>
            </CardContent>
          </Card>
        </Link>
        
        {/* Card per ogni configurazione esistente */}
        {configurations.map((config) => (
          <Link to={`/admin/configurations/${config.id}`} key={config.id}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-end space-x-2 mb-3">
                  <TypeBadge type={config.type} />
                  <StatusBadge status={config.status} />
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center mr-4">
                    {config.imageUrl ? (
                      <img src={config.imageUrl} alt={config.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-2xl font-bold text-gray-400">{config.name.charAt(0)}</div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-purple-900">{config.name}</h3>
                    <p className="text-sm text-gray-600">{config.description}</p>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mb-1">
                  {config.address}, {config.postalCode} {config.city}
                </div>
                
                <div className="flex items-center justify-end mt-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    {config.participants} Partecipanti
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
