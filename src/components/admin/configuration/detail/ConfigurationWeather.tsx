
import { WeatherForecast } from '@/components/admin/configuration/WeatherForecast';

interface ConfigurationWeatherProps {
  city: string;
  province: string;
}

export function ConfigurationWeather({ city, province }: ConfigurationWeatherProps) {
  return (
    <WeatherForecast city={city} province={province} />
  );
}
