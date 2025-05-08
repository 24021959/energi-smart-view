
import { Card, CardContent } from "@/components/ui/card";
import { DailyForecastData } from "@/services/weather";
import { WeatherIcon } from "./WeatherIcon";
import { Sun, Wind, Droplets } from "lucide-react";

interface DailyForecastProps {
  forecasts: DailyForecastData[];
}

export function DailyForecast({ forecasts }: DailyForecastProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg mb-3">Previsioni per i prossimi 7 giorni</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {forecasts.map((day, index) => (
          <Card key={index} className={index === 0 ? "border-2 border-primary" : ""}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="font-bold">{day.day}</p>
                  <p className="text-xs text-gray-500">{day.date}</p>
                </div>
                <WeatherIcon 
                  icon={day.icon}
                  className="w-10 h-10"
                />
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-gray-600 capitalize">{day.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-blue-600 font-medium">{day.minTemp}°</span>
                  <div className="h-1 flex-1 mx-2 bg-gradient-to-r from-blue-200 to-red-200 rounded"></div>
                  <span className="text-red-600 font-medium">{day.maxTemp}°</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Wind className="h-4 w-4 text-blue-500 mr-1" />
                  <span>{day.windSpeed} km/h</span>
                </div>
                
                <div className="flex items-center">
                  <Droplets className="h-4 w-4 text-blue-500 mr-1" />
                  <span>{day.humidity}%</span>
                </div>
                
                <div className="flex items-center col-span-2">
                  <Sun className="h-4 w-4 text-yellow-500 mr-1" />
                  <span>Precipitazioni: {day.precipitation}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
