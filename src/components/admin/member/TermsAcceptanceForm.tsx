
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from 'react-hook-form';
import { MemberFormValues } from '@/types/member';

interface TermsAcceptanceFormProps {
  control: Control<MemberFormValues>;
}

const TermsAcceptanceForm = ({ control }: TermsAcceptanceFormProps) => {
  return (
    <FormField
      control={control}
      name="termsAccepted"
      rules={{ required: 'Devi accettare i termini per procedere' }}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Accettazione termini</FormLabel>
            <FormDescription>
              Il membro ha accettato i termini e le condizioni di partecipazione alla CER.
            </FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
};

export default TermsAcceptanceForm;
