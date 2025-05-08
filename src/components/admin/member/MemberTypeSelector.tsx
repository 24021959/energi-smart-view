
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { MemberFormValues } from '@/types/member';
import { ZapOff, Zap, Battery } from 'lucide-react';

interface MemberTypeSelectorProps {
  control: Control<MemberFormValues>;
}

export default function MemberTypeSelector({ control }: MemberTypeSelectorProps) {
  return (
    <div className="border rounded-md p-4">
      <h3 className="text-lg font-medium mb-4">Ruolo nella CER</h3>
      
      <FormField
        control={control}
        name="memberType"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className={`border rounded-md p-4 relative ${field.value === 'consumer' ? 'bg-blue-50 border-blue-200' : ''}`}>
                  <RadioGroupItem
                    value="consumer"
                    id="consumer"
                    className="absolute right-4 top-4"
                  />
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-2">
                        <ZapOff size={18} />
                      </div>
                      <Label htmlFor="consumer" className="text-lg font-medium">Consumer</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Membro che consuma energia elettrica dalla Comunità
                    </p>
                    <ul className="text-sm mt-4 space-y-1 text-muted-foreground list-disc list-inside">
                      <li>Può associarsi a proprietà come consumatore</li>
                      <li>Non possiede impianti di produzione</li>
                      <li>Riceve benefici economici dalla CER</li>
                    </ul>
                  </div>
                </div>
                
                <div className={`border rounded-md p-4 relative ${field.value === 'producer' ? 'bg-green-50 border-green-200' : ''}`}>
                  <RadioGroupItem
                    value="producer"
                    id="producer"
                    className="absolute right-4 top-4"
                  />
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-2">
                        <Battery size={18} />
                      </div>
                      <Label htmlFor="producer" className="text-lg font-medium">Producer</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Membro che produce energia elettrica per la Comunità
                    </p>
                    <ul className="text-sm mt-4 space-y-1 text-muted-foreground list-disc list-inside">
                      <li>Gestisce impianti di produzione</li>
                      <li>Non consuma energia della CER</li>
                      <li>Contribuisce all'energia condivisa</li>
                    </ul>
                  </div>
                </div>
                
                <div className={`border rounded-md p-4 relative ${field.value === 'prosumer' ? 'bg-purple-50 border-purple-200' : ''}`}>
                  <RadioGroupItem
                    value="prosumer"
                    id="prosumer"
                    className="absolute right-4 top-4"
                  />
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mr-2">
                        <Zap size={18} />
                      </div>
                      <Label htmlFor="prosumer" className="text-lg font-medium">Prosumer</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Membro che produce e consuma energia elettrica
                    </p>
                    <ul className="text-sm mt-4 space-y-1 text-muted-foreground list-disc list-inside">
                      <li>Possiede proprietà e impianti</li>
                      <li>Gestisce consumatori associati</li>
                      <li>Ottimizza l'autoconsumo energetico</li>
                    </ul>
                  </div>
                </div>
              </RadioGroup>
            </FormControl>
            <FormDescription className="mt-2">
              La scelta del ruolo determina come il membro parteciperà alla Comunità Energetica.
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
}
