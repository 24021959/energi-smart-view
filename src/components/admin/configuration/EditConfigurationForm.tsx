
import { useState } from 'react';
import { ConfigurationForm } from '@/components/admin/configuration/ConfigurationForm';
import { Configuration, ConfigurationFormData } from '@/types/configuration';
import { updateConfiguration } from '@/services/configurationService';
import { useNavigate } from 'react-router-dom';

interface EditConfigurationFormProps {
  configuration: Configuration;
  configId: string;
}

export function EditConfigurationForm({ configuration, configId }: EditConfigurationFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateConfiguration = async (formData: ConfigurationFormData) => {
    setIsSubmitting(true);
    
    try {
      await updateConfiguration(configId, formData);
      navigate(`/admin/configurations/${configId}`);
    } catch (error) {
      // Error is already handled in the service
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-purple-900">Modifica Configurazione</h1>
      <p className="text-gray-500">Aggiorna i dettagli della configurazione energetica</p>
      
      <div className="mt-6">
        <ConfigurationForm 
          isEditing={true} 
          initialData={configuration} 
          onSubmit={handleUpdateConfiguration} 
        />
      </div>
    </div>
  );
}
