
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
  actionText?: string;
  loadingText?: string;
}

export function FormActions({ 
  isSubmitting, 
  onCancel,
  actionText = "Salva Configurazione",
  loadingText = "Creazione in corso..."
}: FormActionsProps) {
  return (
    <div className="flex justify-end space-x-4 pt-6 mt-6 border-t">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
      >
        Annulla
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? loadingText : actionText}
      </Button>
    </div>
  );
}
