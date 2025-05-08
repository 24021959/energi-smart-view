
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button } from "@/components/ui/button";
import { Configuration } from "@/types/configuration";
import { LoadingState } from '@/components/admin/configuration/LoadingState';
import { NotFoundState } from '@/components/admin/configuration/NotFoundState';
import { fetchConfigurationById } from '@/services/configurationService';
import { ArrowLeft } from "lucide-react";
import { ConfigurationDetails } from '@/components/admin/configuration/detail/ConfigurationDetails';

const ConfigurationDetail = () => {
  const { id } = useParams();
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
    return <LoadingState title="Dettaglio Configurazione" />;
  }

  if (!configuration) {
    return <NotFoundState title="Dettaglio Configurazione" />;
  }

  return (
    <AdminLayout title={configuration.name}>
      <div className="container mx-auto px-4 space-y-6">
        {/* Back button */}
        <div className="mb-2">
          <Button variant="ghost" size="sm" asChild className="flex items-center gap-1">
            <Link to="/admin/configurations">
              <ArrowLeft className="h-4 w-4" />
              <span>Torna alle configurazioni</span>
            </Link>
          </Button>
        </div>
        
        <ConfigurationDetails configuration={configuration} />
      </div>
    </AdminLayout>
  );
};

export default ConfigurationDetail;
