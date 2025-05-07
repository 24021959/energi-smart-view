
import { Card, CardContent } from "@/components/ui/card";
import { HourlyForecastData } from "@/services/weatherService";
import { WeatherIcon } from "./WeatherIcon";

interface HourlyForecastProps {
  hourlyForecasts: HourlyForecastData[];
}

export function HourlyForecast({ hourlyForecasts }: HourlyForecastProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium mb-3">Previsione Oraria</h3>
        <div className="flex overflow-x-auto pb-2">
          {hourlyForecasts.map((hour, index) => (
            <div 
              key={index}
              className="flex flex-col items-center mr-6 min-w-16"
            >
              <p className="text-sm font-medium">{hour.time}</p>
              <WeatherIcon 
                icon={hour.icon}
                className="w-10 h-10 my-2"
              />
              <p className="text-sm">{hour.temperature}°C</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
