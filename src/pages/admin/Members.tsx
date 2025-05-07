
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useAuth } from '@/hooks/useAuthContext';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { UserPlus, Search, Zap, ZapOff, Eye, Check, X, Battery } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { MemberListItem } from '@/types/member';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Dati di esempio aggiornati con il tipo di membro CER
const membersData: MemberListItem[] = [
  { 
    id: 1, 
    name: 'Mario Rossi', 
    email: 'mario.rossi@example.com', 
    type: 'Domestico', 
    status: 'Attivo',
    memberType: 'consumer', // consumatore di energia
    isActive: true
  },
  { 
    id: 2, 
    name: 'Laura Bianchi', 
    email: 'laura.bianchi@example.com', 
    type: 'Commerciale', 
    status: 'Attivo',
    memberType: 'prosumer', // produttore e consumatore
    isActive: true
  },
  { 
    id: 3, 
    name: 'Giuseppe Verdi', 
    email: 'giuseppe.verdi@example.com', 
    type: 'Domestico', 
    status: 'In attesa',
    memberType: 'consumer',
    isActive: false
  },
  { 
    id: 4, 
    name: 'Francesca Neri', 
    email: 'francesca.neri@example.com', 
    type: 'Industriale', 
    status: 'Attivo',
    memberType: 'prosumer',
    isActive: true
  },
  { 
    id: 5, 
    name: 'Energia Sole srl', 
    email: 'info@energiasole.it', 
    type: 'Industriale', 
    status: 'Attivo',
    memberType: 'producer', // solo produttore
    isActive: true
  },
];

export default function Members() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { authState } = useAuth();
  const { user } = authState;
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState<MemberListItem[]>(membersData);
  const [selectedMember, setSelectedMember] = useState<MemberListItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filtra membri in base al termine di ricerca
  const filteredMembers = members.filter(
    member => member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
              member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Funzione per attivare/disattivare un membro
  const toggleMemberStatus = (id: number, isActive: boolean) => {
    setMembers(prevMembers => 
      prevMembers.map(member => 
        member.id === id 
          ? { 
              ...member, 
              isActive,
              status: isActive ? 'Attivo' : 'In attesa'
            } 
          : member
      )
    );
    
    // Mostra notifica di conferma
    const member = members.find(m => m.id === id);
    if (member) {
      toast({
        title: isActive ? "Membro attivato" : "Membro disattivato",
        description: `${member.name} è stato ${isActive ? 'attivato' : 'disattivato'} con successo.`,
        variant: isActive ? "default" : "destructive",
      });
    }
  };

  // Funzione per visualizzare i dettagli di un membro
  const showMemberDetails = (member: MemberListItem) => {
    setSelectedMember(member);
    setIsDialogOpen(true);
  };

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
            <Button className="gap-2" asChild>
              <Link to="/admin/members/add">
                <UserPlus size={18} />
                <span>Aggiungi Membro</span>
              </Link>
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
                    <TableHead>Ruolo CER</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead>Attivo</TableHead>
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
                        {member.memberType === 'prosumer' ? (
                          <Badge className="bg-purple-600 hover:bg-purple-700 flex w-fit gap-1 items-center">
                            <Zap size={14} />
                            Prosumer
                          </Badge>
                        ) : member.memberType === 'producer' ? (
                          <Badge className="bg-green-600 hover:bg-green-700 flex w-fit gap-1 items-center">
                            <Battery size={14} />
                            Producer
                          </Badge>
                        ) : (
                          <Badge className="bg-blue-600 hover:bg-blue-700 flex w-fit gap-1 items-center">
                            <ZapOff size={14} />
                            Consumer
                          </Badge>
                        )}
                      </TableCell>
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
                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={member.isActive} 
                            onCheckedChange={(checked) => toggleMemberStatus(member.id, checked)}
                          />
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <span>{member.isActive ? 
                                <Check size={18} className="text-green-500" /> : 
                                <X size={18} className="text-red-500" />}
                              </span>
                            </HoverCardTrigger>
                            <HoverCardContent>
                              {member.isActive ? 
                                "Membro attivo: può accedere al sistema" : 
                                "Membro disattivato: non può accedere al sistema"}
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => showMemberDetails(member)}>
                            <Eye size={16} className="mr-1" />
                            Dettagli
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            asChild
                          >
                            <Link to={`/admin/members/${member.id}`}>
                              Scheda
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Dialog per i dettagli del membro */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Dettagli Membro</DialogTitle>
            <DialogDescription>
              Informazioni sul membro selezionato
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Nome:</div>
                <div>{selectedMember.name}</div>
                
                <div className="font-semibold">Email:</div>
                <div>{selectedMember.email}</div>
                
                <div className="font-semibold">Tipo:</div>
                <div>{selectedMember.type}</div>
                
                <div className="font-semibold">Ruolo CER:</div>
                <div>
                  {selectedMember.memberType === 'prosumer' ? 'Prosumer' : 
                   selectedMember.memberType === 'producer' ? 'Producer' : 'Consumer'}
                </div>
                
                <div className="font-semibold">Stato:</div>
                <div>{selectedMember.status}</div>
                
                <div className="font-semibold">Attivo:</div>
                <div>{selectedMember.isActive ? 'Sì' : 'No'}</div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Chiudi
                </Button>
                <Button 
                  asChild
                >
                  <Link to={`/admin/members/${selectedMember.id}`}>
                    Vai alla Scheda
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
