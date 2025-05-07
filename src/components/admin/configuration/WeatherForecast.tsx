
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, CloudSnow, Wind, Thermometer } from "lucide-react";
import { fetchWeatherForecast, estimateSolarProduction, WeatherForecast } from "@/services/weatherService";
import { Skeleton } from "@/components/ui/skeleton";

interface WeatherForecastProps {
  city: string;
  province: string;
}

export function WeatherForecast({ city, province }: WeatherForecastProps) {
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWeatherData = async () => {
      setIsLoading(true);
      if (city) {
        const data = await fetchWeatherForecast(city);
        setForecasts(data);
      }
      setIsLoading(false);
    };

    loadWeatherData();
  }, [city]);

  const getWeatherIcon = (iconCode: string) => {
    // Map OpenWeatherMap icon codes to Lucide icons
    if (iconCode.includes('01')) return <Sun className="h-8 w-8 text-yellow-400" />;
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) 
      return <Cloud className="h-8 w-8 text-gray-400" />;
    if (iconCode.includes('09') || iconCode.includes('10')) 
      return <CloudRain className="h-8 w-8 text-blue-400" />;
    if (iconCode.includes('13')) 
      return <CloudSnow className="h-8 w-8 text-blue-200" />;
    return <Wind className="h-8 w-8 text-gray-500" />;
  };

  if (isLoading) {
    return (
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sun className="mr-2 h-5 w-5" />
            <span>Previsioni Meteo e Produzione Energetica</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 justify-between">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="border w-[150px]">
                <CardContent className="p-4">
                  <Skeleton className="h-8 w-8 mb-2" />
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-4 w-12 mb-2" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (forecasts.length === 0) {
    return (
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sun className="mr-2 h-5 w-5" />
            <span>Previsioni Meteo e Produzione Energetica</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-6 text-gray-500">
            Impossibile caricare i dati meteo per {city || "questa località"}.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sun className="mr-2 h-5 w-5" />
          <span>Previsioni Meteo e Produzione Energetica per {city}, {province}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 justify-between">
          {forecasts.map((forecast, index) => {
            const productionEstimate = estimateSolarProduction(forecast);
            
            return (
              <Card key={index} className="border">
                <CardContent className="p-4">
                  <div className="text-center mb-2 font-medium">
                    {forecast.date}
                  </div>
                  <div className="flex items-center justify-center mb-2">
                    {getWeatherIcon(forecast.icon)}
                  </div>
                  <div className="text-center mb-1">
                    <div className="flex items-center justify-center">
                      <Thermometer className="h-4 w-4 mr-1" />
                      <span>{forecast.temperature}°C</span>
                    </div>
                  </div>
                  <div className="text-sm text-center text-gray-600 mb-2">
                    {forecast.description}
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <div className="text-sm text-center">
                      Produzione stimata:
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full ${
                          productionEstimate > 70
                            ? "bg-green-500"
                            : productionEstimate > 40
                            ? "bg-yellow-400"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${productionEstimate}%` }}
                      />
                    </div>
                    <div className="text-sm text-center mt-1 font-medium">
                      {productionEstimate}%
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="text-xs text-center mt-4 text-gray-500">
          *La stima della produzione è basata su condizioni meteo previste e può variare
        </div>
      </CardContent>
    </Card>
  );
}
