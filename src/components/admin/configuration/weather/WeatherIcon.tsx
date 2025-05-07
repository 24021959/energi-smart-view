
import { Sun, Cloud, CloudRain, CloudSnow, Wind } from "lucide-react";

interface WeatherIconProps {
  icon: string;
  className?: string;
}

export function WeatherIcon({ icon, className = "h-8 w-8" }: WeatherIconProps) {
  // Map OpenWeatherMap icon codes to Lucide icons
  if (!icon) return <Sun className={`${className} text-yellow-400`} />;
  
  if (icon.includes('01')) return <Sun className={`${className} text-yellow-400`} />;
  if (icon.includes('02') || icon.includes('03') || icon.includes('04')) 
    return <Cloud className={`${className} text-gray-400`} />;
  if (icon.includes('09') || icon.includes('10')) 
    return <CloudRain className={`${className} text-blue-400`} />;
  if (icon.includes('13')) 
    return <CloudSnow className={`${className} text-blue-200`} />;
  return <Wind className={`${className} text-gray-500`} />;
}
