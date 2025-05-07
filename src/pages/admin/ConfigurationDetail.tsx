
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AdminLayout } from '@/layouts/AdminLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Configuration } from "@/types/configuration";
import { LoadingState } from '@/components/admin/configuration/LoadingState';
import { NotFoundState } from '@/components/admin/configuration/NotFoundState';
import { fetchConfigurationById } from '@/services/configurationService';
import { ConfigurationHeader } from '@/components/admin/configuration/ConfigurationHeader';
import { EnergyStats } from '@/components/admin/configuration/EnergyStats';
import { EnergyProductionConsumption } from '@/components/admin/configuration/EnergyProductionConsumption';
import { FinancialBenefits } from '@/components/admin/configuration/FinancialBenefits';
import { ConfigMembersExpander } from '@/components/admin/configuration/ConfigMembersExpander';
import { WeatherForecast } from '@/components/admin/configuration/WeatherForecast';
import { ChevronRight, ArrowLeft } from "lucide-react";

const ConfigurationDetail = () => {
  const { id } = useParams();
  const [configuration, setConfiguration] = useState<Configuration | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be a call to fetch configuration data
    const loadConfiguration = async () => {
      setIsLoading(true);
      
      try {
        if (id) {
          const configData = await fetchConfigurationById(id);
          setConfiguration(configData);
        }
      } catch (error) {
        console.error("Error loading configuration:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadConfiguration();
  }, [id]);

  if (isLoading) {
    return <LoadingState title="Dettaglio Configurazione" />;
  }

  if (!configuration) {
    return <NotFoundState title="Dettaglio Configurazione" />;
  }

  return (
    <AdminLayout title={configuration.name}>
      <div className="container mx-auto px-4 space-y-6">
        {/* Back button */}
        <div className="mb-2">
          <Button variant="ghost" size="sm" asChild className="flex items-center gap-1">
            <Link to="/admin/configurations">
              <ArrowLeft className="h-4 w-4" />
              <span>Torna alle configurazioni</span>
            </Link>
          </Button>
        </div>
        
        {/* Header con informazioni principali */}
        <ConfigurationHeader configuration={configuration} />
        
        {/* Section for configuration components */}
        <Card className="border shadow-sm">
          <CardContent className="p-4 flex items-center">
            <ChevronRight className="h-5 w-5 text-gray-500" />
            <h3 className="ml-2 text-lg font-medium">Componenti Configurazione Energetica</h3>
          </CardContent>
        </Card>
        
        {/* Config members expander */}
        <ConfigMembersExpander configuration={configuration} />

        {/* Energy stats section */}
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

        {/* Energy production/consumption section */}
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

        {/* Financial benefits section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FinancialBenefits
            title="Convenienza totale"
            subtitle="Valore compreso tra:"
            value="€40 / €50"
            change="+0%"
            changeLabel="Rispetto al periodo precedente"
            color="bg-orange-400"
            hasTooltip={true}
          />
          <FinancialBenefits
            title="Risparmio in bolletta"
            subtitle="Valore compreso tra:"
            value="€0 / €0"
            change="+0%"
            changeLabel="Rispetto al periodo precedente"
            color="bg-blue-400"
            hasTooltip={true}
          />
          <FinancialBenefits
            title="Valore della vendita dell'energia immessa"
            subtitle="Valore compreso tra:"
            value="€40 / €50"
            change="+0%"
            changeLabel="Rispetto al periodo precedente"
            color="bg-yellow-400"
            hasTooltip={true}
          />
          <FinancialBenefits
            title="Incentivi per l'energia condivisa e consumata dalla comunità"
            subtitle="Valore per acconti compreso tra:"
            value="€0 / €0"
            change="+0%"
            changeLabel="Rispetto al periodo precedente"
            color="bg-green-400"
            hasTooltip={true}
          />
        </div>

        {/* Weather forecast section */}
        <WeatherForecast 
          city={configuration.city} 
          province={configuration.province} 
        />

        {/* Data update info */}
        <div className="text-sm text-gray-500 p-4">
          <p>Ultimi flussi rilevati</p>
          <p>Ultimo aggiornamento: 22/07/2024 13:45</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ConfigurationDetail;
