
import { HourlyForecast as HourlyForecastType } from "@/services/weatherService";
import { WeatherIcon } from "./WeatherIcon";

interface HourlyForecastProps {
  hourlyForecasts: HourlyForecastType[];
}

export function HourlyForecast({ hourlyForecasts }: HourlyForecastProps) {
  if (!hourlyForecasts || hourlyForecasts.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-6">
      <h3 className="text-md font-medium mb-2">Previsioni orarie</h3>
      <div className="flex overflow-x-auto pb-2 gap-3">
        {hourlyForecasts.map((hourly, idx) => (
          <div key={idx} className="flex-shrink-0 border rounded-lg p-3 text-center w-24">
            <div className="text-sm font-medium">{hourly.time}</div>
            <div className="flex justify-center my-1">
              <WeatherIcon iconCode={hourly.icon} size="sm" />
            </div>
            <div className="font-medium">{hourly.temperature}°C</div>
            <div className="text-xs text-gray-500">{hourly.rainProbability}% pioggia</div>
          </div>
        ))}
      </div>
    </div>
  );
}
