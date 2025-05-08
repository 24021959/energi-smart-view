
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MonthlyEnergyChart } from "./MonthlyEnergyChart";
import { MonthlyEnergyTable } from "./MonthlyEnergyTable";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function HistoricalData() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Andamento Produzione e Consumo</CardTitle>
            <CardDescription>Ultimi 30 giorni</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Esporta</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <MonthlyEnergyChart />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Riepilogo Mensile</CardTitle>
            <CardDescription>Ultimi 12 mesi</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>CSV</span>
          </Button>
        </CardHeader>
        <CardContent>
          <MonthlyEnergyTable />
        </CardContent>
      </Card>
    </div>
  );
}
