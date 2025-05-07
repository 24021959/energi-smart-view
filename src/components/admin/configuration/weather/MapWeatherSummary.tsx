
import { WeatherForecastData, estimateSolarProduction } from "@/services/weatherService";
import { WeatherIcon } from "./WeatherIcon";
import { Sun, Battery, Gauge } from "lucide-react";

interface MapWeatherSummaryProps {
  forecast: WeatherForecastData;
  city: string;
  province: string;
}

export function MapWeatherSummary({ forecast, city, province }: MapWeatherSummaryProps) {
  const productionPercentage = estimateSolarProduction(forecast);
  
  return (
    <div className="mt-4 bg-white rounded-lg p-4 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        <WeatherIcon icon={forecast.icon} className="w-12 h-12 mr-3" />
        <div>
          <h3 className="font-medium">{city}, {province}</h3>
          <p className="text-sm text-gray-500">{forecast.description}, {forecast.temperature}°C</p>
        </div>
      </div>
      
      <div className="flex space-x-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <Sun className="h-5 w-5 text-yellow-500 mr-1" />
            <span className="font-medium">Previsione</span>
          </div>
          <p className="text-sm">{forecast.description}</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <Battery className="h-5 w-5 text-green-500 mr-1" />
            <span className="font-medium">Produzione</span>
          </div>
          <p className="text-sm">{productionPercentage}% efficienza</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <Gauge className="h-5 w-5 text-blue-500 mr-1" />
            <span className="font-medium">Stima</span>
          </div>
          <p className="text-sm">6.2 kWh</p>
        </div>
      </div>
    </div>
  );
}
