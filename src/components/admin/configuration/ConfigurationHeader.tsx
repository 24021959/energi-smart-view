
import { Configuration, ConfigurationType } from "@/types/configuration";
import { Badge } from "@/components/ui/badge";
import { Sun, Zap, Car } from "lucide-react";

// Type mapping for badges
const typeLabels: Record<ConfigurationType, string> = {
  'cer': 'CER',
  'gac': 'GAC',
  'aid': 'AID',
  'cs': 'CS',
  'msu': 'MSU',
  'edificio': 'Edificio'
};

// Status mapping for badges
const statusLabels: Record<string, string> = {
  'active': 'Attivato',
  'pending': 'In attesa',
  'planning': 'Pianificato'
};
interface ConfigurationHeaderProps {
  configuration: Configuration;
}
export function ConfigurationHeader({
  configuration
}: ConfigurationHeaderProps) {
  return <div className="flex items-center gap-6">
      {/* Icon circle */}
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <Sun className="h-10 w-10 text-green-600" />
      </div>
      
      {/* Configuration info */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-800">{configuration.name}</h1>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            {typeLabels[configuration.type]}
          </Badge>
          
          <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
            {statusLabels[configuration.status]}
          </Badge>
        </div>
      </div>
      
      {/* Energy statistics */}
      <div className="hidden lg:flex items-center gap-8">
        <div className="flex flex-col items-center">
          <Sun className="h-8 w-8 text-gray-700" />
          <p className="mt-1 font-semibold">250kW</p>
        </div>
        <div className="flex flex-col items-center">
          <Zap className="h-8 w-8 text-gray-700" />
          <p className="mt-1 font-semibold">- kWh</p>
        </div>
        <div className="flex flex-col items-center">
          <Car className="h-8 w-8 text-gray-700" />
          <p className="mt-1 font-semibold">- kWh</p>
        </div>
      </div>
    </div>;
}
