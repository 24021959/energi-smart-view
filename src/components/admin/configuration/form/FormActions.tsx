
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

export function FormActions({ isSubmitting, onCancel }: FormActionsProps) {
  return (
    <div className="flex justify-end space-x-4 pt-4 border-t">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
      >
        Annulla
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creazione in corso...' : 'Crea Configurazione'}
      </Button>
    </div>
  );
}
