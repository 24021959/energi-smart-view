
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plant, PlantStatus, PlantType } from '@/types/plant';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Plus } from 'lucide-react';

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
const getStatusBadgeVariant = (status: PlantStatus) => {
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
const getStatusLabel = (status: PlantStatus) => {
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
const getTypeLabel = (type: PlantType) => {
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

export function PlantTable() {
  const navigate = useNavigate();
  const [plants] = useState<Plant[]>(demoPlants);

  const viewPlantDetails = (plantId: string) => {
    navigate(`/admin/plants/${plantId}`);
  };

  const navigateToAddPlant = () => {
    navigate('/admin/plants/add');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-purple-900">Impianti CER</h2>
        <Button 
          onClick={navigateToAddPlant}
          className="bg-purple-700 hover:bg-purple-800"
        >
          <Plus className="h-4 w-4 mr-2" />
          Aggiungi Impianto
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Potenza (kW)</TableHead>
              <TableHead>Città</TableHead>
              <TableHead>Stato</TableHead>
              <TableHead>Proprietario</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plants.map((plant) => (
              <TableRow key={plant.id}>
                <TableCell className="font-medium">{plant.name}</TableCell>
                <TableCell>{getTypeLabel(plant.type)}</TableCell>
                <TableCell>{plant.power.toFixed(1)}</TableCell>
                <TableCell>{`${plant.city} (${plant.province})`}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(plant.status)}>
                    {getStatusLabel(plant.status)}
                  </Badge>
                </TableCell>
                <TableCell>{plant.owner}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => viewPlantDetails(plant.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Dettagli
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
