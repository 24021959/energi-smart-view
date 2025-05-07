import { mockConfigurations } from "./configurationService";

export interface WeatherForecastData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  icon: string;
  description: string;
}

export interface HourlyForecastData {
  time: string;
  temperature: number;
  icon: string;
}

export interface DailyForecastData {
  day: string;
  maxTemp: number;
  minTemp: number;
  icon: string;
}

// Mock data for weather forecast
export const mockTodayForecast = {
  temperature: 22,
  feelsLike: 24,
  humidity: 65,
  wind: 10,
  icon: '01d',
  description: 'Cielo sereno'
};

export const mockHourlyForecast = [
  { time: '09:00', temperature: 18, icon: '01d' },
  { time: '12:00', temperature: 22, icon: '01d' },
  { time: '15:00', temperature: 24, icon: '02d' },
  { time: '18:00', temperature: 22, icon: '03d' },
  { time: '21:00', temperature: 19, icon: '01n' },
];

export const mockDailyForecast = [
  { day: 'Oggi', maxTemp: 24, minTemp: 16, icon: '01d' },
  { day: 'Domani', maxTemp: 25, minTemp: 17, icon: '02d' },
  { day: 'Mer', maxTemp: 23, minTemp: 15, icon: '10d' },
  { day: 'Gio', maxTemp: 22, minTemp: 14, icon: '10d' },
  { day: 'Ven', maxTemp: 21, minTemp: 13, icon: '01d' },
];

// Helper function to estimate solar production based on weather
export const estimateSolarProduction = (forecast: WeatherForecastData): number => {
  // Map weather conditions to production percentages
  const conditionMap: {[key: string]: number} = {
    '01': 100, // Clear sky
    '02': 85,  // Few clouds
    '03': 70,  // Scattered clouds
    '04': 50,  // Broken clouds
    '09': 30,  // Shower rain
    '10': 40,  // Rain
    '11': 20,  // Thunderstorm
    '13': 15,  // Snow
    '50': 25,  // Mist
  };
  
  const iconPrefix = forecast.icon.substring(0, 2);
  return conditionMap[iconPrefix] || 0;
};

// Declare the global initMapForWeather function
declare global {
  interface Window {
    initMapForWeather: () => void;
  }
}

// Function to fetch weather forecast (simulated)
export const fetchWeatherForecast = async (city: string, province: string): Promise<WeatherForecastData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // For the sake of example, always return the mock data
  return mockTodayForecast;
};
