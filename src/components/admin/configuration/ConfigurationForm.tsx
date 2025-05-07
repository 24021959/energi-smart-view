
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { ConfigurationFormData, ConfigurationType, ConfigurationStatus } from '@/types/configuration';

export function ConfigurationForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ConfigurationFormData>({
    defaultValues: {
      name: '',
      type: 'CER',
      description: '',
      address: '',
      city: '',
      postalCode: '',
      status: 'planning'
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
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome Configurazione */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Configurazione</FormLabel>
                <FormControl>
                  <Input placeholder="Inserisci il nome della configurazione" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Tipo Configurazione */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CER">CER</SelectItem>
                    <SelectItem value="CECER">CECER</SelectItem>
                    <SelectItem value="test">Test</SelectItem>
                    <SelectItem value="pilota">Pilota</SelectItem>
                    <SelectItem value="monitoraggio">Monitoraggio</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* Descrizione */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrizione</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descrivi brevemente la configurazione" 
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Indirizzo */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Indirizzo</FormLabel>
                <FormControl>
                  <Input placeholder="Via e numero civico" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Città */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Città</FormLabel>
                <FormControl>
                  <Input placeholder="Città" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Codice Postale */}
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Codice Postale</FormLabel>
                <FormControl>
                  <Input placeholder="CAP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Stato */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stato</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona stato" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="planning">In Pianificazione</SelectItem>
                    <SelectItem value="pending">In Attesa</SelectItem>
                    <SelectItem value="active">Attivo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/configurations')}
          >
            Annulla
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creazione in corso...' : 'Crea Configurazione'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
