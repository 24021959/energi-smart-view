
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Users, LightbulbIcon, GaugeIcon } from "lucide-react";
import { EnergyWeekChart } from "./EnergyWeekChart";

export function DashboardOverview() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Produzione Energetica Card */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produzione Energetica</CardTitle>
            <LightbulbIcon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-900">573.4 kWh</div>
                <p className="text-xs text-green-700 flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +12% rispetto a ieri
                </p>
              </div>
              <div className="text-xs text-right text-green-800">
                <div>Oggi</div>
                <div className="font-bold text-lg">42.8 kWh</div>
              </div>
            </div>
            <div className="mt-4 h-16">
              <EnergyWeekChart type="production" />
            </div>
          </CardContent>
        </Card>

        {/* Consumo Energetico Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consumo Energetico</CardTitle>
            <GaugeIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-900">652.7 kWh</div>
                <p className="text-xs text-blue-700 flex items-center">
                  <TrendingDown className="mr-1 h-3 w-3" />
                  -5% rispetto a ieri
                </p>
              </div>
              <div className="text-xs text-right text-blue-800">
                <div>Oggi</div>
                <div className="font-bold text-lg">48.2 kWh</div>
              </div>
            </div>
            <div className="mt-4 h-16">
              <EnergyWeekChart type="consumption" />
            </div>
          </CardContent>
        </Card>

        {/* Energia Condivisa Card */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energia Condivisa</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-purple-600"
            >
              <path d="M8 18L12 22L16 18" />
              <path d="M12 2V22" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-900">217.6 kWh</div>
                <p className="text-xs text-purple-700 flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +15% rispetto a ieri
                </p>
              </div>
              <div className="text-xs text-right text-purple-800">
                <div>Indice di condivisione</div>
                <div className="font-bold text-lg">38%</div>
              </div>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2.5 mt-4">
              <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '38%' }}></div>
            </div>
          </CardContent>
        </Card>

        {/* Membri Attivi Card */}
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Membri Attivi</CardTitle>
            <Users className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-amber-900">24</div>
                <p className="text-xs text-amber-700 flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +2 nell'ultimo mese
                </p>
              </div>
              <div className="text-xs text-right text-amber-800">
                <div className="font-bold text-lg">18 kWh</div>
                <div>Media per membro</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <div className="bg-amber-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs">P</div>
              <div className="text-xs">8 Produttori</div>
              <div className="bg-amber-400 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs ml-2">C</div>
              <div className="text-xs">16 Consumatori</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
