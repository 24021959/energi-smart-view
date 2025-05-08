
// File per i dati meteo simulati
import { WeatherForecastData, DailyForecastData, HourlyForecastData } from './types';
import { getDayNameInItalian, formatDateInItalian } from './utils';

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

// Fallback function to generate simulated weather forecast based on current season
export function getSimulatedForecast(): WeatherForecastData {
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
  const hourlyForecasts: HourlyForecastData[] = [];
  const currentHour = now.getHours();
  
  for (let i = 0; i < 8; i++) {
    const hour = (currentHour + i * 3) % 24;
    const hourlyTemp = Math.round(currentTemp + (i === 0 ? 0 : (i < 3 ? 2 : -2)) + (Math.random() * 2 - 1));
    const isDayTime = hour >= 6 && hour < 20;
    const hourlyIcon = mainIcon.replace(/[dn]$/, isDayTime ? 'd' : 'n');
    
    hourlyForecasts.push({
      time: hour.toString().padStart(2, '0') + ':00',
      temperature: hourlyTemp,
      icon: hourlyIcon,
      windSpeed: Math.round(windSpeed + (Math.random() * 4 - 2)),
      windDirection: Math.round(Math.random() * 360),
      precipitation: Math.round(Math.random() * 30)
    });
  }
  
  // Generate daily forecasts (today + next 7 days)
  const dailyForecasts: DailyForecastData[] = [];
  
  // Today
  dailyForecasts.push({
    day: 'Oggi',
    date: formatDateInItalian(now),
    maxTemp: Math.round(currentTemp + tempRange/2),
    minTemp: Math.round(currentTemp - tempRange/2),
    icon: mainIcon,
    description: description,
    windSpeed: Math.round(windSpeed + (Math.random() * 5 - 2)),
    precipitation: Math.round(Math.random() * 40),
    humidity: Math.round(humidity + (Math.random() * 10 - 5))
  });
  
  // Next 7 days with realistic progression
  const weatherProgression = getWeatherProgression(mainIcon);
  
  for (let i = 1; i <= 7; i++) {
    const dayTemp = Math.round(baseTemp + (Math.random() * 6 - 3));
    const dayIcon = weatherProgression[i % weatherProgression.length];
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + i);
    
    dailyForecasts.push({
      day: getDayNameInItalian(i),
      date: formatDateInItalian(futureDate),
      maxTemp: Math.round(dayTemp + tempRange/2),
      minTemp: Math.round(dayTemp - tempRange/2),
      icon: dayIcon,
      description: description,
      windSpeed: Math.round(windSpeed + (Math.random() * 5 - 2)),
      precipitation: Math.round(Math.random() * 40),
      humidity: Math.round(humidity + (Math.random() * 10 - 5))
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
    dailyForecasts: dailyForecasts,
    uv: Math.random() * 7,
    pressure: 1010 + Math.random() * 5
  };
}
