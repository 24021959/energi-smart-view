
import { AdminLayout } from '@/layouts/AdminLayout';
import { ConfigurationList } from '@/components/admin/configuration/ConfigurationList';

export default function Configurations() {
  return (
    <AdminLayout title="Configurazioni Energetiche">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-900">Lista Configurazioni Energetiche</h2>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Cerca..."
                className="px-4 py-2 pr-8 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </span>
            </div>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
              Filtro
            </button>
          </div>
        </div>
        <ConfigurationList />
      </div>
    </AdminLayout>
  );
}
