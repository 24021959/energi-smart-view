
// File per le funzioni di stima della produzione energetica
import { WeatherForecastData } from './types';
import { calculatePeakSunHours } from './utils';

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

// Helper function to estimate wind energy production based on weather
export const estimateWindProduction = (windSpeed: number): number => {
  // Wind turbines typically start producing at 3-4 m/s and reach peak at around 12-15 m/s
  // This is a simplified model for educational purposes
  
  const minWindSpeed = 3; // m/s - start producing
  const optimalWindSpeed = 12; // m/s - peak production
  const maxWindSpeed = 25; // m/s - cut-off for safety
  
  // Convert km/h to m/s if needed
  const windSpeedMS = windSpeed / 3.6;
  
  // No production below minimum wind speed
  if (windSpeedMS < minWindSpeed) return 0;
  
  // Safety cut-off above maximum wind speed
  if (windSpeedMS > maxWindSpeed) return 0;
  
  // Linear scaling between minimum and optimal
  if (windSpeedMS <= optimalWindSpeed) {
    return Math.round((windSpeedMS - minWindSpeed) / (optimalWindSpeed - minWindSpeed) * 100);
  }
  
  // Constant production at optimal and slight decrease after optimal
  return Math.round(100 - ((windSpeedMS - optimalWindSpeed) / (maxWindSpeed - optimalWindSpeed) * 20));
};

// Function to calculate estimated solar production in kWh
export const calculateSolarProductionKWh = (forecast: WeatherForecastData, systemCapacity: number = 6): number => {
  const solarProductionPercentage = estimateSolarProduction(forecast);
  const peakSunHours = calculatePeakSunHours(forecast.icon);
  return parseFloat(((systemCapacity * peakSunHours) * (solarProductionPercentage / 100)).toFixed(1));
};

// Function to calculate estimated wind production in kWh
export const calculateWindProductionKWh = (windSpeed: number, systemCapacity: number = 3): number => {
  const windProductionPercentage = estimateWindProduction(windSpeed);
  return parseFloat(((systemCapacity * 24) * (windProductionPercentage / 100) / 10).toFixed(1));
};
