
// File per le chiamate API meteo
import { WeatherForecastData } from './types';
import { getDayNameInItalian, formatDateInItalian } from './utils';
import { geocodeCity } from './geocoding';
import { getSimulatedForecast } from './simulation';

// Function to fetch real weather forecast data from OpenWeatherMap
export const fetchWeatherForecast = async (city: string, province?: string): Promise<WeatherForecastData> => {
  try {
    // Get coordinates first
    const location = await geocodeCity(city);
    
    // Fetch current weather using OneCall API 3.0
    const apiKey = '72547ec8c6cb00d75320173614534a46'; // API key fornita dall'utente
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lng}&units=metric&exclude=minutely&lang=it&appid=${apiKey}`);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Format hourly forecasts (next 24 hours, every 3 hours)
    const hourlyForecasts = data.hourly.slice(0, 8).map((hour: any) => ({
      time: new Date(hour.dt * 1000).getHours().toString().padStart(2, '0') + ':00',
      temperature: Math.round(hour.temp),
      icon: hour.weather[0].icon,
      windSpeed: Math.round(hour.wind_speed * 3.6), // Convert m/s to km/h
      windDirection: hour.wind_deg,
      precipitation: hour.pop * 100 // Probability of precipitation in percentage
    }));
    
    // Format daily forecasts (today + next 7 days)
    const dailyForecasts = data.daily.slice(0, 8).map((day: any, index: number) => {
      const date = new Date(day.dt * 1000);
      return {
        day: index === 0 ? 'Oggi' : getDayNameInItalian(index),
        date: formatDateInItalian(date),
        maxTemp: Math.round(day.temp.max),
        minTemp: Math.round(day.temp.min),
        icon: day.weather[0].icon,
        description: day.weather[0].description,
        windSpeed: Math.round(day.wind_speed * 3.6), // Convert m/s to km/h
        precipitation: day.pop * 100, // Probability of precipitation in percentage
        humidity: day.humidity
      };
    });
    
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
      dailyForecasts,
      uv: current.uvi,
      pressure: current.pressure,
      windGust: current.wind_gust ? Math.round(current.wind_gust * 3.6) : undefined // Convert m/s to km/h if available
    };
  } catch (error) {
    console.error('Weather forecast error:', error);
    
    // Fallback to simulated data if API fails
    return getSimulatedForecast();
  }
};
