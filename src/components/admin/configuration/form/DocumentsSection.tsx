
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
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
  
  // Create a custom field array management since we're dealing with string arrays
  const [documents, setDocuments] = useState<string[]>([]);

  const handleAddDocument = () => {
    if (!newDocument.trim()) return;
    setDocuments([...documents, newDocument]);
    setNewDocument("");
  };

  const handleRemoveDocument = (index: number) => {
    const updatedDocuments = [...documents];
    updatedDocuments.splice(index, 1);
    setDocuments(updatedDocuments);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Documenti</h3>
      
      <div className="space-y-2">
        <FormField
          control={control}
          name="documents"
          render={() => (
            <FormItem>
              <div className="flex flex-col space-y-2">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input 
                      value={doc} 
                      readOnly 
                      className="flex-1" 
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleRemoveDocument(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {(documents.length === 0) && (
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
