
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { ConfigurationFormData, ConfigurationMember } from "@/types/configuration";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface MembersSectionProps {
  control: Control<ConfigurationFormData>;
}

export function MembersSection({ control }: MembersSectionProps) {
  const [newMember, setNewMember] = useState<ConfigurationMember>({
    id: "",
    role: "consumer",
    pod: "",
    quota: ""
  });

  // Get the form methods from the control
  const { setValue, getValues } = control._formState.controllerRef?.current?.instance || {};

  const handleAddMember = () => {
    if (!newMember.id.trim() || !newMember.pod.trim() || !setValue || !getValues) return;
    
    const currentMembers = getValues("members") || [];
    setValue("members", [...currentMembers, newMember]);
    setNewMember({ id: "", role: "consumer", pod: "", quota: "" });
  };

  const handleRemoveMember = (index: number) => {
    if (!setValue || !getValues) return;
    
    const currentMembers = getValues("members") || [];
    setValue("members", currentMembers.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Membri</h3>
      
      <div className="space-y-2">
        <FormField
          control={control}
          name="members"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-2">
                {field.value?.map((member, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-2 p-3 border rounded-md">
                    <div className="flex-1">
                      <p className="text-sm font-medium">ID: {member.id}</p>
                      <p className="text-sm">Ruolo: {member.role === "consumer" ? "Consumatore" : "Produttore"}</p>
                      <p className="text-sm">POD: {member.pod}</p>
                      <p className="text-sm">Quota: {member.quota}</p>
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleRemoveMember(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {(field.value?.length || 0) === 0 && (
                  <p className="text-sm text-muted-foreground">Nessun membro aggiunto</p>
                )}
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
          <Input
            placeholder="ID Utente"
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
        
        <Button type="button" onClick={handleAddMember} variant="outline" className="mt-2">
          <Plus className="h-4 w-4 mr-1" />
          Aggiungi Membro
        </Button>
      </div>
    </div>
  );
}
