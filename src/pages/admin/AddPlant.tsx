
import { AdminLayout } from '@/layouts/AdminLayout';
import { PlantForm } from '@/components/admin/plant/PlantForm';

export default function AddPlant() {
  return (
    <AdminLayout title="Aggiungi Impianto">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-purple-900">Nuovo Impianto CER</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <PlantForm />
        </div>
      </div>
    </AdminLayout>
  );
}
