
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/layouts/AdminLayout';
import { PlantForm } from '@/components/admin/plant/PlantForm';
import { getPlantById } from '@/services/plantService';
import { PlantFormData } from '@/types/plant';
import { toast } from '@/hooks/use-toast';

export default function EditPlant() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<PlantFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPlantData() {
      if (!id) {
        toast({
          variant: "destructive",
          title: "Errore",
          description: "ID impianto non valido"
        });
        navigate('/admin/plants');
        return;
      }

      try {
        const plant = await getPlantById(id);
        
        if (!plant) {
          toast({
            variant: "destructive",
            title: "Impianto non trovato",
            description: "L'impianto richiesto non esiste"
          });
          navigate('/admin/plants');
          return;
        }

        // Prepara i dati iniziali per il form
        const formData: PlantFormData = {
          name: plant.name,
          type: plant.type,
          power: plant.power,
          address: plant.address,
          city: plant.city,
          province: plant.province,
          postalCode: plant.postalCode,
          owner: plant.owner,
          installationDate: plant.installationDate
        };
        
        setInitialData(formData);
      } catch (error) {
        console.error("Errore nel caricamento dati:", error);
        toast({
          variant: "destructive",
          title: "Errore",
          description: "Impossibile caricare i dati dell'impianto"
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadPlantData();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <AdminLayout title="Modifica Impianto">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-16 h-16 border-4 border-t-primary border-primary/30 rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Caricamento dati impianto...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Modifica Impianto">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-purple-900">Modifica Impianto</h2>
        <div className="bg-white rounded-lg shadow p-6">
          {initialData && (
            <PlantForm 
              initialData={initialData} 
              plantId={id} 
              mode="edit" 
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
