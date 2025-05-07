import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plant } from '@/types/plant';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mockPlants: Plant[] = [
  {
    id: '1',
    name: 'Impianto A',
    type: 'solar',
    power: 100,
    address: 'Via Roma, 1',
    city: 'Roma',
    province: 'RM',
    postalCode: '00100',
    status: 'active',
    owner: 'Mario Rossi',
    installationDate: '2023-01-01',
    createdAt: '2023-01-01',
  },
  {
    id: '2',
    name: 'Impianto B',
    type: 'wind',
    power: 200,
    address: 'Via Milano, 2',
    city: 'Milano',
    province: 'MI',
    postalCode: '20100',
    status: 'inactive',
    owner: 'Luigi Bianchi',
    installationDate: '2023-02-01',
    createdAt: '2023-02-01',
  },
  {
    id: '3',
    name: 'Impianto C',
    type: 'hydro',
    power: 300,
    address: 'Via Napoli, 3',
    city: 'Napoli',
    province: 'NA',
    postalCode: '80100',
    status: 'pending',
    owner: 'Giuseppe Verdi',
    installationDate: '2023-03-01',
    createdAt: '2023-03-01',
  },
];

export function PlantTable() {
  const [plants] = useState<Plant[]>(mockPlants);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Elenco Impianti</CardTitle>
        <CardDescription>
          Visualizza e gestisci gli impianti di produzione energetica.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Potenza (kW)</TableHead>
              <TableHead>Stato</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plants.map((plant) => (
              <TableRow key={plant.id}>
                <TableCell>
                  <Link to={`/admin/plants/${plant.id}`} className="hover:underline">
                    {plant.name}
                  </Link>
                </TableCell>
                <TableCell>{plant.type}</TableCell>
                <TableCell>{plant.power}</TableCell>
                <TableCell>
                  {plant.status === 'active' && (
                    
                    <Button
                      size="sm"
                      variant="default"
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Attivo
                    </Button>
                  )}
                  {plant.status === 'inactive' && (
                    <Badge variant="secondary">Inattivo</Badge>
                  )}
                  {plant.status === 'pending' && (
                    <Badge variant="outline">In Attesa</Badge>
                  )}
                  {plant.status === 'maintenance' && (
                    <Badge variant="destructive">Manutenzione</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Apri menù</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Azioni</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> Modifica
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="mr-2 h-4 w-4" /> Elimina
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link to={`/admin/plants/${plant.id}`} className="w-full h-full block hover:underline">
                          Visualizza Dettagli
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Link to="/admin/plants/add">
          <Button>Aggiungi Impianto</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
