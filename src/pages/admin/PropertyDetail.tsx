
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Activity, Trash2, User, UserPlus } from 'lucide-react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Property } from '@/types/member';
import { toast } from '@/hooks/use-toast';

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
  }
];

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const propertyId = id ? parseInt(id) : 0;
  const [property, setProperty] = useState<Property | null>(null);

  // Simulazione del caricamento dei dati della proprietà
  useEffect(() => {
    const foundProperty = mockProperties.find(p => p.id === propertyId);
    if (foundProperty) {
      setProperty(foundProperty);
    }
  }, [propertyId]);

  if (!property) {
    return (
      <AdminLayout title="Dettaglio Proprietà">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Proprietà non trovata</h2>
          <p className="text-muted-foreground mb-4">
            La proprietà richiesta non esiste o è stata rimossa.
          </p>
          <Button asChild>
            <Link to="/admin/properties">Torna all'elenco</Link>
          </Button>
        </div>
      </AdminLayout>
    );
  }

  const handleDeleteProperty = () => {
    toast({
      title: "Funzionalità in sviluppo",
      description: "L'eliminazione delle proprietà sarà disponibile nella prossima versione."
    });
  };

  const handleAssignConsumer = () => {
    toast({
      title: "Funzionalità in sviluppo",
      description: "L'assegnazione di consumatori sarà disponibile nella prossima versione."
    });
  };

  const handleEditProperty = () => {
    toast({
      title: "Funzionalità in sviluppo",
      description: "La modifica delle proprietà sarà disponibile nella prossima versione."
    });
  };

  return (
    <AdminLayout title={`Proprietà: ${property.address}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild>
            <Link to="/admin/properties">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{property.address}</h1>
          <Badge className={
            property.status === 'active' ? 'bg-green-600' : 
            property.status === 'pending' ? 'bg-yellow-600' :
            'bg-red-600'
          }>
            {property.status === 'active' ? 'Attivo' : 
              property.status === 'pending' ? 'In attesa' : 'Inattivo'}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEditProperty}>
            <Edit className="mr-2 h-4 w-4" />
            Modifica
          </Button>
          <Button variant="destructive" onClick={handleDeleteProperty}>
            <Trash2 className="mr-2 h-4 w-4" />
            Elimina
          </Button>
        </div>
      </div>

      {/* Dettagli Proprietà */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Dettagli Proprietà</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-muted-foreground">Indirizzo</dt>
                <dd className="font-medium">{property.address}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Città</dt>
                <dd className="font-medium">{property.city}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Provincia</dt>
                <dd className="font-medium">{property.province}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Codice Postale</dt>
                <dd className="font-medium">{property.postalCode}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Tipologia</dt>
                <dd className="font-medium">
                  {property.type === 'residential' ? 'Residenziale' : 
                   property.type === 'commercial' ? 'Commerciale' : 'Industriale'}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Superficie</dt>
                <dd className="font-medium">{property.area} m²</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Classe Energetica</dt>
                <dd className="font-medium">{property.energyClass}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Codice POD</dt>
                <dd className="font-medium">{property.podCode}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ruoli</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-sm text-muted-foreground mb-2">Proprietario</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span className="font-medium">
                      ID: {property.ownerId}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/admin/members/${property.ownerId}`}>
                      Visualizza
                    </Link>
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm text-muted-foreground mb-2">Consumatore</h3>
                {property.consumerId ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      <span className="font-medium">
                        ID: {property.consumerId}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/admin/members/${property.consumerId}`}>
                        Visualizza
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Nessun consumatore associato</span>
                    <Button size="sm" onClick={handleAssignConsumer}>
                      <UserPlus className="mr-1 h-4 w-4" />
                      Assegna
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dati Energetici */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Dati Energetici
          </CardTitle>
          <CardDescription>
            Informazioni sul consumo e la produzione energetica di questa proprietà
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-muted-foreground mb-4">
              La visualizzazione dei dati energetici per questa proprietà 
              sarà disponibile nella prossima versione dell'applicazione.
            </p>
            <Button variant="outline">
              Visualizza Demo
            </Button>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
