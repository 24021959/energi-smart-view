
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from 'react-hook-form';
import { MemberFormValues } from '@/types/member';

interface GeneralInfoFormProps {
  control: Control<MemberFormValues>;
  entityType: 'person' | 'company';
}

const GeneralInfoForm = ({ control, entityType }: GeneralInfoFormProps) => {
  return (
    <>
      <FormField
        control={control}
        name="name"
        rules={{ required: entityType === 'person' ? 'Il nome è obbligatorio' : 'La ragione sociale è obbligatoria' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{entityType === 'person' ? 'Nome e cognome' : 'Ragione sociale'}</FormLabel>
            <FormControl>
              <Input 
                placeholder={entityType === 'person' ? "Mario Rossi" : "Nome Azienda S.p.A."} 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="email"
          rules={{ 
            required: 'L\'email è obbligatoria',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Indirizzo email non valido',
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="esempio@dominio.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phone"
          rules={{ 
            required: 'Il numero di telefono è obbligatorio',
            pattern: {
              value: /^[0-9+\s]+$/,
              message: 'Numero di telefono non valido',
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefono</FormLabel>
              <FormControl>
                <Input placeholder="+39 123 456 7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default GeneralInfoForm;
