
import { WeatherForecastData, getWindDirectionText } from "@/services/weatherService";
import { Droplets, Wind, CloudRain, Cloud } from "lucide-react";
import { WeatherIcon } from "./WeatherIcon";

interface TodayForecastProps {
  forecast: WeatherForecastData;
}

export function TodayForecast({ forecast }: TodayForecastProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1 bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center">
        <WeatherIcon 
          icon={forecast.icon}
          className="w-24 h-24 mb-2"
        />
        <h3 className="text-xl font-bold">{forecast.temperature}°C</h3>
        <p className="text-gray-500">{forecast.description}</p>
        <p className="text-sm text-gray-500 mt-1">Percepita: {forecast.feelsLike}°C</p>
      </div>
      
      <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-medium mb-3">Dettagli Meteo</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Humidity */}
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Droplets className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Umidità</p>
              <p className="font-medium">{forecast.humidity}%</p>
            </div>
          </div>
          
          {/* Wind */}
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Wind className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Vento</p>
              <p className="font-medium">{forecast.wind} km/h {forecast.wind > 0 ? `(${getWindDirectionText(0)})` : ''}</p>
            </div>
          </div>
          
          {/* Precipitation */}
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <CloudRain className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Precipitazioni</p>
              <p className="font-medium">0%</p>
            </div>
          </div>
          
          {/* Cloudiness */}
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Cloud className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Nuvolosità</p>
              <p className="font-medium">0%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
