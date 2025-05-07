
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

// Function to get current date
function getCurrentDate() {
  const today = new Date();
  return `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}`;
}

// Function to get formatted time
function getFormattedTime(hourOffset = 0) {
  const now = new Date();
  now.setHours(now.getHours() + hourOffset);
  return now.getHours().toString().padStart(2, '0') + ':00';
}

// Generate realistic weather data for today based on current season
export const getTodayForecast = (): WeatherForecastData => {
  const now = new Date();
  const month = now.getMonth(); // 0-11
  
  // Define seasonal weather patterns
  let baseTemp, tempRange, humidity, windSpeed, mainIcon, description;
  
  // Spring (March-May)
  if (month >= 2 && month <= 4) {
    baseTemp = 18;
    tempRange = 8;
    humidity = 65;
    windSpeed = 12;
    mainIcon = '02d'; // few clouds
    description = 'Parzialmente nuvoloso';
  } 
  // Summer (June-August)
  else if (month >= 5 && month <= 7) {
    baseTemp = 27;
    tempRange = 6;
    humidity = 55;
    windSpeed = 8;
    mainIcon = '01d'; // clear sky
    description = 'Cielo sereno';
  }
  // Fall (September-November) 
  else if (month >= 8 && month <= 10) {
    baseTemp = 16;
    tempRange = 7;
    humidity = 75;
    windSpeed = 15;
    mainIcon = '03d'; // scattered clouds
    description = 'Nubi sparse';
  }
  // Winter (December-February)
  else {
    baseTemp = 8;
    tempRange = 5;
    humidity = 80;
    windSpeed = 18;
    mainIcon = '04d'; // broken clouds
    description = 'Nuvoloso';
  }

  // Add some randomization to make data more realistic
  const currentTemp = Math.round(baseTemp + (Math.random() * 4 - 2));
  const feelsLike = Math.round(currentTemp + (Math.random() * 2 - 1));
  const currentHumidity = Math.round(humidity + (Math.random() * 10 - 5));
  const currentWind = Math.round(windSpeed + (Math.random() * 6 - 3));
  const windDirection = Math.round(Math.random() * 360);
  
  // Generate hourly forecasts (current hour + next 4 hours)
  const hourlyForecasts = [];
  for (let i = 0; i < 5; i++) {
    const hourlyTemp = Math.round(currentTemp + (i === 0 ? 0 : (i < 3 ? 2 : -2)) + (Math.random() * 2 - 1));
    const hourlyIcon = i < 3 ? mainIcon : (mainIcon === '01d' ? '01n' : (mainIcon === '02d' ? '02n' : mainIcon));
    
    hourlyForecasts.push({
      time: getFormattedTime(i * 3),
      temperature: hourlyTemp,
      icon: hourlyIcon
    });
  }
  
  // Generate daily forecasts (today + next 4 days)
  const dailyForecasts = [];
  
  // Today
  dailyForecasts.push({
    day: 'Oggi',
    maxTemp: Math.round(currentTemp + tempRange/2),
    minTemp: Math.round(currentTemp - tempRange/2),
    icon: mainIcon
  });
  
  // Next 4 days
  const icons = ['01d', '02d', '03d', '04d', '10d'];
  for (let i = 1; i <= 4; i++) {
    const dayTemp = Math.round(baseTemp + (Math.random() * 6 - 3));
    const dayIcon = icons[Math.floor(Math.random() * icons.length)];
    
    dailyForecasts.push({
      day: getDayNameInItalian(i),
      maxTemp: Math.round(dayTemp + tempRange/2),
      minTemp: Math.round(dayTemp - tempRange/2),
      icon: dayIcon
    });
  }

  return {
    temperature: currentTemp,
    feelsLike: feelsLike,
    humidity: currentHumidity,
    wind: currentWind,
    windDirection: windDirection,
    icon: mainIcon,
    description: description,
    hourlyForecasts: hourlyForecasts,
    dailyForecasts: dailyForecasts
  };
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
  const basePercentage = conditionMap[iconPrefix] || 0;
  
  // Adjust for current month (solar efficiency varies by season)
  const now = new Date();
  const month = now.getMonth(); // 0-11
  
  // Seasonal adjustment factors
  let seasonalFactor = 1.0;
  if (month >= 3 && month <= 8) { // Spring and Summer
    seasonalFactor = 1.2; // Higher efficiency
  } else if (month >= 9 || month <= 2) { // Fall and Winter
    seasonalFactor = 0.8; // Lower efficiency
  }
  
  return Math.round(basePercentage * seasonalFactor);
};

// Declare the global initMapForWeather function
declare global {
  interface Window {
    initMapForWeather: (() => void) | undefined;
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
    'Venezia': { lat: 45.4371, lng: 12.3326 },
    'Bergamo': { lat: 45.6983, lng: 9.6773 },
    'Peccioli': { lat: 43.5428, lng: 10.7195 }
  };
  
  // Default to Milan if city not found
  return cityCoordinates[city] || { lat: 45.4642, lng: 9.1900 };
};

// Function to fetch weather forecast
export const fetchWeatherForecast = async (city: string, province?: string): Promise<WeatherForecastData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Generate real-time weather forecast
  return getTodayForecast();
};

