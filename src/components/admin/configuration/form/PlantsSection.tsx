
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { ConfigurationFormData } from "@/types/configuration";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface PlantsSectionProps {
  control: Control<ConfigurationFormData>;
}

export function PlantsSection({ control }: PlantsSectionProps) {
  const [newPlant, setNewPlant] = useState("");

  // Get the form methods from the control
  const { setValue, getValues } = control._formState.controllerRef?.current?.instance || {};

  const handleAddPlant = () => {
    if (!newPlant.trim() || !setValue || !getValues) return;
    
    const currentPlants = getValues("plants") || [];
    setValue("plants", [...currentPlants, newPlant]);
    setNewPlant("");
  };

  const handleRemovePlant = (index: number) => {
    if (!setValue || !getValues) return;
    
    const currentPlants = getValues("plants") || [];
    setValue("plants", currentPlants.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Impianti</h3>
      
      <div className="space-y-2">
        <FormField
          control={control}
          name="plants"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col space-y-2">
                {field.value?.map((plant, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input value={plant} readOnly className="flex-1" />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleRemovePlant(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {(field.value?.length || 0) === 0 && (
                  <p className="text-sm text-muted-foreground">Nessun impianto aggiunto</p>
                )}
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <div className="flex gap-2 mt-2">
          <Input
            placeholder="Aggiungi ID impianto"
            value={newPlant}
            onChange={(e) => setNewPlant(e.target.value)}
          />
          <Button type="button" onClick={handleAddPlant} variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Aggiungi
          </Button>
        </div>
      </div>
    </div>
  );
}
