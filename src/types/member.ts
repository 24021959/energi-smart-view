
// Member form related types
export interface MemberFormValues {
  // Dati generali
  entityType: 'person' | 'company'; // Tipo di entità: persona fisica o giuridica
  memberType: 'consumer' | 'prosumer' | 'producer'; // Ruolo nella CER
  
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
  
  // Configurazione associata
  configurationId: string; // ID della configurazione a cui il membro è associato
  
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
  memberType: 'consumer' | 'prosumer' | 'producer';
  isActive: boolean;
  // Aggiungiamo un campo per tenere traccia delle proprietà associate
  associatedProperties?: number[];
}

// Nuovo tipo per le proprietà
export interface Property {
  id: number;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  type: 'residential' | 'commercial' | 'industrial';
  ownerId: number;
  consumerId?: number; // Può essere undefined se non c'è un consumatore associato
  podCode: string;
  status: 'active' | 'pending' | 'inactive';
  area: number; // Superficie in metri quadri
  energyClass: string; // Classe energetica
}

// Tipo per i dati del membro nei tab
export interface MemberDetailData {
  id: number;
  name: string;
  email: string;
  phone?: string;
  fiscalCode?: string;
  vatNumber?: string;
  type: string;
  memberType: 'consumer' | 'prosumer' | 'producer';
  status: string;
  isActive: boolean;
  registrationDate: string;
  properties: Property[];
}
