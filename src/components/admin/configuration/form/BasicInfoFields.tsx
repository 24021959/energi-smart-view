
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { ConfigurationFormData } from "@/types/configuration";
import { TypeSelector } from "./TypeSelector";

interface BasicInfoFieldsProps {
  control: Control<ConfigurationFormData>;
}

export function BasicInfoFields({ control }: BasicInfoFieldsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Informazioni di Base</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nome Configurazione */}
        <FormField
          control={control}
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
        <TypeSelector control={control} />
        
        {/* Data Inizio */}
        <FormField
          control={control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data Inizio</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      {/* Descrizione */}
      <FormField
        control={control}
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
    </div>
  );
}
