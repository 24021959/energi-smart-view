
import { AdminLayout } from '@/layouts/AdminLayout';
import { PlantTable } from '@/components/admin/plant/PlantTable';

export default function Plants() {
  return (
    <AdminLayout title="Impianti CER">
      <PlantTable />
    </AdminLayout>
  );
}
