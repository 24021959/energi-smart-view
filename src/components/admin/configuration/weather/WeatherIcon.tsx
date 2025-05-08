
import { Sun, Cloud, CloudRain, CloudSnow, CloudFog, CloudLightning, Wind } from "lucide-react";

interface WeatherIconProps {
  icon: string;
  className?: string;
}

export function WeatherIcon({ icon, className = "h-8 w-8" }: WeatherIconProps) {
  // Map OpenWeatherMap icon codes to Lucide icons
  try {
    if (!icon || typeof icon !== 'string') {
      return <Sun className={`${className} text-yellow-400`} />;
    }
    
    // Handle both full icon codes (e.g., "01d") and shortened versions (e.g., "01")
    const iconCode = icon.length >= 2 ? icon.substring(0, 2) : icon;
    
    switch (iconCode) {
      case '01': // clear sky
        return <Sun className={`${className} text-yellow-400`} />;
      case '02': // few clouds
      case '03': // scattered clouds
        return <Cloud className={`${className} text-gray-400`} />;
      case '04': // broken clouds
        return <Cloud className={`${className} text-gray-500`} />;
      case '09': // shower rain
      case '10': // rain
        return <CloudRain className={`${className} text-blue-400`} />;
      case '11': // thunderstorm
        return <CloudLightning className={`${className} text-purple-500`} />;
      case '13': // snow
        return <CloudSnow className={`${className} text-blue-200`} />;
      case '50': // mist
        return <CloudFog className={`${className} text-gray-400`} />;
      default:
        return <Sun className={`${className} text-yellow-400`} />;
    }
  } catch (error) {
    console.error("Error in WeatherIcon:", error);
    // Default to sun if there's any error
    return <Sun className={`${className} text-yellow-400`} />;
  }
}
