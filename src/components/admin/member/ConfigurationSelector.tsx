
import React, { useState, useEffect } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from 'react-hook-form';
import { MemberFormValues } from '@/types/member';
import { Configuration } from '@/types/configuration';

// Funzione mock per ottenere le configurazioni - in un'app reale, questa chiamerebbe un API
const fetchConfigurations = async (): Promise<Configuration[]> => {
  // In un'app reale, qui ci sarebbe una chiamata API
  return [
    {
      id: "1",
      name: "CER Comune di Solarino",
      type: "cer",
      description: "Comunità energetica del comune di Solarino",
      address: "Via Roma 1",
      city: "Solarino",
      postalCode: "96010",
      province: "SR",
      participants: 15,
      status: "active",
      createdAt: "2023-01-15",
    },
    {
      id: "2",
      name: "GAC Monte Etna",
      type: "gac",
      description: "Gruppo di autoconsumo della zona Monte Etna",
      address: "Via Etnea 123",
      city: "Catania",
      postalCode: "95100",
      province: "CT",
      participants: 8,
      status: "pending",
      createdAt: "2023-03-10",
    },
    {
      id: "3",
      name: "CER Valle dei Templi",
      type: "cer",
      description: "Comunità energetica rinnovabile Valle dei Templi",
      address: "Via dei Templi 10",
      city: "Agrigento",
      postalCode: "92100",
      province: "AG",
      participants: 22,
      status: "planning",
      createdAt: "2023-05-20",
    }
  ];
};

interface ConfigurationSelectorProps {
  control: Control<MemberFormValues>;
}

const ConfigurationSelector = ({ control }: ConfigurationSelectorProps) => {
  const [configurations, setConfigurations] = useState<Configuration[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConfigurations = async () => {
      try {
        const data = await fetchConfigurations();
        setConfigurations(data);
      } catch (error) {
        console.error("Errore nel caricamento delle configurazioni:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConfigurations();
  }, []);

  return (
    <FormField
      control={control}
      name="configurationId"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Configurazione</FormLabel>
          <FormControl>
            <Select
              disabled={isLoading}
              onValueChange={field.onChange}
              value={field.value}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleziona una configurazione" />
              </SelectTrigger>
              <SelectContent>
                {configurations.map((config) => (
                  <SelectItem key={config.id} value={config.id}>
                    {config.name} ({config.type.toUpperCase()})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ConfigurationSelector;
