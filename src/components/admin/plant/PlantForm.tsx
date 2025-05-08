
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { PlantFormData, PlantType } from '@/types/plant';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { createPlant, updatePlant } from '@/services/plantService';

// Schema di validazione per il form
const plantFormSchema = z.object({
  name: z.string().min(3, {
    message: 'Il nome deve contenere almeno 3 caratteri',
  }),
  type: z.enum(['solar', 'wind', 'hydro', 'biomass', 'geothermal'], {
    required_error: 'Seleziona il tipo di impianto',
  }),
  power: z.coerce.number().positive({
    message: 'La potenza deve essere un valore positivo',
  }),
  address: z.string().min(5, {
    message: "L'indirizzo deve contenere almeno 5 caratteri",
  }),
  city: z.string().min(2, {
    message: 'Inserisci una città valida',
  }),
  province: z.string().length(2, {
    message: 'La provincia deve essere di 2 caratteri',
  }),
  postalCode: z.string().min(5, {
    message: 'Inserisci un CAP valido',
  }),
  owner: z.string().min(3, {
    message: 'Il nome del proprietario deve contenere almeno 3 caratteri',
  }),
  installationDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Inserisci una data valida',
  }),
});

// Definire il tipo dello schema per correggere gli errori TypeScript
type PlantFormValues = z.infer<typeof plantFormSchema>;

// Opzioni per il tipo di impianto
const plantTypeOptions = [
  { value: 'solar', label: 'Fotovoltaico' },
  { value: 'wind', label: 'Eolico' },
  { value: 'hydro', label: 'Idroelettrico' },
  { value: 'biomass', label: 'Biomassa' },
  { value: 'geothermal', label: 'Geotermico' },
];

interface PlantFormProps {
  initialData?: PlantFormData;
  plantId?: string;
  mode?: 'create' | 'edit';
}

export function PlantForm({ initialData, plantId, mode = 'create' }: PlantFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = mode === 'edit';

  const form = useForm<PlantFormValues>({
    resolver: zodResolver(plantFormSchema),
    defaultValues: initialData || {
      name: '',
      type: 'solar' as PlantType,
      power: 0,
      address: '',
      city: '',
      province: '',
      postalCode: '',
      owner: '',
      installationDate: new Date().toISOString().split('T')[0],
    },
  });

  // Se arrivano nuovi dati iniziali, aggiorniamo il form
  useEffect(() => {
    if (initialData && isEditing) {
      Object.keys(initialData).forEach((key) => {
        form.setValue(key as keyof PlantFormValues, initialData[key as keyof PlantFormData] as any);
      });
    }
  }, [initialData, form, isEditing]);

  const onSubmit: SubmitHandler<PlantFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      if (isEditing && plantId) {
        // Aggiorna un impianto esistente
        await updatePlant(plantId, data);
        
        toast({
          title: 'Impianto aggiornato con successo',
          description: `L'impianto ${data.name} è stato aggiornato.`,
        });
      } else {
        // Crea un nuovo impianto
        await createPlant(data);
        
        toast({
          title: 'Impianto aggiunto con successo',
          description: `L'impianto ${data.name} è stato aggiunto.`,
        });
      }
      
      // Reindirizza alla lista impianti
      navigate('/admin/plants');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Errore',
        description: `Si è verificato un errore durante il ${isEditing ? 'aggiornamento' : 'salvataggio'}.`,
      });
      console.error('Errore nel salvataggio:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome impianto</FormLabel>
                  <FormControl>
                    <Input placeholder="Inserisci il nome dell'impianto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo impianto</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona il tipo di impianto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {plantTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="power"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Potenza (kW)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Inserisci la potenza in kW"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Inserisci la potenza in kilowatt (kW)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="installationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data installazione</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="owner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proprietario</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome del proprietario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Indirizzo</FormLabel>
                  <FormControl>
                    <Input placeholder="Via/Piazza e numero civico" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Città</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome della città" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provincia</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Sigla"
                        maxLength={2}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.toUpperCase();
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CAP</FormLabel>
                    <FormControl>
                      <Input placeholder="CAP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/plants')}
          >
            Annulla
          </Button>
          <Button 
            type="submit" 
            className="bg-purple-700 hover:bg-purple-800" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 
              (isEditing ? 'Aggiornamento...' : 'Salvataggio...') : 
              (isEditing ? 'Aggiorna Impianto' : 'Salva Impianto')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
