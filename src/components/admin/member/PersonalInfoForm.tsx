
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from 'react-hook-form';
import { MemberFormValues } from '@/types/member';

interface PersonalInfoFormProps {
  control: Control<MemberFormValues>;
  idDocumentFile: File | null;
  handleIdDocumentUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfoForm = ({ 
  control, 
  idDocumentFile, 
  handleIdDocumentUpload 
}: PersonalInfoFormProps) => {
  return (
    <>
      <FormField
        control={control}
        name="fiscalCode"
        rules={{ 
          required: 'Il codice fiscale è obbligatorio',
          pattern: {
            value: /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i,
            message: 'Codice fiscale non valido',
          }
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Codice Fiscale</FormLabel>
            <FormControl>
              <Input placeholder="RSSMRA80A01H501U" {...field} autoCapitalize="characters" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="idType"
          rules={{ required: 'Il tipo di documento è obbligatorio' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo documento</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona il tipo di documento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="identity_card">Carta d'identità</SelectItem>
                  <SelectItem value="passport">Passaporto</SelectItem>
                  <SelectItem value="driving_license">Patente di guida</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="idNumber"
          rules={{ required: 'Il numero del documento è obbligatorio' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero documento</FormLabel>
              <FormControl>
                <Input placeholder="CA12345AA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Caricamento documento d'identità */}
      <div className="space-y-2">
        <Label htmlFor="idDocument">Documento d'identità* (PDF, JPG, PNG)</Label>
        <div className="flex items-center gap-4">
          <Input
            id="idDocument"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleIdDocumentUpload}
            className="max-w-sm"
          />
          {idDocumentFile && (
            <span className="text-sm text-green-600">
              {idDocumentFile.name} caricato
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Carica una scansione/foto del documento d'identità.
        </p>
      </div>
    </>
  );
};

export default PersonalInfoForm;
