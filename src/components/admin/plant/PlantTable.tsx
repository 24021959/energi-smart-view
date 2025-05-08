
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plant } from '@/types/plant';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { MoreVertical, Edit, Trash2, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from '@/hooks/use-toast';
import { getPlants, deletePlant } from '@/services/plantService';

export function PlantTable() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean, plantId: string | null, plantName: string }>({
    isOpen: false,
    plantId: null,
    plantName: ''
  });

  // Carica gli impianti all'avvio del componente
  useEffect(() => {
    async function loadPlants() {
      try {
        const data = await getPlants();
        setPlants(data);
      } catch (error) {
        console.error("Errore nel caricamento impianti:", error);
        toast({
          variant: "destructive",
          title: "Errore",
          description: "Impossibile caricare l'elenco degli impianti"
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadPlants();
  }, []);

  // Gestisce l'eliminazione di un impianto
  const handleDeletePlant = async () => {
    if (!deleteDialog.plantId) return;

    try {
      const success = await deletePlant(deleteDialog.plantId);
      
      if (success) {
        // Aggiorna l'elenco degli impianti rimuovendo quello eliminato
        setPlants(plants.filter(plant => plant.id !== deleteDialog.plantId));
        
        toast({
          title: "Impianto eliminato",
          description: `L'impianto è stato eliminato con successo.`,
        });
      }
    } catch (error) {
      console.error("Errore nell'eliminazione dell'impianto:", error);
      toast({
        variant: "destructive",
        title: "Errore",
        description: "Impossibile eliminare l'impianto"
      });
    } finally {
      // Chiudi il dialog di conferma
      setDeleteDialog({ isOpen: false, plantId: null, plantName: '' });
    }
  };

  // Apre il dialog di conferma per l'eliminazione
  const openDeleteDialog = (plantId: string, plantName: string) => {
    setDeleteDialog({
      isOpen: true,
      plantId,
      plantName
    });
  };

  // Mostra un indicatore di caricamento
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Elenco Impianti</CardTitle>
          <CardDescription>
            Caricamento impianti in corso...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-10">
          <div className="w-10 h-10 border-4 border-t-primary border-primary/30 rounded-full animate-spin"></div>
        </CardContent>
      </Card>
    );
  }

  // Funzione per ottenere il badge corretto in base allo stato
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Button
            size="sm"
            variant="default"
            className="bg-green-500 hover:bg-green-600"
          >
            Attivo
          </Button>
        );
      case 'inactive':
        return <Badge variant="secondary">Inattivo</Badge>;
      case 'pending':
        return <Badge variant="outline">In Attesa</Badge>;
      case 'maintenance':
        return <Badge variant="destructive">Manutenzione</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Elenco Impianti</CardTitle>
        <CardDescription>
          Visualizza e gestisci gli impianti di produzione energetica.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {plants.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground mb-4">Nessun impianto trovato</p>
            <Link to="/admin/plants/add">
              <Button className="gap-2">
                <Plus size={16} />
                Aggiungi il tuo primo impianto
              </Button>
            </Link>
          </div>
        ) : (
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
                    {getStatusBadge(plant.status)}
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
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/plants/edit/${plant.id}`} className="flex cursor-pointer items-center">
                            <Edit className="mr-2 h-4 w-4" /> Modifica
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="flex cursor-pointer items-center text-destructive"
                          onClick={() => openDeleteDialog(plant.id, plant.name)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Elimina
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/plants/${plant.id}`} className="flex cursor-pointer items-center">
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
        )}
      </CardContent>
      <CardFooter>
        <Link to="/admin/plants/add">
          <Button className="gap-2">
            <Plus size={16} />
            Aggiungi Impianto
          </Button>
        </Link>
      </CardFooter>

      {/* Dialog di conferma eliminazione */}
      <AlertDialog open={deleteDialog.isOpen} onOpenChange={(open) => !open && setDeleteDialog(prev => ({ ...prev, isOpen: false }))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Conferma eliminazione</AlertDialogTitle>
            <AlertDialogDescription>
              Sei sicuro di voler eliminare l'impianto "{deleteDialog.plantName}"? Questa azione non può essere annullata.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeletePlant}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Elimina
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
