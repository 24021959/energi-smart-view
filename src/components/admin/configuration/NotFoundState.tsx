
import { AdminLayout } from '@/layouts/AdminLayout';
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface NotFoundStateProps {
  title: string;
  message?: string;
}

export function NotFoundState({ title, message = "Configurazione non trovata" }: NotFoundStateProps) {
  return (
    <AdminLayout title={title}>
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center h-64">
        <AlertCircle className="h-12 w-12 text-orange-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">Configurazione non trovata</h2>
        <p className="text-lg text-gray-600 mb-6">{message}</p>
        <Link to="/admin/configurations">
          <Button>Torna alla lista</Button>
        </Link>
      </div>
    </AdminLayout>
  );
}
