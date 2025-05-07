
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { ConfigurationFormData } from "@/types/configuration";

interface StatusSelectorProps {
  control: Control<ConfigurationFormData>;
}

export function StatusSelector({ control }: StatusSelectorProps) {
  return (
    <FormField
      control={control}
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
  );
}
