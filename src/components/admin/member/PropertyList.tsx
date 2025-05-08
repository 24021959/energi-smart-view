import { useState } from 'react';
import { Property } from '@/types/member';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Home, Plus, User, UserPlus, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PropertyListProps {
  propertyOwnerId?: number;
  memberId?: number;
}

export default function PropertyList({ propertyOwnerId, memberId }: PropertyListProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  // Determiniamo se l'utente è un proprietario o solo un consumatore
  const isOwner = !!propertyOwnerId;
  const ownerId = propertyOwnerId || memberId;
  
  // Mock delle proprietà - in un'app reale andrebbe recuperato dal server
  const properties: Property[] = isOwner 
    ? [
        {
          id: 101,
          address: 'Via Roma 123',
          city: 'Roma',
          postalCode: '00100',
          province: 'RM',
          type: 'residential',
          ownerId: ownerId || 0,
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
          ownerId: ownerId || 0,
          podCode: 'IT001E23456789',
          status: 'pending',
          area: 250,
          energyClass: 'C'
        }
      ] 
    : [];
  
  const handleAddProperty = () => {
    toast({
      title: "Funzionalità in sviluppo",
      description: "L'aggiunta di proprietà sarà disponibile nella prossima versione."
    });
    setIsAddDialogOpen(false);
  };

  const handleManageConsumer = (property: Property) => {
    setSelectedProperty(property);
    toast({
      title: "Funzionalità in sviluppo",
      description: "La gestione dei consumatori sarà disponibile nella prossima versione."
    });
  };

  const handleEditProperty = (property: Property) => {
    toast({
      title: "Funzionalità in sviluppo",
      description: "La modifica delle proprietà sarà disponibile nella prossima versione."
    });
  };

  const handleDeleteProperty = (property: Property) => {
    toast({
      title: "Funzionalità in sviluppo",
      description: "L'eliminazione delle proprietà sarà disponibile nella prossima versione."
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium mb-2">
          {isOwner ? "Proprietà possedute" : "Proprietà associate come consumatore"}
        </h3>
        {isOwner && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <Button size="sm" className="gap-1" onClick={() => setIsAddDialogOpen(true)}>
              <Plus size={16} />
              Aggiungi Proprietà
            </Button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Aggiungi Nuova Proprietà</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p>Funzionalità in fase di sviluppo.</p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Annulla
                </Button>
                <Button onClick={handleAddProperty}>Aggiungi</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {properties.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              {isOwner 
                ? "Nessuna proprietà registrata per questo membro." 
                : "Questo membro non è associato come consumatore a nessuna proprietà."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {properties.map((property) => (
            <Card key={property.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 mb-2">
                    <Home size={18} className="text-primary" />
                    <h4 className="font-medium">{property.address}</h4>
                  </div>
                  <Badge className={property.status === 'active' ? 'bg-green-600' : 'bg-orange-600'}>
                    {property.status === 'active' ? 'Attiva' : property.status === 'pending' ? 'In attesa' : 'Inattiva'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className="text-muted-foreground">Città:</span> {property.city}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Provincia:</span> {property.province}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tipo:</span> {
                      property.type === 'residential' ? 'Residenziale' :
                      property.type === 'commercial' ? 'Commerciale' : 'Industriale'
                    }
                  </div>
                  <div>
                    <span className="text-muted-foreground">POD:</span> {property.podCode}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Superficie:</span> {property.area} m²
                  </div>
                  <div>
                    <span className="text-muted-foreground">Classe Energetica:</span> {property.energyClass}
                  </div>
                </div>

                {isOwner && (
                  <div className="border-t pt-3 flex justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <User size={16} />
                      <span>
                        {property.consumerId 
                          ? "Consumatore associato" 
                          : "Nessun consumatore"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 px-2"
                        onClick={() => handleManageConsumer(property)}
                      >
                        <UserPlus size={16} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="h-8 px-2"
                        onClick={() => handleEditProperty(property)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="h-8 px-2"
                        onClick={() => handleDeleteProperty(property)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                )}

                {!isOwner && (
                  <div className="border-t pt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <User size={16} />
                    <span>Proprietario ID: {property.ownerId}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
