
import { Card, CardContent } from "@/components/ui/card";
import { DailyForecastData } from "@/services/weatherService";
import { WeatherIcon } from "./WeatherIcon";

interface DailyForecastProps {
  forecasts: DailyForecastData[];
}

export function DailyForecast({ forecasts }: DailyForecastProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium mb-3">Prossimi Giorni</h3>
        <div className="space-y-2">
          {forecasts.map((day, index) => (
            <div 
              key={index}
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <div className="flex items-center">
                <p className="w-16 font-medium">{day.day}</p>
                <WeatherIcon 
                  icon={day.icon}
                  className="w-8 h-8 mx-2"
                />
              </div>
              <div className="flex items-center">
                <span className="text-blue-600 font-medium">{day.minTemp}°</span>
                <span className="mx-2 text-gray-400">|</span>
                <span className="text-red-600 font-medium">{day.maxTemp}°</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
