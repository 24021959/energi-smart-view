
import { WeatherForecastData, getWindDirectionText } from "@/services/weatherService";
import { Droplets, Wind, CloudRain, Cloud, ArrowUp, ArrowDown } from "lucide-react";
import { WeatherIcon } from "./WeatherIcon";

interface TodayForecastProps {
  forecast: WeatherForecastData;
}

export function TodayForecast({ forecast }: TodayForecastProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Oggi: {forecast.date}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 flex items-center">
          <div className="mr-4">
            <WeatherIcon iconCode={forecast.icon} size="lg" />
          </div>
          <div>
            <div className="text-3xl font-bold">{forecast.temperature}°C</div>
            <div className="text-gray-600 capitalize">{forecast.description}</div>
            <div className="text-sm text-gray-500">Percepita: {forecast.feelsLike}°C</div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center">
              <Droplets className="h-5 w-5 mr-2 text-blue-500" />
              <div>
                <div className="text-sm text-gray-500">Umidità</div>
                <div className="font-medium">{forecast.humidity}%</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Wind className="h-5 w-5 mr-2 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Vento</div>
                <div className="font-medium">
                  {forecast.windSpeed} km/h 
                  {forecast.windDirection && (
                    <span className="ml-1">
                      {getWindDirectionText(forecast.windDirection)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <CloudRain className="h-5 w-5 mr-2 text-blue-400" />
              <div>
                <div className="text-sm text-gray-500">Prob. pioggia</div>
                <div className="font-medium">{forecast.rainProbability}%</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Cloud className="h-5 w-5 mr-2 text-gray-400" />
              <div>
                <div className="text-sm text-gray-500">Nuvolosità</div>
                <div className="font-medium">{forecast.cloudiness}%</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <ArrowUp className="h-5 w-5 mr-2 text-yellow-500" />
              <div>
                <div className="text-sm text-gray-500">Alba</div>
                <div className="font-medium">{forecast.sunriseTime}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <ArrowDown className="h-5 w-5 mr-2 text-orange-500" />
              <div>
                <div className="text-sm text-gray-500">Tramonto</div>
                <div className="font-medium">{forecast.sunsetTime}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
