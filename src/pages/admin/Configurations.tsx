
import { useState } from 'react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { ConfigurationList } from '@/components/admin/configuration/ConfigurationList';
import { ConfigurationType } from '@/types/configuration';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';

export default function Configurations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ConfigurationType | undefined>(undefined);

  const configurationTypes: { value: ConfigurationType; label: string }[] = [
    { value: 'cer', label: 'CER' },
    { value: 'gac', label: 'GAC' },
    { value: 'aid', label: 'AID' },
    { value: 'cs', label: 'CS' },
    { value: 'msu', label: 'MSU' },
    { value: 'edificio', label: 'Edificio' },
  ];

  const handleFilterSelect = (type: ConfigurationType | 'all') => {
    if (type === 'all') {
      setActiveFilter(undefined);
    } else {
      setActiveFilter(type);
    }
  };

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 pr-8 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">
                <Search className="h-4 w-4" />
              </span>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {activeFilter ? configurationTypes.find(t => t.value === activeFilter)?.label : 'Filtro'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={() => handleFilterSelect('all')}>
                  Tutti i tipi
                </DropdownMenuItem>
                {configurationTypes.map((type) => (
                  <DropdownMenuItem 
                    key={type.value} 
                    onClick={() => handleFilterSelect(type.value)}
                    className={activeFilter === type.value ? 'bg-muted' : ''}
                  >
                    {type.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <ConfigurationList filterType={activeFilter} />
      </div>
    </AdminLayout>
  );
}
