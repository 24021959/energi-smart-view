
import { Card, CardContent } from "@/components/ui/card";
import { HourlyForecastData } from "@/services/weatherService";
import { WeatherIcon } from "./WeatherIcon";
import { Wind } from "lucide-react";

interface HourlyForecastProps {
  hourlyForecasts: HourlyForecastData[];
}

export function HourlyForecast({ hourlyForecasts }: HourlyForecastProps) {
  return (
    <div>
      <h3 className="font-medium text-lg mb-3">Previsioni orarie</h3>
      
      <div className="overflow-x-auto pb-4">
        <div className="min-w-max">
          <div className="grid grid-cols-8 gap-4">
            {hourlyForecasts.map((hour, index) => (
              <Card key={index} className={index === 0 ? "border-2 border-primary" : ""}>
                <CardContent className="p-3">
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-semibold">{hour.time}</p>
                    <WeatherIcon 
                      icon={hour.icon}
                      className="w-12 h-12 my-2"
                    />
                    <p className="text-lg font-bold">{hour.temperature}°C</p>
                    
                    {hour.windSpeed && (
                      <div className="flex items-center mt-2 text-sm">
                        <Wind className="h-3 w-3 text-blue-500 mr-1" />
                        <span>{hour.windSpeed} km/h</span>
                      </div>
                    )}
                    
                    {hour.precipitation !== undefined && (
                      <p className="text-xs mt-1">
                        Pioggia: {hour.precipitation}%
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
