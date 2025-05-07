
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Control, useFieldArray } from "react-hook-form";
import { ConfigurationFormData, ConfigurationMember } from "@/types/configuration";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface MembersSectionProps {
  control: Control<ConfigurationFormData>;
}

export function MembersSection({ control }: MembersSectionProps) {
  const [newMember, setNewMember] = useState<ConfigurationMember>({
    id: '',
    role: 'consumer',
    pod: '',
    quota: ''
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const handleAddMember = () => {
    if (!newMember.id.trim() || !newMember.pod.trim() || !newMember.quota.trim()) return;
    append(newMember);
    setNewMember({
      id: '',
      role: 'consumer',
      pod: '',
      quota: ''
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Membri</h3>
      
      <div className="space-y-4">
        <FormField
          control={control}
          name="members"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col space-y-2">
                {fields.map((item, index) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-4 flex items-center gap-2 justify-between">
                      <div className="flex flex-col flex-grow">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">ID: {field.value?.[index]?.id}</span>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {field.value?.[index]?.role === 'consumer' ? 'Consumatore' : 'Produttore'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          POD: {field.value?.[index]?.pod} | Quota: {field.value?.[index]?.quota}
                        </div>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                
                {(fields.length === 0) && (
                  <p className="text-sm text-muted-foreground">Nessun membro aggiunto</p>
                )}
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <Card className="p-4">
          <h4 className="text-sm font-medium mb-3">Aggiungi nuovo membro</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              placeholder="ID Membro"
              value={newMember.id}
              onChange={(e) => setNewMember({...newMember, id: e.target.value})}
            />
            <Select
              value={newMember.role}
              onValueChange={(value: 'consumer' | 'producer') => setNewMember({...newMember, role: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Ruolo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consumer">Consumatore</SelectItem>
                <SelectItem value="producer">Produttore</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="POD"
              value={newMember.pod}
              onChange={(e) => setNewMember({...newMember, pod: e.target.value})}
            />
            <Input
              placeholder="Quota (es. 25%)"
              value={newMember.quota}
              onChange={(e) => setNewMember({...newMember, quota: e.target.value})}
            />
          </div>
          <div className="mt-3 flex justify-end">
            <Button type="button" onClick={handleAddMember} variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Aggiungi
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
