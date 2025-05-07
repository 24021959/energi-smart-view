import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Plant } from '@/types/plant';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function PlantDetail() {
  const { id } = useParams<{ id: string }>();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Impianto non trovato');
      setIsLoading(false);
      return;
    }

    // Simula il caricamento dei dati
    setTimeout(() => {
      const mockPlant: Plant = {
        id: '1',
        name: 'Impianto Test',
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
      };

      setPlant(mockPlant);
      setIsLoading(false);
    }, 500);
  }, [id]);

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
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">{plant.name}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Dettagli e informazioni sull'impianto.
            </p>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">ID Impianto</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{plant.id}</dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Tipo di Impianto</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{plant.type}</dd>
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
                    >
                      Attivo
                    </Button>
                  ) : plant.status === 'inactive' ? (
                    <Button variant="outline" className="text-gray-500">Inattivo</Button>
                  ) : (
                    <Button variant="secondary">In Manutenzione</Button>
                  )}
                </dd>
              </div>
            </dl>
          </div>

          <div className="px-4 py-4 sm:px-6 flex justify-end space-x-3">
            <Link to={`/admin/plants/edit/${plant.id}`} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              <Edit className="mr-2 h-5 w-5" />
              Modifica
            </Link>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Elimina
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
