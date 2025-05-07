
import { WeatherForecastData, estimateSolarProduction } from "@/services/weatherService";
import { WeatherIcon } from "./WeatherIcon";

interface MapWeatherSummaryProps {
  forecast: WeatherForecastData;
  city: string;
  province: string;
}

export function MapWeatherSummary({ forecast, city, province }: MapWeatherSummaryProps) {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
      <div className="flex items-center">
        <WeatherIcon iconCode={forecast.icon} size="md" />
        <div className="ml-3">
          <div className="font-medium">{forecast.temperature}°C - {forecast.description}</div>
          <div className="text-sm text-gray-500">{city}, {province}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm">Produzione energetica stimata</div>
        <div className="font-medium">
          {estimateSolarProduction(forecast)}%
        </div>
      </div>
    </div>
  );
}
