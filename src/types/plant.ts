
export interface Plant {
  id: string;
  name: string;
  type: PlantType;
  power: number; // in kW
  address: string;
  city: string;
  province: string;
  postalCode: string;
  status: PlantStatus;
  owner: string;
  installationDate: string;
  createdAt: string;
}

export type PlantType = 'solar' | 'wind' | 'hydro' | 'biomass' | 'geothermal';

export type PlantStatus = 'active' | 'inactive' | 'pending' | 'maintenance';

export interface PlantFormData {
  name: string;
  type: PlantType;
  power: number;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  owner: string;
  installationDate: string;
}
