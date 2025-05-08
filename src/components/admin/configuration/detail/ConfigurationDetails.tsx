
import { useState } from "react";
import { Configuration } from "@/types/configuration";
import { ConfigurationHeader } from '@/components/admin/configuration/ConfigurationHeader';
import { ConfigurationComponents } from './ConfigurationComponents';
import { ConfigurationEnergyStats } from './ConfigurationEnergyStats';
import { ConfigurationEnergyData } from './ConfigurationEnergyData';
import { ConfigurationFinancials } from './ConfigurationFinancials';
import { ConfigurationWeather } from './ConfigurationWeather';

interface ConfigurationDetailsProps {
  configuration: Configuration;
}

export function ConfigurationDetails({ configuration }: ConfigurationDetailsProps) {
  // Get current date and time
  const now = new Date();
  const formattedDateTime = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  return (
    <>
      {/* Header con informazioni principali */}
      <ConfigurationHeader configuration={configuration} />
      
      {/* Section for configuration components */}
      <ConfigurationComponents configuration={configuration} />

      {/* Energy stats section */}
      <ConfigurationEnergyStats />
      
      {/* Energy production/consumption section */}
      <ConfigurationEnergyData />

      {/* Financial benefits section */}
      <ConfigurationFinancials />

      {/* Weather forecast section */}
      <ConfigurationWeather 
        city={configuration.city} 
        province={configuration.province} 
      />

      {/* Data update info */}
      <div className="text-sm text-gray-500 p-4">
        <p>Ultimi flussi rilevati</p>
        <p>Ultimo aggiornamento: {formattedDateTime}</p>
      </div>
    </>
  );
}
