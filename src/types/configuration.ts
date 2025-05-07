
export interface Configuration {
  id: string;
  name: string;
  type: ConfigurationType;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  participants: number;
  status: ConfigurationStatus;
  imageUrl?: string;
  createdAt: string;
}

export type ConfigurationType = 'CER' | 'CECER' | 'test' | 'pilota' | 'monitoraggio';

export type ConfigurationStatus = 'active' | 'pending' | 'planning';

export interface ConfigurationFormData {
  name: string;
  type: ConfigurationType;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  status: ConfigurationStatus;
  imageUrl?: string;
}
