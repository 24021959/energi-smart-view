
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button } from "@/components/ui/button";
import { Configuration } from '@/types/configuration';
import { LoadingState } from '@/components/admin/configuration/LoadingState';
import { NotFoundState } from '@/components/admin/configuration/NotFoundState';
import { EditConfigurationForm } from '@/components/admin/configuration/EditConfigurationForm';
import { fetchConfigurationById } from '@/services/configurationService';
import { ArrowLeft } from "lucide-react";

const EditConfiguration = () => {
  const { id } = useParams<{id: string}>();
  const [configuration, setConfiguration] = useState<Configuration | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConfiguration = async () => {
      setIsLoading(true);
      
      try {
        if (id) {
          const configData = await fetchConfigurationById(id);
          setConfiguration(configData);
        }
      } catch (error) {
        console.error("Error loading configuration:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadConfiguration();
  }, [id]);

  if (isLoading) {
    return <LoadingState title="Modifica Configurazione" />;
  }

  if (!configuration) {
    return <NotFoundState title="Modifica Configurazione" />;
  }

  return (
    <AdminLayout title={`Modifica ${configuration.name}`}>
      <div className="container mx-auto px-4">
        {/* Back button */}
        <div className="mb-4">
          <Button variant="ghost" size="sm" asChild className="flex items-center gap-1">
            <Link to={`/admin/configurations/${id}`}>
              <ArrowLeft className="h-4 w-4" />
              <span>Torna al dettaglio configurazione</span>
            </Link>
          </Button>
        </div>
        
        <EditConfigurationForm configuration={configuration} configId={id || ''} />
      </div>
    </AdminLayout>
  );
};

export default EditConfiguration;
