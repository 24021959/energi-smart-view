
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Control, useFieldArray } from "react-hook-form";
import { ConfigurationFormData } from "@/types/configuration";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface DocumentsSectionProps {
  control: Control<ConfigurationFormData>;
}

export function DocumentsSection({ control }: DocumentsSectionProps) {
  const [newDocument, setNewDocument] = useState("");
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents",
  });

  const handleAddDocument = () => {
    if (!newDocument.trim()) return;
    append(newDocument);
    setNewDocument("");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Documenti</h3>
      
      <div className="space-y-2">
        <FormField
          control={control}
          name="documents"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col space-y-2">
                {fields.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <Input 
                      value={field.value?.[index] || ''} 
                      readOnly 
                      className="flex-1" 
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {(fields.length === 0) && (
                  <p className="text-sm text-muted-foreground">Nessun documento aggiunto</p>
                )}
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <div className="flex gap-2 mt-2">
          <Input
            placeholder="Nome documento (es. statuto.pdf)"
            value={newDocument}
            onChange={(e) => setNewDocument(e.target.value)}
          />
          <Button type="button" onClick={handleAddDocument} variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Aggiungi
          </Button>
        </div>
      </div>
    </div>
  );
}
