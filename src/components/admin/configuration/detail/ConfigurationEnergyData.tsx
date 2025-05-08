
import { EnergyProductionConsumption } from '@/components/admin/configuration/EnergyProductionConsumption';

export function ConfigurationEnergyData() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <EnergyProductionConsumption 
        type="production"
        totalValue="704,16kWh"
        data={[
          { label: "Energia autoconsumata", value: "275,2kWh", percentage: "39,08%", color: "bg-blue-400" },
          { label: "Energia immessa in rete", value: "429,96kWh", percentage: "60,92%", color: "bg-yellow-400" },
          { label: "di cui condivisa", value: "0,0kWh", percentage: "", color: "transparent" }
        ]}
      />
      <EnergyProductionConsumption 
        type="consumption"
        totalValue="445,17kWh"
        data={[
          { label: "Energia autoconsumata", value: "275,2kWh", percentage: "61,82%", color: "bg-blue-400" },
          { label: "Energia prelevata", value: "169,97kWh", percentage: "38,18%", color: "bg-red-500" },
          { label: "di cui condivisa", value: "0,0kWh", percentage: "", color: "transparent" }
        ]}
      />
    </div>
  );
}
