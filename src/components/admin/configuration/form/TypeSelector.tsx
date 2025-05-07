
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { ConfigurationFormData } from "@/types/configuration";

interface TypeSelectorProps {
  control: Control<ConfigurationFormData>;
}

export function TypeSelector({ control }: TypeSelectorProps) {
  return (
    <FormField
      control={control}
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
              <SelectItem value="cer">CER</SelectItem>
              <SelectItem value="gac">GAC</SelectItem>
              <SelectItem value="aid">AID</SelectItem>
              <SelectItem value="cs">CS</SelectItem>
              <SelectItem value="msu">MSU</SelectItem>
              <SelectItem value="edificio">Edificio</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
