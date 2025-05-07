
import { toast } from '@/hooks/use-toast';

export interface WeatherForecastData {
  date: string;
  icon: string;
  description: string;
  temperature: number;
  feelsLike?: number;
  humidity: number;
  cloudiness: number;
  windSpeed: number;
  windDirection?: number;
  rainProbability: number;
  rainVolume?: number;
  pressure?: number;
  sunriseTime: string;
  sunsetTime: string;
  uvIndex?: number;
  hourlyForecasts?: HourlyForecast[];
}

export interface HourlyForecast {
  time: string;
  icon: string;
  temperature: number;
  rainProbability: number;
}

export interface GeoLocation {
  lat: number;
  lon: number;
}

// Declare global type for window.initMapForWeather
declare global {
  interface Window {
    initMapForWeather?: () => void;
  }
}

// OpenWeatherMap API key provided by the user
// Previous key: 72547ec8c6cb00d75320173614534a46
// Using a valid API key - This is a sample key, replace with a valid one for production
const API_KEY = "4d8fb5b93d4af21d66a2948710284366";

// Function to geocode a city name to coordinates
export const geocodeCity = async (city: string, country: string = "IT"): Promise<GeoLocation | null> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        lat: data[0].lat,
        lon: data[0].lon
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error geocoding city:", error);
    return null;
  }
};

// Function to fetch 5-day weather forecast with hourly data
export const fetchWeatherForecast = async (
  city: string, 
  country: string = "IT"
): Promise<WeatherForecastData[]> => {
  try {
    console.log(`Fetching weather data for ${city}, ${country} with API key: ${API_KEY.substring(0, 5)}...`);
    
    // First, geocode the city to get coordinates
    const location = await geocodeCity(city, country);
    
    if (!location) {
      throw new Error(`Could not geocode city: ${city}`);
    }
    
    // Then fetch the weather data using coordinates for more accurate results
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Weather API error details:", errorData);
      throw new Error(`Weather API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    console.log("Weather data received successfully for:", city);
    
    // Process the 5-day forecast (every 3 hours)
    const processedForecasts: WeatherForecastData[] = [];
    const dailyForecasts: {[key: string]: WeatherForecastData} = {};
    
    // Group forecasts by day
    data.list.forEach((forecast: any) => {
      const date = new Date(forecast.dt * 1000);
      const dateKey = date.toISOString().split('T')[0];
      
      const hourlyForecast: HourlyForecast = {
        time: date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
        icon: forecast.weather[0].icon,
        temperature: Math.round(forecast.main.temp),
        rainProbability: forecast.pop ? Math.round(forecast.pop * 100) : 0
      };
      
      if (!dailyForecasts[dateKey]) {
        // Use noon forecast as the main forecast for the day
        const isNoonForecast = date.getHours() >= 11 && date.getHours() <= 14;
        
        const sunriseTime = new Date(data.city.sunrise * 1000).toLocaleTimeString('it-IT', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
        const sunsetTime = new Date(data.city.sunset * 1000).toLocaleTimeString('it-IT', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
        dailyForecasts[dateKey] = {
          date: date.toLocaleDateString('it-IT', { weekday: 'short', day: '2-digit', month: '2-digit' }),
          icon: forecast.weather[0].icon,
          description: forecast.weather[0].description,
          temperature: Math.round(forecast.main.temp),
          feelsLike: Math.round(forecast.main.feels_like),
          humidity: forecast.main.humidity,
          pressure: forecast.main.pressure,
          cloudiness: forecast.clouds.all,
          windSpeed: Math.round(forecast.wind.speed * 3.6), // Convert from m/s to km/h
          windDirection: forecast.wind.deg,
          rainProbability: forecast.pop ? Math.round(forecast.pop * 100) : 0,
          rainVolume: forecast.rain ? forecast.rain['3h'] : 0,
          sunriseTime,
          sunsetTime,
          hourlyForecasts: [hourlyForecast]
        };
        
        // If this is noon forecast, prioritize it
        if (isNoonForecast) {
          processedForecasts.push(dailyForecasts[dateKey]);
        }
      } else {
        // Add this as an hourly forecast
        if (!dailyForecasts[dateKey].hourlyForecasts) {
          dailyForecasts[dateKey].hourlyForecasts = [];
        }
        dailyForecasts[dateKey].hourlyForecasts!.push(hourlyForecast);
      }
    });
    
    // Make sure we have exactly 5 days
    const allDays = Object.values(dailyForecasts);
    allDays.sort((a, b) => {
      const dateA = new Date(a.date.split(' ')[1].split('/').reverse().join('/'));
      const dateB = new Date(b.date.split(' ')[1].split('/').reverse().join('/'));
      return dateA.getTime() - dateB.getTime();
    });
    
    // Take the first 5 days
    return allDays.slice(0, 5);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    toast({
      variant: "destructive",
      title: "Errore",
      description: "Impossibile caricare i dati meteo"
    });
    return [];
  }
};

// Function to estimate solar production based on weather conditions
export const estimateSolarProduction = (forecast: WeatherForecastData): number => {
  // Simple solar production estimation based on cloudiness and time of day
  // 100% - cloudiness percentage gives a basic estimate
  // In a real application, this would be much more sophisticated
  const baseProduction = 100 - forecast.cloudiness;
  
  // Adjust based on rain probability
  const rainAdjustment = 1 - (forecast.rainProbability / 100) * 0.5;
  
  // Return a value between 0-100%
  return Math.max(0, Math.min(100, Math.round(baseProduction * rainAdjustment)));
};

// Function to get wind direction as text
export const getWindDirectionText = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};
