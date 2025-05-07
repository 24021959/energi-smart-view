
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { ConfigurationFormData } from '@/types/configuration';
import { BasicInfoFields } from './form/BasicInfoFields';
import { AddressFields } from './form/AddressFields';
import { StatusSelector } from './form/StatusSelector';
import { FormActions } from './form/FormActions';
import { MembersSection } from './form/MembersSection';
import { PlantsSection } from './form/PlantsSection';
import { DocumentsSection } from './form/DocumentsSection';

export function ConfigurationForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ConfigurationFormData>({
    defaultValues: {
      name: 'CER Quartiere Verde',
      type: 'cer',
      description: 'Comunità energetica per famiglie e una scuola',
      address: 'Via dei Fiori 12',
      city: 'Massa',
      postalCode: '54100',
      province: 'MS',
      status: 'planning',
      plants: ['impianto_001', 'impianto_004'],
      members: [
        { id: 'utente_001', role: 'consumer', pod: 'IT001...', quota: '25%' },
        { id: 'utente_002', role: 'producer', pod: 'IT002...', quota: '50%' }
      ],
      startDate: '2025-06-01',
      documents: ['statuto.pdf', 'mappa.jpg']
    }
  });
  
  const onSubmit = async (data: ConfigurationFormData) => {
    setIsSubmitting(true);
    
    try {
      // Qui andrebbe la logica per inviare i dati al backend
      console.log('Dati configurazione:', data);
      
      // Simuliamo un'attesa per l'invio dati
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Configurazione creata",
        description: "La configurazione è stata creata con successo"
      });
      
      navigate('/admin/configurations');
    } catch (error) {
      console.error('Errore durante la creazione della configurazione:', error);
      toast({
        variant: "destructive",
        title: "Errore",
        description: "Si è verificato un errore durante la creazione della configurazione"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => navigate('/admin/configurations');
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BasicInfoFields control={form.control} />
        
        <AddressFields control={form.control} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatusSelector control={form.control} />
        </div>
        
        <PlantsSection control={form.control} />
        
        <MembersSection control={form.control} />
        
        <DocumentsSection control={form.control} />
        
        <FormActions isSubmitting={isSubmitting} onCancel={handleCancel} />
      </form>
    </Form>
  );
}
