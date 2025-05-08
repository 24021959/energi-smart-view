
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Map } from "lucide-react";
import { fetchWeatherForecast, geocodeCity, WeatherForecastData, GeoLocation } from "@/services/weatherService";
import { Skeleton } from "@/components/ui/skeleton";
import { TodayForecast } from "./weather/TodayForecast";
import { HourlyForecast } from "./weather/HourlyForecast";
import { DailyForecast } from "./weather/DailyForecast";
import { GoogleMap } from "./weather/GoogleMap";
import { MapWeatherSummary } from "./weather/MapWeatherSummary";
import { toast } from "@/hooks/use-toast";

interface WeatherForecastProps {
  city: string;
  province: string;
}

export function WeatherForecast({ city, province }: WeatherForecastProps) {
  const [forecast, setForecast] = useState<WeatherForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState<GeoLocation | null>(null);

  useEffect(() => {
    const loadWeatherData = async () => {
      setIsLoading(true);
      if (city) {
        try {
          // Get location first
          const locationData = await geocodeCity(city);
          setLocation(locationData);
          
          // Then get forecast
          const data = await fetchWeatherForecast(city, province);
          setForecast(data);
        } catch (error) {
          console.error("Error in weather data loading:", error);
          toast({
            variant: "destructive",
            title: "Errore",
            description: "Impossibile caricare i dati meteo. Riprova più tardi."
          });
        }
      }
      setIsLoading(false);
    };

    loadWeatherData();
  }, [city, province]);
  
  // Get current date and time
  const now = new Date();
  const formattedDateTime = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

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
          <Skeleton className="h-[400px] w-full mb-4" />
        </CardContent>
      </Card>
    );
  }

  if (!forecast) {
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
    <>
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Sun className="mr-2 h-5 w-5" />
              <span>Previsioni Meteo e Produzione Energetica per {city}, {province}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Vista combinata: mappa e previsioni meteo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Mappa Google */}
            <div>
              {location && <GoogleMap city={city} location={location} />}
            </div>
            
            {/* Previsioni meteo attuali */}
            <div>
              <TodayForecast forecast={forecast} />
            </div>
          </div>
          
          {/* Weather summary below map */}
          <MapWeatherSummary 
            forecast={forecast} 
            city={city} 
            province={province}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Previsioni orarie */}
            <div>
              {forecast.hourlyForecasts && 
                <HourlyForecast hourlyForecasts={forecast.hourlyForecasts} />}
            </div>
            
            {/* Previsioni 5 giorni */}
            <div>
              {forecast.dailyForecasts && 
                <DailyForecast forecasts={forecast.dailyForecasts} />}
            </div>
          </div>
          
          <div className="text-xs text-center mt-4 text-gray-500">
            *La stima della produzione è basata su condizioni meteo previste e può variare. 
            Ultimo aggiornamento: {formattedDateTime}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
