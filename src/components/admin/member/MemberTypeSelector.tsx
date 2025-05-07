
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Control } from 'react-hook-form';
import { MemberFormValues } from '@/types/member';

interface MemberTypeSelectorProps {
  control: Control<MemberFormValues>;
}

const MemberTypeSelector = ({ control }: MemberTypeSelectorProps) => {
  return (
    <FormField
      control={control}
      name="memberType"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Ruolo nella CER</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="consumer" id="consumer" />
                <Label htmlFor="consumer" className="cursor-pointer">Consumer (solo utilizzo energia)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="prosumer" id="prosumer" />
                <Label htmlFor="prosumer" className="cursor-pointer">Prosumer (produzione e utilizzo energia)</Label>
              </div>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default MemberTypeSelector;
