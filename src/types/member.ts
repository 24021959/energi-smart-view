
// Member form related types
export interface MemberFormValues {
  // Dati generali
  entityType: 'person' | 'company'; // Tipo di entità: persona fisica o giuridica
  memberType: 'consumer' | 'prosumer'; // Ruolo nella CER
  
  // Dati personali/aziendali
  name: string; // Nome completo o ragione sociale
  email: string;
  phone: string;
  
  // Credenziali di accesso
  username: string;
  password: string;
  
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
  
  // Stato del membro
  isActive: boolean; // Indica se il membro è attivo o no
}

// Tipo per la lista dei membri nella pagina di amministrazione
export interface MemberListItem {
  id: number;
  name: string;
  email: string;
  type: string;
  status: string;
  memberType: 'consumer' | 'prosumer';
  isActive: boolean;
}
