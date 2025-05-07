
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Control, UseFormResetField } from 'react-hook-form';
import { MemberFormValues } from '@/types/member';

interface EntityTypeSelectorProps {
  control: Control<MemberFormValues>;
  resetField: UseFormResetField<MemberFormValues>;
  setIdDocumentFile: React.Dispatch<React.SetStateAction<File | null>>;
  setChamberOfCommerceFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const EntityTypeSelector = ({ 
  control, 
  resetField, 
  setIdDocumentFile, 
  setChamberOfCommerceFile 
}: EntityTypeSelectorProps) => {
  return (
    <FormField
      control={control}
      name="entityType"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Tipo di soggetto</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                // Reset dei campi non necessari quando cambia il tipo di entità
                if (value === 'person') {
                  resetField('vatNumber');
                  resetField('companyType');
                  setChamberOfCommerceFile(null);
                } else {
                  resetField('fiscalCode');
                  resetField('idType');
                  resetField('idNumber');
                  setIdDocumentFile(null);
                }
              }}
              defaultValue={field.value}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="person" id="person" />
                <Label htmlFor="person" className="cursor-pointer">Persona fisica</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company" id="company" />
                <Label htmlFor="company" className="cursor-pointer">Azienda/Ente</Label>
              </div>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default EntityTypeSelector;
