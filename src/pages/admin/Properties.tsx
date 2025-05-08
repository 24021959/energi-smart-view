
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Plus, Search, Filter } from 'lucide-react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { Property } from '@/types/member';

// Dati di esempio per le proprietà
const mockProperties: Property[] = [
  {
    id: 101,
    address: 'Via Roma 123',
    city: 'Roma',
    postalCode: '00100',
    province: 'RM',
    type: 'residential',
    ownerId: 2,
    consumerId: 3,
    podCode: 'IT001E98765432',
    status: 'active',
    area: 120,
    energyClass: 'B'
  },
  {
    id: 102,
    address: 'Via Milano 456',
    city: 'Milano',
    postalCode: '20100',
    province: 'MI',
    type: 'commercial',
    ownerId: 2,
    podCode: 'IT001E23456789',
    status: 'pending',
    area: 250,
    energyClass: 'C'
  },
  {
    id: 103,
    address: 'Via Napoli 789',
    city: 'Napoli',
    postalCode: '80100',
    province: 'NA',
    type: 'residential',
    ownerId: 4,
    consumerId: 1,
    podCode: 'IT001E34567890',
    status: 'active',
    area: 85,
    energyClass: 'A'
  },
  {
    id: 104,
    address: 'Via Torino 321',
    city: 'Torino',
    postalCode: '10100',
    province: 'TO',
    type: 'industrial',
    ownerId: 4,
    podCode: 'IT001E45678901',
    status: 'inactive',
    area: 500,
    energyClass: 'D'
  },
  {
    id: 105,
    address: 'Via Firenze 654',
    city: 'Firenze',
    postalCode: '50100',
    province: 'FI',
    type: 'residential',
    ownerId: 2,
    consumerId: 3,
    podCode: 'IT001E56789012',
    status: 'active',
    area: 95,
    energyClass: 'B'
  }
];

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Funzione per filtrare le proprietà
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.podCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || property.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Funzione per attivare/disattivare una proprietà
  const togglePropertyStatus = (id: number, newStatus: 'active' | 'inactive' | 'pending') => {
    setProperties(prevProperties => 
      prevProperties.map(property => 
        property.id === id 
          ? { ...property, status: newStatus } 
          : property
      )
    );
    
    toast({
      title: "Stato aggiornato",
      description: `Stato della proprietà aggiornato a: ${
        newStatus === 'active' ? 'Attivo' : 
        newStatus === 'inactive' ? 'Inattivo' : 'In attesa'
      }`,
    });
  };

  return (
    <AdminLayout title="Proprietà">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestione Proprietà</h1>
        <Button className="gap-2" asChild>
          <Link to="/admin/properties/add">
            <Plus size={18} />
            <span>Aggiungi Proprietà</span>
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Tutte le Proprietà</CardTitle>
          <CardDescription>
            Gestisci tutte le proprietà associate ai membri della comunità energetica.
          </CardDescription>
          
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca per indirizzo, città o POD..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Tipo Proprietà" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti i tipi</SelectItem>
                  <SelectItem value="residential">Residenziale</SelectItem>
                  <SelectItem value="commercial">Commerciale</SelectItem>
                  <SelectItem value="industrial">Industriale</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Stato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti gli stati</SelectItem>
                  <SelectItem value="active">Attivo</SelectItem>
                  <SelectItem value="pending">In attesa</SelectItem>
                  <SelectItem value="inactive">Inattivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Indirizzo</TableHead>
                  <TableHead>Località</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>POD</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead>Proprietario</TableHead>
                  <TableHead>Consumatore</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Home size={16} className="text-primary" />
                          <span>{property.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>{property.city} ({property.province})</TableCell>
                      <TableCell>
                        {property.type === 'residential' ? 'Residenziale' : 
                         property.type === 'commercial' ? 'Commerciale' : 'Industriale'}
                      </TableCell>
                      <TableCell>{property.podCode}</TableCell>
                      <TableCell>
                        <Badge className={
                          property.status === 'active' ? 'bg-green-600' : 
                          property.status === 'pending' ? 'bg-yellow-600' :
                          'bg-red-600'
                        }>
                          {property.status === 'active' ? 'Attivo' : 
                           property.status === 'pending' ? 'In attesa' : 'Inattivo'}
                        </Badge>
                      </TableCell>
                      <TableCell>ID: {property.ownerId}</TableCell>
                      <TableCell>
                        {property.consumerId ? `ID: ${property.consumerId}` : 'Nessuno'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/admin/properties/${property.id}`}>Dettagli</Link>
                          </Button>
                          
                          <Select
                            value={property.status}
                            onValueChange={(value: 'active' | 'inactive' | 'pending') => 
                              togglePropertyStatus(property.id, value)
                            }
                          >
                            <SelectTrigger className="h-9 w-[130px]">
                              <SelectValue placeholder="Cambia stato" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Attiva</SelectItem>
                              <SelectItem value="pending">In attesa</SelectItem>
                              <SelectItem value="inactive">Inattiva</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <p className="text-muted-foreground">Nessuna proprietà trovata</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
