
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
  return `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
}

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

// Function to geocode city name to coordinates
export const geocodeCity = async (city: string): Promise<GeoLocation> => {
  try {
    // Use OpenWeatherMap Geocoding API
    const apiKey = '1a78eb2dc006e4d0f1334fb5a9d47ac3'; // Free tier API key for OpenWeatherMap
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)},IT&limit=1&appid=${apiKey}`);
    
    if (!response.ok) {
      throw new Error('Geocoding API error');
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      return { 
        lat: data[0].lat, 
        lng: data[0].lon 
      };
    }
    
    // Fallback to predefined coordinates
    throw new Error('City not found');
  } catch (error) {
    console.error('Geocoding error:', error);
    
    // Fallback to predefined coordinates for common Italian cities
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
    
    return cityCoordinates[city] || { lat: 45.4642, lng: 9.1900 }; // Default to Milan
  }
};

// Function to fetch real weather forecast data from OpenWeatherMap
export const fetchWeatherForecast = async (city: string, province?: string): Promise<WeatherForecastData> => {
  try {
    // Get coordinates first
    const location = await geocodeCity(city);
    
    // Fetch current weather
    const apiKey = '1a78eb2dc006e4d0f1334fb5a9d47ac3'; // Free tier API key
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lng}&exclude=minutely&units=metric&appid=${apiKey}`);
    
    if (!response.ok) {
      throw new Error('Weather API error');
    }
    
    const data = await response.json();
    
    // Format hourly forecasts (next 5 3-hour periods)
    const hourlyForecasts = data.hourly.slice(0, 5).map((hour: any, index: number) => ({
      time: new Date(hour.dt * 1000).getHours().toString().padStart(2, '0') + ':00',
      temperature: Math.round(hour.temp),
      icon: hour.weather[0].icon
    }));
    
    // Format daily forecasts (today + next 4 days)
    const dailyForecasts = data.daily.slice(0, 5).map((day: any, index: number) => ({
      day: index === 0 ? 'Oggi' : getDayNameInItalian(index),
      maxTemp: Math.round(day.temp.max),
      minTemp: Math.round(day.temp.min),
      icon: day.weather[0].icon
    }));
    
    // Current weather
    const current = data.current;
    
    return {
      temperature: Math.round(current.temp),
      feelsLike: Math.round(current.feels_like),
      humidity: current.humidity,
      wind: Math.round(current.wind_speed * 3.6), // Convert m/s to km/h
      windDirection: current.wind_deg,
      icon: current.weather[0].icon,
      description: current.weather[0].description,
      hourlyForecasts,
      dailyForecasts
    };
  } catch (error) {
    console.error('Weather forecast error:', error);
    
    // Fallback to simulated data if API fails
    return getSimulatedForecast();
  }
};

// Fallback function to generate simulated weather forecast based on current season
function getSimulatedForecast(): WeatherForecastData {
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
  const currentHour = now.getHours();
  
  for (let i = 0; i < 5; i++) {
    const hour = (currentHour + i * 3) % 24;
    const hourlyTemp = Math.round(currentTemp + (i === 0 ? 0 : (i < 3 ? 2 : -2)) + (Math.random() * 2 - 1));
    const isDayTime = hour >= 6 && hour < 20;
    const hourlyIcon = mainIcon.replace(/[dn]$/, isDayTime ? 'd' : 'n');
    
    hourlyForecasts.push({
      time: hour.toString().padStart(2, '0') + ':00',
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
  
  // Next 4 days with realistic progression
  const weatherProgression = getWeatherProgression(mainIcon);
  
  for (let i = 1; i <= 4; i++) {
    const dayTemp = Math.round(baseTemp + (Math.random() * 6 - 3));
    const dayIcon = weatherProgression[i % weatherProgression.length];
    
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
}

// Helper function to generate realistic weather pattern over days
function getWeatherProgression(startIcon: string): string[] {
  // Weather tends to have patterns that last a few days
  const patterns = {
    '01d': ['01d', '01d', '02d', '03d', '02d'], // Sunny → partly cloudy
    '02d': ['02d', '03d', '04d', '10d', '02d'], // Few clouds → rainy → clearing
    '03d': ['03d', '04d', '09d', '10d', '02d'], // Scattered → rain → clearing
    '04d': ['04d', '09d', '10d', '02d', '01d'], // Broken clouds → rain → clearing
    '09d': ['09d', '10d', '10d', '04d', '03d'], // Shower → rain → clouds
    '10d': ['10d', '04d', '03d', '02d', '01d'], // Rain → clearing
    '11d': ['11d', '10d', '04d', '03d', '02d'], // Thunderstorm → clearing
    '13d': ['13d', '13d', '04d', '03d', '02d'], // Snow → clearing
    '50d': ['50d', '04d', '03d', '02d', '01d']  // Mist → clearing
  };
  
  const baseIcon = startIcon.substring(0, 2) + 'd';
  return patterns[baseIcon as keyof typeof patterns] || patterns['01d'];
}

// Type definition for Google Maps API
declare global {
  interface Window {
    initMapForWeather: (() => void) | undefined;
    google?: any;
  }
}
