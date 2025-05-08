
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
  
  // Calculate estimated production in kWh based on weather conditions
  // Assuming a standard 6kW system
  const systemCapacity = 6;
  const peakSunHours = calculatePeakSunHours(forecast);
                       
  const estimatedProduction = ((systemCapacity * peakSunHours) * (productionPercentage / 100)).toFixed(1);
  
  // Get current date
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
  
  return (
    <div className="mt-4 bg-white rounded-lg p-4 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        <WeatherIcon icon={forecast.icon} className="w-12 h-12 mr-3" />
        <div>
          <h3 className="font-medium">{city}, {province}</h3>
          <p className="text-sm text-gray-500">{forecast.description}, {forecast.temperature}°C</p>
          <p className="text-xs text-gray-400">{formattedDate}</p>
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
            <span className="font-medium">Efficienza</span>
          </div>
          <p className="text-sm">{productionPercentage}%</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <Gauge className="h-5 w-5 text-blue-500 mr-1" />
            <span className="font-medium">Produzione stimata</span>
          </div>
          <p className="text-sm">{estimatedProduction} kWh</p>
        </div>
      </div>
    </div>
  );
}

// Helper function to calculate peak sun hours based on weather conditions
function calculatePeakSunHours(forecast: WeatherForecastData): number {
  // Peak sun hours vary by weather condition and season
  if (forecast.icon.includes('01')) return 5.5; // Clear sky
  if (forecast.icon.includes('02')) return 4.5; // Few clouds
  if (forecast.icon.includes('03')) return 3.5; // Scattered clouds
  if (forecast.icon.includes('04')) return 2.5; // Broken clouds
  if (forecast.icon.includes('09')) return 1.5; // Shower rain
  if (forecast.icon.includes('10')) return 2.0; // Rain
  if (forecast.icon.includes('11')) return 1.0; // Thunderstorm
  if (forecast.icon.includes('13')) return 1.0; // Snow
  if (forecast.icon.includes('50')) return 2.0; // Mist
  
  // Default for unknown conditions
  return 3.0;
}
