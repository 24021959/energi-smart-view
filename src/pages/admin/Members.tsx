
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { MemberListItem } from '@/types/member';
import MemberTable from '@/components/admin/member/MemberTable';
import MemberDetailsDialog from '@/components/admin/member/MemberDetailsDialog';
import MemberFilterBar, { MemberType } from '@/components/admin/member/MemberFilterBar';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState<MemberListItem[]>(membersData);
  const [selectedMember, setSelectedMember] = useState<MemberListItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [memberTypeFilter, setMemberTypeFilter] = useState<string>('all');

  // Filtra membri in base al termine di ricerca e al tipo di membro
  const filteredMembers = members.filter(
    member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            member.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = memberTypeFilter === 'all' || member.memberType === memberTypeFilter;
      
      return matchesSearch && matchesType;
    }
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
    <AdminLayout title="Membri CER">
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
          <MemberFilterBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            memberTypeFilter={memberTypeFilter}
            onFilterChange={setMemberTypeFilter}
          />
        </CardHeader>
        <CardContent>
          <MemberTable 
            members={filteredMembers} 
            onToggleStatus={toggleMemberStatus}
            onShowDetails={showMemberDetails}
          />
        </CardContent>
      </Card>

      {/* Dialog per i dettagli del membro */}
      <MemberDetailsDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        member={selectedMember}
      />
    </AdminLayout>
  );
}
