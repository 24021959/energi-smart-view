
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { MemberListItem } from '@/types/member';
import MemberHeader from '@/components/admin/member/MemberHeader';
import MemberOverview from '@/components/admin/member/MemberOverview';
import MemberAddressCredentials from '@/components/admin/member/MemberAddressCredentials';
import MemberEnergyData from '@/components/admin/member/MemberEnergyData';
import MemberDocuments from '@/components/admin/member/MemberDocuments';

// Dati di esempio per singolo membro
const getMemberById = (id: number): MemberListItem | undefined => {
  const members = [
    { 
      id: 1, 
      name: 'Mario Rossi', 
      email: 'mario.rossi@example.com', 
      type: 'Domestico', 
      status: 'Attivo',
      memberType: 'consumer' as const,
      isActive: true,
    },
    { 
      id: 2, 
      name: 'Laura Bianchi', 
      email: 'laura.bianchi@example.com', 
      type: 'Commerciale', 
      status: 'Attivo',
      memberType: 'prosumer' as const,
      isActive: true,
    },
    { 
      id: 3, 
      name: 'Giuseppe Verdi', 
      email: 'giuseppe.verdi@example.com', 
      type: 'Domestico', 
      status: 'In attesa',
      memberType: 'consumer' as const,
      isActive: false,
    },
    { 
      id: 4, 
      name: 'Francesca Neri', 
      email: 'francesca.neri@example.com', 
      type: 'Industriale', 
      status: 'Attivo',
      memberType: 'prosumer' as const,
      isActive: true,
    },
    { 
      id: 5, 
      name: 'Energia Sole srl', 
      email: 'info@energiasole.it', 
      type: 'Industriale', 
      status: 'Attivo',
      memberType: 'producer' as const,
      isActive: true,
    },
  ];
  
  return members.find(m => m.id === id);
};

// Dati aggiuntivi per il membro
const getMemberDetails = (id: number) => {
  return {
    id,
    fiscalCode: 'RSSMRA80A01H501Z',
    vatNumber: id === 5 ? '12345678901' : '',
    idType: 'Carta d\'identità',
    idNumber: 'CA12345XY',
    legalAddress: 'Via Roma 123, Roma',
    supplyAddress: 'Via Roma 123, Roma',
    podCode: 'IT001E12345678',
    username: `user${id}`,
    password: 'password123',
    registrationDate: '01/01/2023',
    consumptionData: id !== 5 ? [
      { month: 'Gen', value: 120 },
      { month: 'Feb', value: 100 },
      { month: 'Mar', value: 140 },
      { month: 'Apr', value: 135 },
      { month: 'Mag', value: 160 },
      { month: 'Giu', value: 180 },
    ] : [],
    productionData: id === 2 || id === 4 || id === 5 ? [
      { month: 'Gen', value: id === 5 ? 250 : 50 },
      { month: 'Feb', value: id === 5 ? 280 : 60 },
      { month: 'Mar', value: id === 5 ? 320 : 80 },
      { month: 'Apr', value: id === 5 ? 380 : 100 },
      { month: 'Mag', value: id === 5 ? 420 : 120 },
      { month: 'Giu', value: id === 5 ? 450 : 140 },
    ] : []
  };
};

export default function MemberDetail() {
  const { id } = useParams();
  const memberId = id ? parseInt(id) : 0;
  const [member, setMember] = useState<MemberListItem | null>(null);
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    // In un'app reale, qui ci sarebbe una chiamata API
    const fetchedMember = getMemberById(memberId);
    if (fetchedMember) {
      setMember(fetchedMember);
      setDetails(getMemberDetails(memberId));
    }
  }, [memberId]);

  const toggleMemberStatus = (isActive: boolean) => {
    if (!member) return;
    
    setMember({
      ...member,
      isActive,
      status: isActive ? 'Attivo' : 'In attesa'
    });
    
    toast({
      title: isActive ? "Membro attivato" : "Membro disattivato",
      description: `${member.name} è stato ${isActive ? 'attivato' : 'disattivato'} con successo.`,
      variant: isActive ? "default" : "destructive",
    });
  };

  if (!member || !details) {
    return (
      <AdminLayout title="Dettaglio Membro">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Membro non trovato</h2>
          <p className="text-muted-foreground mb-4">Il membro richiesto non esiste o è stato rimosso.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Dettaglio: ${member.name}`}>
      <MemberHeader member={member} onToggleStatus={toggleMemberStatus} />

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Panoramica</TabsTrigger>
          <TabsTrigger value="energy">Dati Energetici</TabsTrigger>
          <TabsTrigger value="documents">Documenti</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <MemberOverview 
            personalInfo={{
              name: member.name,
              email: member.email,
              type: member.type,
              status: member.status,
              fiscalCode: details.fiscalCode,
              vatNumber: details.vatNumber,
              idType: details.idType,
              idNumber: details.idNumber,
              registrationDate: details.registrationDate
            }} 
          />

          <MemberAddressCredentials 
            addresses={{
              legalAddress: details.legalAddress,
              supplyAddress: details.supplyAddress
            }}
            credentials={{
              username: details.username
            }}
          />
        </TabsContent>

        <TabsContent value="energy">
          <MemberEnergyData 
            energyData={{
              podCode: details.podCode,
              supplyAddress: details.supplyAddress,
              hasConsumptionData: details.consumptionData.length > 0,
              hasProductionData: details.productionData.length > 0,
              memberType: member.memberType
            }}
          />
        </TabsContent>

        <TabsContent value="documents">
          <MemberDocuments 
            documentInfo={{
              idNumber: details.idNumber,
              registrationDate: details.registrationDate
            }}
          />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
