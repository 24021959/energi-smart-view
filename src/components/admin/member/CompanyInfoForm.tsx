
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from 'react-hook-form';
import { MemberFormValues } from '@/types/member';

interface CompanyInfoFormProps {
  control: Control<MemberFormValues>;
  chamberOfCommerceFile: File | null;
  handleChamberDocUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompanyInfoForm = ({ 
  control, 
  chamberOfCommerceFile, 
  handleChamberDocUpload 
}: CompanyInfoFormProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="vatNumber"
          rules={{ 
            required: 'La partita IVA è obbligatoria',
            pattern: {
              value: /^[0-9]{11}$/,
              message: 'Partita IVA non valida',
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Partita IVA</FormLabel>
              <FormControl>
                <Input placeholder="12345678901" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="companyType"
          rules={{ required: 'Il tipo di società è obbligatorio' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo società</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona il tipo di società" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="spa">S.p.A.</SelectItem>
                  <SelectItem value="srl">S.r.l.</SelectItem>
                  <SelectItem value="snc">S.n.c.</SelectItem>
                  <SelectItem value="sas">S.a.s.</SelectItem>
                  <SelectItem value="ditta_individuale">Ditta individuale</SelectItem>
                  <SelectItem value="pa">Pubblica Amministrazione</SelectItem>
                  <SelectItem value="other">Altro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Caricamento visura camerale */}
      <div className="space-y-2">
        <Label htmlFor="chamberDoc">Visura camerale* (PDF)</Label>
        <div className="flex items-center gap-4">
          <Input
            id="chamberDoc"
            type="file"
            accept=".pdf"
            onChange={handleChamberDocUpload}
            className="max-w-sm"
          />
          {chamberOfCommerceFile && (
            <span className="text-sm text-green-600">
              {chamberOfCommerceFile.name} caricato
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Carica una copia della visura camerale recente (non più vecchia di 6 mesi).
        </p>
      </div>
    </>
  );
};

export default CompanyInfoForm;
