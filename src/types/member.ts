
// Member form related types
export interface MemberFormValues {
  // Dati generali
  entityType: 'person' | 'company'; // Tipo di entità: persona fisica o giuridica
  memberType: 'consumer' | 'prosumer'; // Ruolo nella CER
  
  // Dati personali/aziendali
  name: string; // Nome completo o ragione sociale
  email: string;
  phone: string;
  
  // Per persone fisiche
  fiscalCode: string; // Codice fiscale
  idType: string; // Tipo documento
  idNumber: string; // Numero documento
  
  // Per aziende
  vatNumber: string; // Partita IVA
  companyType: string; // Tipo società
  
  // Indirizzi
  legalAddress: string; // Indirizzo di residenza/sede legale
  supplyAddress: string; // Indirizzo di fornitura
  sameAddress: boolean; // Flag se gli indirizzi coincidono
  
  // POD e dati energetici
  podCode: string; // Codice POD
  
  // Accettazione termini
  termsAccepted: boolean;
}

