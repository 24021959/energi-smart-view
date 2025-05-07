
import { AdminLayout } from '@/layouts/AdminLayout';

interface NotFoundStateProps {
  title: string;
  message?: string;
}

export function NotFoundState({ title, message = "Configurazione non trovata" }: NotFoundStateProps) {
  return (
    <AdminLayout title={title}>
      <div className="container mx-auto px-4 py-8">
        <p>{message}</p>
      </div>
    </AdminLayout>
  );
}
