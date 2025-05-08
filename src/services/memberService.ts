
import { Property, MemberDetailData } from '@/types/member';

// Mock properties for testing
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

// Mock member data
const members: MemberDetailData[] = [
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

export const getMemberById = (id: number): MemberDetailData | undefined => {
  return members.find(m => m.id === id);
};

// Additional member details
export const getMemberDetails = (id: number) => {
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
