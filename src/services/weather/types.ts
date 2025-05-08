
// File per i tipi e le interfacce relative al meteo

export interface WeatherForecastData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  windDirection?: number;
  icon: string;
  description: string;
  hourlyForecasts?: HourlyForecastData[];
  dailyForecasts?: DailyForecastData[];
  uv?: number;
  pressure?: number;
  windGust?: number;
}

export interface HourlyForecastData {
  time: string;
  temperature: number;
  icon: string;
  windSpeed?: number;
  windDirection?: number;
  precipitation?: number;
}

export interface DailyForecastData {
  day: string;
  date: string;
  maxTemp: number;
  minTemp: number;
  icon: string;
  description?: string;
  windSpeed?: number;
  precipitation?: number;
  humidity?: number;
}

export interface GeoLocation {
  lat: number;
  lng: number;
}
