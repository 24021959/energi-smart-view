
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useAuth } from '@/hooks/useAuthContext';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { UserPlus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Dati di esempio
const membersData = [
  { id: 1, name: 'Mario Rossi', email: 'mario.rossi@example.com', type: 'Domestico', status: 'Attivo' },
  { id: 2, name: 'Laura Bianchi', email: 'laura.bianchi@example.com', type: 'Commerciale', status: 'Attivo' },
  { id: 3, name: 'Giuseppe Verdi', email: 'giuseppe.verdi@example.com', type: 'Domestico', status: 'In attesa' },
  { id: 4, name: 'Francesca Neri', email: 'francesca.neri@example.com', type: 'Industriale', status: 'Attivo' },
];

export default function Members() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { authState } = useAuth();
  const { user } = authState;
  const [searchTerm, setSearchTerm] = useState('');

  // Filtra membri in base al termine di ricerca
  const filteredMembers = membersData.filter(
    member => member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
              member.email.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-2xl font-bold">Membri CER</h1>
            <Button className="gap-2">
              <UserPlus size={18} />
              <span>Aggiungi Membro</span>
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Gestione Membri</CardTitle>
              <CardDescription>
                Gestisci tutti i membri della comunità energetica rinnovabile.
              </CardDescription>
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cerca membri..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead>Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.type}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          member.status === 'Attivo' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {member.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Dettagli</Button>
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
