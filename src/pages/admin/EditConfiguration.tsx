
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AdminLayout } from '@/layouts/AdminLayout';
import { Configuration } from '@/types/configuration';
import { LoadingState } from '@/components/admin/configuration/LoadingState';
import { NotFoundState } from '@/components/admin/configuration/NotFoundState';
import { EditConfigurationForm } from '@/components/admin/configuration/EditConfigurationForm';
import { fetchConfigurationById } from '@/services/configurationService';

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
        <EditConfigurationForm configuration={configuration} configId={id || ''} />
      </div>
    </AdminLayout>
  );
};

export default EditConfiguration;
