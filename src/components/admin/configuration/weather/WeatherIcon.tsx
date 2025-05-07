
import { Sun, Cloud, CloudRain, CloudSnow, Wind } from "lucide-react";

interface WeatherIconProps {
  iconCode: string;
  size?: "sm" | "md" | "lg";
}

export function WeatherIcon({ iconCode, size = "md" }: WeatherIconProps) {
  const sizeMap = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };
  const className = sizeMap[size];
  
  // Map OpenWeatherMap icon codes to Lucide icons
  if (iconCode.includes('01')) return <Sun className={`${className} text-yellow-400`} />;
  if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) 
    return <Cloud className={`${className} text-gray-400`} />;
  if (iconCode.includes('09') || iconCode.includes('10')) 
    return <CloudRain className={`${className} text-blue-400`} />;
  if (iconCode.includes('13')) 
    return <CloudSnow className={`${className} text-blue-200`} />;
  return <Wind className={`${className} text-gray-500`} />;
}
