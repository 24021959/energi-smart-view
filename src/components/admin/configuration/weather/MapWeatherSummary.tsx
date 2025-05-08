
import { 
  WeatherForecastData, 
  estimateSolarProduction, 
  estimateWindProduction, 
  calculatePeakSunHours, 
  getWindIntensityText 
} from "@/services/weather";
import { WeatherIcon } from "./WeatherIcon";
import { Sun, Battery, Gauge, Wind } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MapWeatherSummaryProps {
  forecast: WeatherForecastData;
  city: string;
  province: string;
}

export function MapWeatherSummary({ forecast, city, province }: MapWeatherSummaryProps) {
  const solarProductionPercentage = estimateSolarProduction(forecast);
  const windProductionPercentage = estimateWindProduction(forecast.wind);
  
  // Calculate estimated production in kWh based on weather conditions
  // Assuming a standard 6kW solar system
  const solarSystemCapacity = 6;
  const peakSunHours = calculatePeakSunHours(forecast.icon);
  const estimatedSolarProduction = ((solarSystemCapacity * peakSunHours) * (solarProductionPercentage / 100)).toFixed(1);
  
  // Assuming a standard 3kW wind turbine
  const windSystemCapacity = 3;
  const estimatedWindProduction = ((windSystemCapacity * 24) * (windProductionPercentage / 100) / 10).toFixed(1);
  
  // Get current date
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
  
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Solar Production Card */}
      <Card className="bg-gradient-to-br from-yellow-50 to-white border shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center mb-3">
            <Sun className="h-6 w-6 text-yellow-500 mr-2" />
            <h3 className="font-semibold text-lg">Produzione Solare</h3>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <WeatherIcon icon={forecast.icon} className="w-10 h-10 mr-3" />
              <div>
                <h4 className="font-medium">{city}, {province}</h4>
                <p className="text-sm text-gray-600">{forecast.description}, {forecast.temperature}°C</p>
                <p className="text-xs text-gray-400">{formattedDate}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="flex flex-col items-center p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center mb-1">
                <Battery className="h-5 w-5 text-yellow-600 mr-1" />
                <span className="font-medium">Efficienza</span>
              </div>
              <p className="text-xl font-bold">{solarProductionPercentage}%</p>
              <p className="text-xs text-gray-500">Basata sulle condizioni meteo</p>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center mb-1">
                <Gauge className="h-5 w-5 text-yellow-600 mr-1" />
                <span className="font-medium">Produzione stimata</span>
              </div>
              <p className="text-xl font-bold">{estimatedSolarProduction} kWh</p>
              <p className="text-xs text-gray-500">Impianto standard da 6kW</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Wind Production Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-white border shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center mb-3">
            <Wind className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="font-semibold text-lg">Produzione Eolica</h3>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 mr-3 flex items-center justify-center bg-blue-100 rounded-full">
                <Wind className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">{forecast.wind} km/h</h4>
                <p className="text-sm text-gray-600">Vento {getWindText(forecast.wind)}</p>
                <p className="text-xs text-gray-400">{formattedDate}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-1">
                <Battery className="h-5 w-5 text-blue-600 mr-1" />
                <span className="font-medium">Efficienza</span>
              </div>
              <p className="text-xl font-bold">{windProductionPercentage}%</p>
              <p className="text-xs text-gray-500">Basata sulla velocità del vento</p>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-1">
                <Gauge className="h-5 w-5 text-blue-600 mr-1" />
                <span className="font-medium">Produzione stimata</span>
              </div>
              <p className="text-xl font-bold">{estimatedWindProduction} kWh</p>
              <p className="text-xs text-gray-500">Turbina standard da 3kW</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
