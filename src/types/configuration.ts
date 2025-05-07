
export interface Configuration {
  id: string;
  name: string;
  type: ConfigurationType;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  participants: number;
  status: ConfigurationStatus;
  imageUrl?: string;
  createdAt: string;
  plants?: string[];
  members?: ConfigurationMember[];
  startDate?: string;
  documents?: string[];
}

export type ConfigurationType = 'cer' | 'gac' | 'aid' | 'cs' | 'msu' | 'edificio';

export type ConfigurationStatus = 'active' | 'pending' | 'planning';

export interface ConfigurationFormData {
  name: string;
  type: ConfigurationType;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  status: ConfigurationStatus;
  imageUrl?: string;
  plants?: string[];
  members?: ConfigurationMember[];
  startDate?: string;
  documents?: string[];
}

export interface ConfigurationMember {
  id: string;
  role: 'consumer' | 'producer';
  pod: string;
  quota: string;
}
