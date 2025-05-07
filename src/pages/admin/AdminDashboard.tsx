
import { AdminOverview } from '@/components/admin/AdminOverview';
import { AdminLayout } from '@/layouts/AdminLayout';

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard Gestore CER">
      <AdminOverview />
    </AdminLayout>
  );
}
