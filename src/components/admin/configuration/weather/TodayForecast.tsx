
import { WeatherForecastData, getWindDirectionText } from "@/services/weather";
import { Droplets, Wind, CloudRain, Cloud, Sun, Gauge } from "lucide-react";
import { WeatherIcon } from "./WeatherIcon";
import { Card, CardContent } from "@/components/ui/card";

interface TodayForecastProps {
  forecast: WeatherForecastData;
}

export function TodayForecast({ forecast }: TodayForecastProps) {
  // Get the current date
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
  
  return (
    <Card className="bg-gradient-to-b from-blue-50 to-white">
      <CardContent className="p-5">
        <div className="text-center mb-4">
          <div className="text-sm text-gray-500">{formattedDate}</div>
          <div className="flex justify-center my-3">
            <WeatherIcon 
              icon={forecast.icon}
              className="w-24 h-24"
            />
          </div>
          <h2 className="text-3xl font-bold">{forecast.temperature}°C</h2>
          <p className="text-lg font-medium capitalize">{forecast.description}</p>
          <p className="text-sm text-gray-600">Percepita: {forecast.feelsLike}°C</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-6">
          {/* Humidity */}
          <div className="bg-white rounded-lg p-3 shadow-sm flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Droplets className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Umidità</p>
              <p className="font-medium">{forecast.humidity}%</p>
            </div>
          </div>
          
          {/* Wind */}
          <div className="bg-white rounded-lg p-3 shadow-sm flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Wind className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Vento</p>
              <p className="font-medium">
                {forecast.wind} km/h 
                {forecast.windDirection !== undefined ? ` (${getWindDirectionText(forecast.windDirection)})` : ''}
              </p>
            </div>
          </div>
          
          {/* Precipitation */}
          <div className="bg-white rounded-lg p-3 shadow-sm flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <CloudRain className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Precipitazioni</p>
              <p className="font-medium">
                {forecast.dailyForecasts && forecast.dailyForecasts[0]?.precipitation ? 
                  `${forecast.dailyForecasts[0].precipitation}%` : 
                  forecast.icon.includes('09') || forecast.icon.includes('10') ? '40%' : '0%'}
              </p>
            </div>
          </div>
          
          {/* UV Index or Pressure */}
          <div className="bg-white rounded-lg p-3 shadow-sm flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              {forecast.uv !== undefined ? (
                <Sun className="h-5 w-5 text-blue-600" />
              ) : (
                <Gauge className="h-5 w-5 text-blue-600" />
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500">
                {forecast.uv !== undefined ? 'Indice UV' : 'Pressione'}
              </p>
              <p className="font-medium">
                {forecast.uv !== undefined ? 
                  forecast.uv.toFixed(1) : 
                  forecast.pressure ? `${forecast.pressure} hPa` : '1013 hPa'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
