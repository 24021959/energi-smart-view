
import { AdminLayout } from '@/layouts/AdminLayout';
import { ConfigurationForm } from '@/components/admin/configuration/ConfigurationForm';

export default function AddConfiguration() {
  return (
    <AdminLayout title="Aggiungi Configurazione">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-purple-900">Nuova Configurazione Energetica</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <ConfigurationForm />
        </div>
      </div>
    </AdminLayout>
  );
}
