
import { WeatherForecastData, estimateSolarProduction } from "@/services/weatherService";
import { Card, CardContent } from "@/components/ui/card";
import { Thermometer } from "lucide-react";
import { WeatherIcon } from "./WeatherIcon";

interface DailyForecastProps {
  forecasts: WeatherForecastData[];
}

export function DailyForecast({ forecasts }: DailyForecastProps) {
  return (
    <>
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
                  <WeatherIcon iconCode={forecast.icon} />
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
    </>
  );
}
