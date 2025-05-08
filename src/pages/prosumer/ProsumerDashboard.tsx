
import { ProsumerLayout } from '@/layouts/ProsumerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Receipt, TrendingDown, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProsumerDashboard() {
  return (
    <ProsumerLayout title="Dashboard Prosumer">
      <div className="grid gap-4 md:gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Bentornato</h1>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link to="/prosumer/production">
                <Zap className="mr-2 h-4 w-4" />
                Produzione
              </Link>
            </Button>
            <Button asChild>
              <Link to="/prosumer/bills/upload">
                <Receipt className="mr-2 h-4 w-4" />
                Carica una bolletta
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Consumo mensile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">543 kWh</div>
              <div className="text-xs text-muted-foreground mt-1">Maggio 2025</div>
              <div className="flex items-center text-xs text-green-600 mt-2">
                <TrendingDown className="mr-1 h-3 w-3" />
                <span>-1.2% rispetto al mese precedente</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Produzione mensile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">678 kWh</div>
              <div className="text-xs text-muted-foreground mt-1">Maggio 2025</div>
              <div className="flex items-center text-xs text-green-600 mt-2">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+5.3% rispetto al mese precedente</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Bilancio energia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+135 kWh</div>
              <div className="text-xs text-muted-foreground mt-1">Ultimo mese</div>
              <div className="flex items-center text-xs text-green-600 mt-2">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+7.8% rispetto al mese precedente</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Guadagno CER</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€48,60</div>
              <div className="text-xs text-muted-foreground mt-1">Ultimo mese</div>
              <div className="flex items-center text-xs text-green-600 mt-2">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+3.4% rispetto al mese precedente</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Andamento produzione e consumi</CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              <div className="flex items-center justify-center h-64">
                <LineChart className="h-16 w-16 text-muted-foreground" />
                <p className="ml-4 text-sm text-muted-foreground">Grafico andamento produzione e consumi</p>
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
                  <div className="text-sm text-muted-foreground">543 kWh - €48,60 (credito)</div>
                </div>
                <div className="border-b pb-2">
                  <div className="font-medium">Aprile 2025</div>
                  <div className="text-sm text-muted-foreground">550 kWh - €47,00 (credito)</div>
                </div>
                <div className="border-b pb-2">
                  <div className="font-medium">Marzo 2025</div>
                  <div className="text-sm text-muted-foreground">538 kWh - €42,80 (credito)</div>
                </div>
                <Button variant="outline" size="sm" asChild className="w-full mt-2">
                  <Link to="/prosumer/bills">Visualizza tutte</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProsumerLayout>
  );
}
