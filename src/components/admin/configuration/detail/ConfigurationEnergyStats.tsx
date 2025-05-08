
import { EnergyStats } from '@/components/admin/configuration/EnergyStats';

export function ConfigurationEnergyStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <EnergyStats 
        icon="energy" 
        value="9,23kW" 
        description="Energia disponibile nella comunità" 
      />
      <EnergyStats 
        icon="co2" 
        value="373,21kg" 
        description="CO2 equivalente evitata" 
        hasTooltip={true}
      />
      <EnergyStats 
        icon="trees" 
        value="31,1" 
        description="Alberi equivalenti piantati" 
        hasTooltip={true}
      />
    </div>
  );
}
