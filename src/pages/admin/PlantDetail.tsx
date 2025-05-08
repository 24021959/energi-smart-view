
import { useEffect, useState } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { Plant } from '@/types/plant';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getPlantById, deletePlant } from '@/services/plantService';
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

export default function PlantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      setError('Impianto non trovato');
      setIsLoading(false);
      return;
    }

    async function loadPlant() {
      try {
        const data = await getPlantById(id);
        
        if (!data) {
          setError('Impianto non trovato');
          return;
        }
        
        setPlant(data);
      } catch (error) {
        console.error("Errore nel caricamento dell'impianto:", error);
        setError("Impossibile caricare i dettagli dell'impianto");
      } finally {
        setIsLoading(false);
      }
    }

    loadPlant();
  }, [id]);

  // Gestisce l'eliminazione di un impianto
  const handleDeletePlant = async () => {
    if (!id) return;

    try {
      const success = await deletePlant(id);
      
      if (success) {
        toast({
          title: "Impianto eliminato",
          description: `L'impianto è stato eliminato con successo.`,
        });
        
        // Reindirizza alla lista degli impianti
        navigate('/admin/plants');
      }
    } catch (error) {
      console.error("Errore nell'eliminazione dell'impianto:", error);
      toast({
        variant: "destructive",
        title: "Errore",
        description: "Impossibile eliminare l'impianto"
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Dettaglio Impianto">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-16 h-16 border-4 border-t-primary border-primary/30 rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Caricamento dettagli impianto...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error || !plant) {
    toast({
      variant: "destructive",
      title: "Impianto non trovato",
      description: "L'impianto specificato non esiste o è stato rimosso."
    });
    return <Navigate to="/admin/plants" replace />;
  }

  return (
    <AdminLayout title="Dettaglio Impianto">
      <div className="container mx-auto mt-4">
        <div className="mb-4">
          <Link to="/admin/plants" className="inline-flex items-center text-purple-600 hover:text-purple-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna alla lista impianti
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">{plant.name}</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Dettagli e informazioni sull'impianto.
              </p>
            </div>
            <div className="flex space-x-2">
              <Link to={`/admin/plants/edit/${plant.id}`}>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Edit className="h-4 w-4" />
                  Modifica
                </Button>
              </Link>
              <Button 
                variant="destructive" 
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
                Elimina
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">ID Impianto</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{plant.id}</dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Tipo di Impianto</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {plant.type === 'solar' && 'Fotovoltaico'}
                  {plant.type === 'wind' && 'Eolico'}
                  {plant.type === 'hydro' && 'Idroelettrico'}
                  {plant.type === 'biomass' && 'Biomassa'}
                  {plant.type === 'geothermal' && 'Geotermico'}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Potenza (kW)</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{plant.power} kW</dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Indirizzo</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {plant.address}, {plant.city}, {plant.province} {plant.postalCode}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Proprietario</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{plant.owner}</dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Data di Installazione</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{plant.installationDate}</dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Stato</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {plant.status === 'active' ? (
                    <Button 
                      variant="default" 
                      className="bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      Attivo
                    </Button>
                  ) : plant.status === 'inactive' ? (
                    <Button variant="outline" className="text-gray-500" size="sm">Inattivo</Button>
                  ) : plant.status === 'pending' ? (
                    <Button variant="outline" className="text-orange-500" size="sm">In Attesa</Button>
                  ) : (
                    <Button variant="secondary" size="sm">In Manutenzione</Button>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Dialog di conferma eliminazione */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Conferma eliminazione</AlertDialogTitle>
            <AlertDialogDescription>
              Sei sicuro di voler eliminare l'impianto "{plant.name}"? Questa azione non può essere annullata.
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
    </AdminLayout>
  );
}
