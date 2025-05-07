
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, CloudSnow, Wind, Thermometer, Droplets, Waves, ArrowDown, ArrowUp, Navigation, Map } from "lucide-react";
import { fetchWeatherForecast, geocodeCity, estimateSolarProduction, getWindDirectionText, WeatherForecastData, GeoLocation } from "@/services/weatherService";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader } from "@googlemaps/js-api-loader";

// Add Google Maps type declaration
declare global {
  interface Window {
    google: any;
  }
}

interface WeatherForecastProps {
  city: string;
  province: string;
}

// Fixed Google Maps API key
const GOOGLE_MAPS_API_KEY = "AIzaSyCvR92r28e114VivIzlQHWlLomEJ_gqzJg";

export function WeatherForecast({ city, province }: WeatherForecastProps) {
  const [forecasts, setForecasts] = useState<WeatherForecastData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("forecast");
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const marker = useRef<any>(null);

  useEffect(() => {
    const loadWeatherData = async () => {
      setIsLoading(true);
      if (city) {
        try {
          // Get location first
          const locationData = await geocodeCity(city);
          setLocation(locationData);
          
          // Then get forecast
          const data = await fetchWeatherForecast(city);
          setForecasts(data);
        } catch (error) {
          console.error("Error in weather data loading:", error);
        }
      }
      setIsLoading(false);
    };

    loadWeatherData();
  }, [city]);
  
  // Initialize map once we have location
  useEffect(() => {
    if (!location || !mapContainer.current || currentTab !== "map") {
      return;
    }

    const initMap = async () => {
      try {
        console.log("Initializing map for location:", location);
        
        // Load Google Maps with fixed API key
        const loader = new Loader({
          apiKey: GOOGLE_MAPS_API_KEY,
          version: "weekly",
        });

        await loader.load();
        console.log("Google Maps API loaded successfully");
        
        // Initialize map
        const position = { lat: location.lat, lng: location.lon };
        
        if (!mapContainer.current) {
          console.error("Map container ref is null");
          return;
        }
        
        console.log("Creating map with position:", position);
        map.current = new window.google.maps.Map(mapContainer.current, {
          center: position,
          zoom: 10,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP
        });
        
        // Add a marker for the city
        marker.current = new window.google.maps.Marker({
          position,
          map: map.current,
          title: city
        });
        
        console.log("Map initialized successfully");
        
        // Reset error if previously set
        setMapError(null);
      } catch (error) {
        console.error("Map initialization error:", error);
        setMapError("Errore nell'inizializzazione della mappa. Per favore riprova più tardi.");
      }
    };
    
    // Clear previous map instance if it exists
    if (map.current) {
      map.current = null;
      marker.current = null;
    }
    
    initMap();
    
    // Clean up on unmount
    return () => {
      if (map.current) {
        // No explicit cleanup needed for Google Maps
        map.current = null;
      }
    };
  }, [location, currentTab, city]);

  const getWeatherIcon = (iconCode: string, size: "sm" | "md" | "lg" = "md") => {
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
          <Skeleton className="h-[400px] w-full mb-4" />
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
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="forecast" className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <span>Previsioni</span>
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                <span>Mappa</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="forecast" className="space-y-4">
              {/* Today's weather details card */}
              {forecasts[0] && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Oggi: {forecasts[0].date}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 flex items-center">
                      <div className="mr-4">
                        {getWeatherIcon(forecasts[0].icon, "lg")}
                      </div>
                      <div>
                        <div className="text-3xl font-bold">{forecasts[0].temperature}°C</div>
                        <div className="text-gray-600 capitalize">{forecasts[0].description}</div>
                        <div className="text-sm text-gray-500">Percepita: {forecasts[0].feelsLike}°C</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center">
                          <Droplets className="h-5 w-5 mr-2 text-blue-500" />
                          <div>
                            <div className="text-sm text-gray-500">Umidità</div>
                            <div className="font-medium">{forecasts[0].humidity}%</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Wind className="h-5 w-5 mr-2 text-gray-500" />
                          <div>
                            <div className="text-sm text-gray-500">Vento</div>
                            <div className="font-medium">
                              {forecasts[0].windSpeed} km/h 
                              {forecasts[0].windDirection && (
                                <span className="ml-1">
                                  {getWindDirectionText(forecasts[0].windDirection)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <CloudRain className="h-5 w-5 mr-2 text-blue-400" />
                          <div>
                            <div className="text-sm text-gray-500">Prob. pioggia</div>
                            <div className="font-medium">{forecasts[0].rainProbability}%</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Cloud className="h-5 w-5 mr-2 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">Nuvolosità</div>
                            <div className="font-medium">{forecasts[0].cloudiness}%</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <ArrowUp className="h-5 w-5 mr-2 text-yellow-500" />
                          <div>
                            <div className="text-sm text-gray-500">Alba</div>
                            <div className="font-medium">{forecasts[0].sunriseTime}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <ArrowDown className="h-5 w-5 mr-2 text-orange-500" />
                          <div>
                            <div className="text-sm text-gray-500">Tramonto</div>
                            <div className="font-medium">{forecasts[0].sunsetTime}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Hourly forecast scrollable section */}
              {forecasts[0]?.hourlyForecasts && forecasts[0].hourlyForecasts.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-md font-medium mb-2">Previsioni orarie</h3>
                  <div className="flex overflow-x-auto pb-2 gap-3">
                    {forecasts[0].hourlyForecasts.map((hourly, idx) => (
                      <div key={idx} className="flex-shrink-0 border rounded-lg p-3 text-center w-24">
                        <div className="text-sm font-medium">{hourly.time}</div>
                        <div className="flex justify-center my-1">
                          {getWeatherIcon(hourly.icon, "sm")}
                        </div>
                        <div className="font-medium">{hourly.temperature}°C</div>
                        <div className="text-xs text-gray-500">{hourly.rainProbability}% pioggia</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* 5-day forecast */}
              <h3 className="text-md font-medium mb-2">Previsioni 5 giorni</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {forecasts.map((forecast, index) => {
                  const productionEstimate = estimateSolarProduction(forecast);
                  
                  return (
                    <Card key={index} className={`border ${index === 0 ? 'bg-blue-50' : ''}`}>
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
                        <div className="text-sm text-center text-gray-600 mb-2 capitalize">
                          {forecast.description}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs text-center mb-3">
                          <div>
                            <div className="text-gray-500">Umidità</div>
                            <div>{forecast.humidity}%</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Vento</div>
                            <div>{forecast.windSpeed} km/h</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Prob. pioggia</div>
                            <div>{forecast.rainProbability}%</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Nuvolosità</div>
                            <div>{forecast.cloudiness}%</div>
                          </div>
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
            </TabsContent>
            
            <TabsContent value="map">
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-gray-200">
                <div ref={mapContainer} className="absolute inset-0" />
                
                {!location && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <p>Impossibile caricare la posizione per questa località.</p>
                  </div>
                )}
                
                {mapError && (
                  <div className="absolute inset-0 flex items-center justify-center flex-col bg-gray-100 p-4">
                    <p className="text-red-500 mb-2">{mapError}</p>
                  </div>
                )}
              </div>
              
              {/* Weather summary below map */}
              {forecasts[0] && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    {getWeatherIcon(forecasts[0].icon, "md")}
                    <div className="ml-3">
                      <div className="font-medium">{forecasts[0].temperature}°C - {forecasts[0].description}</div>
                      <div className="text-sm text-gray-500">{city}, {province}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">Produzione energetica stimata</div>
                    <div className="font-medium">
                      {estimateSolarProduction(forecasts[0])}%
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="text-xs text-center mt-4 text-gray-500">
            *La stima della produzione è basata su condizioni meteo previste e può variare
          </div>
        </CardContent>
      </Card>
    </>
  );
}
