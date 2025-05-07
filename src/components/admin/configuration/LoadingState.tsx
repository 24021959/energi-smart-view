
import { AdminLayout } from '@/layouts/AdminLayout';
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  title: string;
  message?: string;
}

export function LoadingState({ title, message = "Caricamento in corso..." }: LoadingStateProps) {
  return (
    <AdminLayout title={title}>
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center h-64">
        <Loader2 className="h-10 w-10 animate-spin text-purple-500 mb-4" />
        <p className="text-lg text-gray-600">{message}</p>
      </div>
    </AdminLayout>
  );
}
