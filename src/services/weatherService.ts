
export interface WeatherForecastData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  icon: string;
  description: string;
  hourlyForecasts?: HourlyForecastData[];
  dailyForecasts?: DailyForecastData[];
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

export interface GeoLocation {
  lat: number;
  lng: number;
}

// Function to get current day name in Italian
function getDayNameInItalian(dayOffset = 0) {
  const days = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
  const today = new Date();
  today.setDate(today.getDate() + dayOffset);
  return days[today.getDay()];
}

// Function to get formatted time
function getFormattedTime(hourOffset = 0) {
  const now = new Date();
  now.setHours(now.getHours() + hourOffset);
  return now.getHours().toString().padStart(2, '0') + ':00';
}

// Generate realistic mockup data for today
export const mockTodayForecast: WeatherForecastData = {
  temperature: 22,
  feelsLike: 24,
  humidity: 65,
  wind: 10,
  icon: '01d',
  description: 'Cielo sereno',
  hourlyForecasts: [
    { time: getFormattedTime(0), temperature: 22, icon: '01d' },
    { time: getFormattedTime(3), temperature: 24, icon: '02d' },
    { time: getFormattedTime(6), temperature: 23, icon: '03d' },
    { time: getFormattedTime(9), temperature: 19, icon: '01n' },
    { time: getFormattedTime(12), temperature: 17, icon: '01n' },
  ],
  dailyForecasts: [
    { day: 'Oggi', maxTemp: 24, minTemp: 16, icon: '01d' },
    { day: getDayNameInItalian(1), maxTemp: 25, minTemp: 17, icon: '02d' },
    { day: getDayNameInItalian(2), maxTemp: 23, minTemp: 15, icon: '10d' },
    { day: getDayNameInItalian(3), maxTemp: 22, minTemp: 14, icon: '10d' },
    { day: getDayNameInItalian(4), maxTemp: 21, minTemp: 13, icon: '01d' },
  ]
};

// Helper function to get wind direction text
export const getWindDirectionText = (degrees: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(((degrees % 360) / 45)) % 8;
  return directions[index];
};

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
    google?: any;
  }
}

// Function to geocode city name to coordinates
export const geocodeCity = async (city: string): Promise<GeoLocation> => {
  // For demo purposes, return coordinates based on common Italian cities
  const cityCoordinates: {[key: string]: GeoLocation} = {
    'Milano': { lat: 45.4642, lng: 9.1900 },
    'Roma': { lat: 41.9028, lng: 12.4964 },
    'Napoli': { lat: 40.8518, lng: 14.2681 },
    'Torino': { lat: 45.0703, lng: 7.6869 },
    'Bologna': { lat: 44.4949, lng: 11.3426 },
    'Firenze': { lat: 43.7696, lng: 11.2558 },
    'Venezia': { lat: 45.4371, lng: 12.3326 }
  };
  
  // Default to Milan if city not found
  return cityCoordinates[city] || { lat: 45.4642, lng: 9.1900 };
};

// Function to fetch weather forecast (simulated)
export const fetchWeatherForecast = async (city: string, province?: string): Promise<WeatherForecastData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // For the sake of example, always return the mock data
  return mockTodayForecast;
};
