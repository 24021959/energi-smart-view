
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plant } from '@/types/plant';
import { ArrowLeft, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Dati di esempio per gli impianti
const demoPlants: Plant[] = [
  {
    id: '1',
    name: 'Impianto Fotovoltaico Centro',
    type: 'solar',
    power: 10.5,
    address: 'Via Roma 123',
    city: 'Milano',
    province: 'MI',
    postalCode: '20100',
    status: 'active',
    owner: 'Comune di Milano',
    installationDate: '2022-06-15',
    createdAt: '2022-05-01',
  },
  {
    id: '2',
    name: 'Parco Eolico Nord',
    type: 'wind',
    power: 50.0,
    address: 'Strada Provinciale 45',
    city: 'Bergamo',
    province: 'BG',
    postalCode: '24100',
    status: 'active',
    owner: 'EnergyCoop',
    installationDate: '2021-11-30',
    createdAt: '2021-09-15',
  },
  {
    id: '3',
    name: 'Mini-idro Fiume Adda',
    type: 'hydro',
    power: 5.2,
    address: 'Lungo Fiume 78',
    city: 'Lecco',
    province: 'LC',
    postalCode: '23900',
    status: 'maintenance',
    owner: 'Consorzio Acque',
    installationDate: '2023-01-20',
    createdAt: '2022-11-05',
  },
  {
    id: '4',
    name: 'Biomassa Agricola Sud',
    type: 'biomass',
    power: 7.8,
    address: 'Via delle Industrie 42',
    city: 'Pavia',
    province: 'PV',
    postalCode: '27100',
    status: 'inactive',
    owner: 'Cooperativa Agricola',
    installationDate: '2022-03-10',
    createdAt: '2022-01-25',
  },
  {
    id: '5',
    name: 'Solare Scuola',
    type: 'solar',
    power: 3.2,
    address: 'Viale dell\'Educazione 15',
    city: 'Como',
    province: 'CO',
    postalCode: '22100',
    status: 'pending',
    owner: 'Istituto Comprensivo',
    installationDate: '2023-04-05',
    createdAt: '2023-02-10',
  },
];

// Helper per ottenere il colore del badge in base allo stato
const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'destructive';
    case 'pending':
      return 'warning';
    case 'maintenance':
      return 'outline';
    default:
      return 'secondary';
  }
};

// Helper per ottenere l'etichetta in italiano dello stato
const getStatusLabel = (status: string) => {
  switch (status) {
    case 'active':
      return 'Attivo';
    case 'inactive':
      return 'Inattivo';
    case 'pending':
      return 'In attesa';
    case 'maintenance':
      return 'Manutenzione';
    default:
      return status;
  }
};

// Helper per ottenere l'etichetta in italiano del tipo di impianto
const getTypeLabel = (type: string) => {
  switch (type) {
    case 'solar':
      return 'Fotovoltaico';
    case 'wind':
      return 'Eolico';
    case 'hydro':
      return 'Idroelettrico';
    case 'biomass':
      return 'Biomassa';
    case 'geothermal':
      return 'Geotermico';
    default:
      return type;
  }
};

export default function PlantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuliamo il recupero dei dati dell'impianto
    setLoading(true);
    setTimeout(() => {
      const foundPlant = demoPlants.find(p => p.id === id);
      setPlant(foundPlant || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <AdminLayout title="Dettaglio Impianto">
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-t-purple-700 border-purple-200 rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!plant) {
    return (
      <AdminLayout title="Impianto non trovato">
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-4">Impianto non trovato</h2>
          <p className="mb-6">L'impianto richiesto non esiste o è stato rimosso.</p>
          <Button 
            onClick={() => navigate('/admin/plants')}
            variant="outline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Torna alla lista
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Impianto: ${plant.name}`}>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin/plants')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Torna alla lista
          </Button>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Modifica
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-purple-900">{plant.name}</h2>
              <Badge variant={getStatusBadgeVariant(plant.status)}>
                {getStatusLabel(plant.status)}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Tipo impianto</h3>
                <p className="text-base">{getTypeLabel(plant.type)}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Potenza</h3>
                <p className="text-base">{plant.power} kW</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Proprietario</h3>
                <p className="text-base">{plant.owner}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Data installazione</h3>
                <p className="text-base">{new Date(plant.installationDate).toLocaleDateString('it-IT')}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Indirizzo</h3>
                <p className="text-base">{plant.address}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Città</h3>
                <p className="text-base">{plant.city} ({plant.province}), {plant.postalCode}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Data creazione</h3>
                <p className="text-base">{new Date(plant.createdAt).toLocaleDateString('it-IT')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/20 p-6">
            <h3 className="font-medium mb-4">Dati energetici</h3>
            <p className="text-muted-foreground">I dati energetici di questo impianto saranno disponibili prossimamente.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
