
import { toast } from '@/hooks/use-toast';

export interface WeatherForecastData {
  date: string;
  icon: string;
  description: string;
  temperature: number;
  humidity: number;
  cloudiness: number;
  windSpeed: number;
  rainProbability: number;
  sunriseTime: string;
  sunsetTime: string;
}

// OpenWeatherMap API key provided by the user
// Previous key: 72547ec8c6cb00d75320173614534a46
// Using a valid API key - This is a sample key, replace with a valid one for production
const API_KEY = "4d8fb5b93d4af21d66a2948710284366";

// Function to fetch 5-day weather forecast
export const fetchWeatherForecast = async (
  city: string, 
  country: string = "IT"
): Promise<WeatherForecastData[]> => {
  try {
    console.log(`Fetching weather data for ${city}, ${country} with API key: ${API_KEY.substring(0, 5)}...`);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Weather API error details:", errorData);
      throw new Error(`Weather API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    console.log("Weather data received successfully for:", city);
    
    // Process the 5-day forecast (every 3 hours, we'll take one reading per day)
    const processedForecasts: WeatherForecastData[] = [];
    const dailyForecasts: {[key: string]: boolean} = {};
    
    data.list.forEach((forecast: any) => {
      const date = new Date(forecast.dt * 1000);
      const dateKey = date.toISOString().split('T')[0];
      
      // Only take one forecast per day (around noon)
      if (!dailyForecasts[dateKey] && date.getHours() >= 11 && date.getHours() <= 14) {
        dailyForecasts[dateKey] = true;
        
        const sunriseTime = new Date(data.city.sunrise * 1000).toLocaleTimeString('it-IT', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
        const sunsetTime = new Date(data.city.sunset * 1000).toLocaleTimeString('it-IT', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
        processedForecasts.push({
          date: date.toLocaleDateString('it-IT', { weekday: 'short', day: '2-digit', month: '2-digit' }),
          icon: forecast.weather[0].icon,
          description: forecast.weather[0].description,
          temperature: Math.round(forecast.main.temp),
          humidity: forecast.main.humidity,
          cloudiness: forecast.clouds.all,
          windSpeed: forecast.wind.speed,
          rainProbability: forecast.pop ? Math.round(forecast.pop * 100) : 0,
          sunriseTime,
          sunsetTime
        });
      }
    });
    
    return processedForecasts;
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
  return Math.max(0, Math.min(100, baseProduction * rainAdjustment));
};
