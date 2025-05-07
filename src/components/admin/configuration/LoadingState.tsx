
import { AdminLayout } from '@/layouts/AdminLayout';

interface LoadingStateProps {
  title: string;
  message?: string;
}

export function LoadingState({ title, message = "Caricamento in corso..." }: LoadingStateProps) {
  return (
    <AdminLayout title={title}>
      <div className="container mx-auto px-4 py-8">
        <p>{message}</p>
      </div>
    </AdminLayout>
  );
}
