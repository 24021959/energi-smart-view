
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useAuth } from '@/hooks/useAuthContext';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Dati di esempio per i report
const reportsData = [
  { 
    id: 1, 
    name: 'Report Mensile - Aprile 2025', 
    type: 'Mensile',
    date: '01/05/2025',
    status: 'Completo' 
  },
  { 
    id: 2, 
    name: 'Report Trimestrale - Q1 2025', 
    type: 'Trimestrale',
    date: '15/04/2025',
    status: 'Completo' 
  },
  { 
    id: 3, 
    name: 'Report GSE - Marzo 2025', 
    type: 'GSE',
    date: '10/04/2025',
    status: 'Completo' 
  },
  { 
    id: 4, 
    name: 'Report Mensile - Maggio 2025', 
    type: 'Mensile',
    date: '-',
    status: 'In elaborazione' 
  },
];

export default function Reports() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { authState } = useAuth();
  const { user } = authState;
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Filtra report in base ai criteri
  const filteredReports = reportsData.filter(
    report => {
      // Filtra per termine di ricerca
      const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtra per tipo
      const matchesType = filterType === 'all' || report.type === filterType;
      
      return matchesSearch && matchesType;
    }
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Area principale */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Report</h1>
            <Button className="gap-2">
              <Download size={18} />
              <span>Genera Report</span>
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Report Disponibili</CardTitle>
              <CardDescription>
                Visualizza e scarica i report della comunità energetica rinnovabile.
              </CardDescription>
              <div className="grid gap-4 mt-4 sm:grid-cols-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cerca report..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtra per tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti i tipi</SelectItem>
                    <SelectItem value="Mensile">Mensile</SelectItem>
                    <SelectItem value="Trimestrale">Trimestrale</SelectItem>
                    <SelectItem value="GSE">GSE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome Report</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead>Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          report.status === 'Completo' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {report.status === 'Completo' ? (
                          <Button variant="outline" size="sm" className="gap-1">
                            <Download size={14} />
                            <span>Scarica</span>
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" disabled className="gap-1">
                            <Download size={14} />
                            <span>Scarica</span>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
