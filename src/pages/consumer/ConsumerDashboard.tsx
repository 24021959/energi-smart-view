
import { ConsumerLayout } from '@/layouts/ConsumerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Receipt, TrendingDown, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ConsumerDashboard() {
  return (
    <ConsumerLayout title="Dashboard Consumatore">
      <div className="grid gap-4 md:gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Bentornato</h1>
          <Button asChild>
            <Link to="/consumer/bills/upload">
              <Receipt className="mr-2 h-4 w-4" />
              Carica una bolletta
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Consumo mensile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">487 kWh</div>
              <div className="text-xs text-muted-foreground mt-1">Maggio 2025</div>
              <div className="flex items-center text-xs text-green-600 mt-2">
                <TrendingDown className="mr-1 h-3 w-3" />
                <span>-2.5% rispetto al mese precedente</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Costo energia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€92,30</div>
              <div className="text-xs text-muted-foreground mt-1">Ultimo mese</div>
              <div className="flex items-center text-xs text-red-600 mt-2">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+1.8% rispetto al mese precedente</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Risparmio CER</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€12,45</div>
              <div className="text-xs text-muted-foreground mt-1">Ultimo mese</div>
              <div className="flex items-center text-xs text-green-600 mt-2">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+3.2% rispetto al mese precedente</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">CO₂ risparmiata</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42 kg</div>
              <div className="text-xs text-muted-foreground mt-1">Ultimo mese</div>
              <div className="flex items-center text-xs text-green-600 mt-2">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+5.7% rispetto al mese precedente</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Andamento consumi</CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              <div className="flex items-center justify-center h-64">
                <LineChart className="h-16 w-16 text-muted-foreground" />
                <p className="ml-4 text-sm text-muted-foreground">Grafico andamento consumi</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ultime bollette</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <div className="font-medium">Maggio 2025</div>
                  <div className="text-sm text-muted-foreground">487 kWh - €92,30</div>
                </div>
                <div className="border-b pb-2">
                  <div className="font-medium">Aprile 2025</div>
                  <div className="text-sm text-muted-foreground">499 kWh - €90,65</div>
                </div>
                <div className="border-b pb-2">
                  <div className="font-medium">Marzo 2025</div>
                  <div className="text-sm text-muted-foreground">512 kWh - €93,40</div>
                </div>
                <Button variant="outline" size="sm" asChild className="w-full mt-2">
                  <Link to="/consumer/bills">Visualizza tutte</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ConsumerLayout>
  );
}
