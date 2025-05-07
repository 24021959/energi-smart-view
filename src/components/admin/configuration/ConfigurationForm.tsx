
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { Configuration, ConfigurationFormData } from '@/types/configuration';
import { BasicInfoFields } from './form/BasicInfoFields';
import { AddressFields } from './form/AddressFields';
import { StatusSelector } from './form/StatusSelector';
import { FormActions } from './form/FormActions';
import { MembersSection } from './form/MembersSection';
import { PlantsSection } from './form/PlantsSection';
import { DocumentsSection } from './form/DocumentsSection';

interface ConfigurationFormProps {
  isEditing?: boolean;
  initialData?: Configuration;
  onSubmit?: (data: ConfigurationFormData) => Promise<void>;
}

export function ConfigurationForm({ 
  isEditing = false, 
  initialData,
  onSubmit
}: ConfigurationFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const defaultValues: ConfigurationFormData = {
    name: '',
    type: 'cer',
    description: '',
    address: '',
    city: '',
    postalCode: '',
    province: '',
    status: 'planning',
    startDate: '',
    plants: [],
    members: [],
    documents: []
  };
  
  const form = useForm<ConfigurationFormData>({
    defaultValues: initialData ? {
      name: initialData.name,
      type: initialData.type,
      description: initialData.description,
      address: initialData.address,
      city: initialData.city,
      postalCode: initialData.postalCode,
      province: initialData.province,
      status: initialData.status,
      startDate: initialData.startDate || '',
      plants: initialData.plants || [],
      members: initialData.members || [],
      documents: initialData.documents || []
    } : defaultValues
  });
  
  const handleFormSubmit = async (data: ConfigurationFormData) => {
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default implementation for new configuration creation
        console.log('Dati configurazione:', data);
        
        // Simuliamo un'attesa per l'invio dati
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast({
          title: "Configurazione creata",
          description: "La configurazione è stata creata con successo"
        });
        
        navigate('/admin/configurations');
      }
    } catch (error) {
      console.error('Errore durante la gestione della configurazione:', error);
      toast({
        variant: "destructive",
        title: "Errore",
        description: `Si è verificato un errore durante la ${isEditing ? 'modifica' : 'creazione'} della configurazione`
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => navigate('/admin/configurations');
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <BasicInfoFields control={form.control} />
        
        <AddressFields control={form.control} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatusSelector control={form.control} />
        </div>
        
        <PlantsSection control={form.control} />
        
        <MembersSection control={form.control} />
        
        <DocumentsSection control={form.control} />
        
        <FormActions 
          isSubmitting={isSubmitting} 
          onCancel={handleCancel}
          actionText={isEditing ? 'Aggiorna Configurazione' : 'Salva Configurazione'}
          loadingText={isEditing ? 'Aggiornamento in corso...' : 'Creazione in corso...'}
        />
      </form>
    </Form>
  );
}
