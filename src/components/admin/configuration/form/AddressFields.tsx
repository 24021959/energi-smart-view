
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { ConfigurationFormData } from "@/types/configuration";

interface AddressFieldsProps {
  control: Control<ConfigurationFormData>;
}

export function AddressFields({ control }: AddressFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Indirizzo */}
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
    </div>
  );
}
