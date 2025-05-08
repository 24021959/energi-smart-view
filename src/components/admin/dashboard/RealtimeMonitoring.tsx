
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RealtimeEnergyChart } from "./RealtimeEnergyChart";

export function RealtimeMonitoring() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Monitoraggio Energetico in Tempo Reale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <RealtimeEnergyChart />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Produzione Attuale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-800">15.7 kW</div>
            <div className="flex items-center mt-2">
              <div className="w-full bg-green-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full animate-pulse" style={{ width: '68%' }}></div>
              </div>
              <span className="ml-2 text-sm text-green-800">68%</span>
            </div>
            <p className="text-xs text-green-700 mt-2">
              della capacità massima
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Consumo Attuale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-800">18.3 kW</div>
            <div className="flex items-center mt-2">
              <div className="w-full bg-blue-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full animate-pulse" style={{ width: '42%' }}></div>
              </div>
              <span className="ml-2 text-sm text-blue-800">42%</span>
            </div>
            <p className="text-xs text-blue-700 mt-2">
              del consumo massimo storico
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Autoconsumo Attuale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-purple-800">85.8%</div>
            <div className="flex items-center mt-2">
              <div className="w-full bg-purple-200 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full animate-pulse" style={{ width: '85.8%' }}></div>
              </div>
              <span className="ml-2 text-sm text-purple-800">85.8%</span>
            </div>
            <p className="text-xs text-purple-700 mt-2">
              dell'energia prodotta viene autoconsumata
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
