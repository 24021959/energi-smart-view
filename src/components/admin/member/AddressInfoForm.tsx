
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Control, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { MemberFormValues } from '@/types/member';

interface AddressInfoFormProps {
  control: Control<MemberFormValues>;
  watch: UseFormWatch<MemberFormValues>;
  setValue: UseFormSetValue<MemberFormValues>;
  entityType: 'person' | 'company';
}

const AddressInfoForm = ({ 
  control, 
  watch, 
  setValue,
  entityType 
}: AddressInfoFormProps) => {
  const sameAddressValue = watch("sameAddress");

  return (
    <>
      <FormField
        control={control}
        name="legalAddress"
        rules={{ required: entityType === 'person' ? 'L\'indirizzo di residenza è obbligatorio' : 'L\'indirizzo della sede legale è obbligatorio' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {entityType === 'person' ? 'Indirizzo di residenza' : 'Sede legale'}
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Via/Piazza, numero civico, CAP, Città, Provincia" 
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  // Se gli indirizzi sono gli stessi, aggiorna anche l'indirizzo di fornitura
                  if (sameAddressValue) {
                    setValue("supplyAddress", e.target.value);
                  }
                }} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="sameAddress"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                L'indirizzo di fornitura coincide con {entityType === 'person' ? 'la residenza' : 'la sede legale'}
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
      
      {!sameAddressValue && (
        <FormField
          control={control}
          name="supplyAddress"
          rules={{ required: 'L\'indirizzo di fornitura è obbligatorio' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Indirizzo di fornitura elettrica</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Via/Piazza, numero civico, CAP, Città, Provincia" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      
      <FormField
        control={control}
        name="podCode"
        rules={{ 
          required: 'Il codice POD è obbligatorio',
          pattern: {
            value: /^IT\d{3}E\d{8}$/,
            message: 'Formato POD non valido (es. IT001E12345678)'
          }
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Codice POD</FormLabel>
            <FormControl>
              <Input placeholder="IT001E12345678" {...field} />
            </FormControl>
            <FormDescription>
              Il codice identificativo del punto di prelievo dell'energia elettrica (si trova sulla bolletta).
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AddressInfoForm;
