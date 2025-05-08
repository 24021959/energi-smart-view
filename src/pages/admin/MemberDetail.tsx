
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { MemberListItem, Property, MemberDetailData } from '@/types/member';
import MemberHeader from '@/components/admin/member/MemberHeader';
import MemberOverview from '@/components/admin/member/MemberOverview';
import MemberAddressCredentials from '@/components/admin/member/MemberAddressCredentials';
import MemberEnergyData from '@/components/admin/member/MemberEnergyData';
import MemberDocuments from '@/components/admin/member/MemberDocuments';
import PropertyList from '@/components/admin/member/PropertyList';

// Mock di proprietà per test
const mockProperties: Property[] = [
  {
    id: 101,
    address: 'Via Roma 123',
    city: 'Roma',
    postalCode: '00100',
    province: 'RM',
    type: 'residential',
    ownerId: 2,
    consumerId: 3,
    podCode: 'IT001E98765432',
    status: 'active',
    area: 120,
    energyClass: 'B'
  },
  {
    id: 102,
    address: 'Via Milano 456',
    city: 'Milano',
    postalCode: '20100',
    province: 'MI',
    type: 'commercial',
    ownerId: 2,
    podCode: 'IT001E23456789',
    status: 'pending',
    area: 250,
    energyClass: 'C'
  },
  {
    id: 103,
    address: 'Via Napoli 789',
    city: 'Napoli',
    postalCode: '80100',
    province: 'NA',
    type: 'residential',
    ownerId: 4,
    consumerId: 1,
    podCode: 'IT001E34567890',
    status: 'active',
    area: 85,
    energyClass: 'A'
  }
];

// Dati di esempio per singolo membro
const getMemberById = (id: number): MemberDetailData | undefined => {
  const members = [
    { 
      id: 1, 
      name: 'Mario Rossi', 
      email: 'mario.rossi@example.com', 
      phone: '333-1234567',
      fiscalCode: 'RSSMRA80A01H501Z',
      type: 'Domestico', 
      status: 'Attivo',
      memberType: 'consumer' as const,
      isActive: true,
      registrationDate: '01/01/2023',
      properties: mockProperties.filter(p => p.consumerId === 1)
    },
    { 
      id: 2, 
      name: 'Laura Bianchi', 
      email: 'laura.bianchi@example.com',
      phone: '333-7654321',
      fiscalCode: 'BNCLRA75M41H501Y',
      type: 'Commerciale', 
      status: 'Attivo',
      memberType: 'prosumer' as const,
      isActive: true,
      registrationDate: '15/02/2023',
      properties: mockProperties.filter(p => p.ownerId === 2)
    },
    { 
      id: 3, 
      name: 'Giuseppe Verdi', 
      email: 'giuseppe.verdi@example.com',
      phone: '333-9876543',
      fiscalCode: 'VRDGPP82L30H501X',
      type: 'Domestico', 
      status: 'In attesa',
      memberType: 'consumer' as const,
      isActive: false,
      registrationDate: '10/03/2023',
      properties: mockProperties.filter(p => p.consumerId === 3)
    },
    { 
      id: 4, 
      name: 'Francesca Neri', 
      email: 'francesca.neri@example.com',
      phone: '333-5432198',
      fiscalCode: 'NREFNC78P44H501W',
      type: 'Industriale', 
      status: 'Attivo',
      memberType: 'prosumer' as const,
      isActive: true,
      registrationDate: '05/04/2023',
      properties: mockProperties.filter(p => p.ownerId === 4)
    },
    { 
      id: 5, 
      name: 'Energia Sole srl', 
      email: 'info@energiasole.it',
      phone: '06-12345678',
      vatNumber: '12345678901',
      type: 'Industriale', 
      status: 'Attivo',
      memberType: 'producer' as const,
      isActive: true,
      registrationDate: '20/05/2023',
      properties: []
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
  const [memberDetail, setMemberDetail] = useState<MemberDetailData | null>(null);
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    // In un'app reale, qui ci sarebbe una chiamata API
    const fetchedMember = getMemberById(memberId);
    if (fetchedMember) {
      setMemberDetail(fetchedMember);
      setDetails(getMemberDetails(memberId));
    }
  }, [memberId]);

  const toggleMemberStatus = (isActive: boolean) => {
    if (!memberDetail) return;
    
    setMemberDetail({
      ...memberDetail,
      isActive,
      status: isActive ? 'Attivo' : 'In attesa'
    });
    
    toast({
      title: isActive ? "Membro attivato" : "Membro disattivato",
      description: `${memberDetail.name} è stato ${isActive ? 'attivato' : 'disattivato'} con successo.`,
      variant: isActive ? "default" : "destructive",
    });
  };

  if (!memberDetail || !details) {
    return (
      <AdminLayout title="Dettaglio Membro">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Membro non trovato</h2>
          <p className="text-muted-foreground mb-4">Il membro richiesto non esiste o è stato rimosso.</p>
        </div>
      </AdminLayout>
    );
  }

  const canManageProperties = memberDetail.memberType === 'prosumer';
  const hasConsumerRole = memberDetail.memberType === 'consumer' || memberDetail.memberType === 'prosumer';

  return (
    <AdminLayout title={`Dettaglio: ${memberDetail.name}`}>
      <MemberHeader member={{
        id: memberDetail.id,
        name: memberDetail.name,
        email: memberDetail.email,
        type: memberDetail.type,
        status: memberDetail.status,
        memberType: memberDetail.memberType,
        isActive: memberDetail.isActive
      }} onToggleStatus={toggleMemberStatus} />

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Panoramica</TabsTrigger>
          <TabsTrigger value="energy">Dati Energetici</TabsTrigger>
          <TabsTrigger value="properties">Proprietà</TabsTrigger>
          <TabsTrigger value="documents">Documenti</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <MemberOverview 
            personalInfo={{
              name: memberDetail.name,
              email: memberDetail.email,
              type: memberDetail.type,
              status: memberDetail.status,
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
              memberType: memberDetail.memberType
            }}
          />
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          {canManageProperties && (
            <PropertyList 
              properties={memberDetail.properties.filter(p => p.ownerId === memberId)} 
              memberId={memberId}
              isOwner={true}
            />
          )}
          
          {hasConsumerRole && (
            <PropertyList 
              properties={memberDetail.properties.filter(p => p.consumerId === memberId)} 
              memberId={memberId}
              isOwner={false}
            />
          )}
          
          {!canManageProperties && !hasConsumerRole && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Questo membro non può gestire proprietà in quanto è di tipo {memberDetail.memberType}.
              </p>
            </div>
          )}
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
