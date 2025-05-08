
import { ProducerLayout } from '@/layouts/ProducerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Receipt, TrendingDown, TrendingUp, Zap, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProducerDashboard() {
  return (
    <ProducerLayout title="Dashboard Produttore">
      <div className="grid gap-4 md:gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Bentornato</h1>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link to="/producer/statistics">
                <Activity className="mr-2 h-4 w-4" />
                Statistiche
              </Link>
            </Button>
            <Button asChild>
              <Link to="/producer/production">
                <Zap className="mr-2 h-4 w-4" />
                Produzione
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Produzione mensile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">842 kWh</div>
              <div className="text-xs text-muted-foreground mt-1">Maggio 2025</div>
              <div className="flex items-center text-xs text-green-600 mt-2">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+3.8% rispetto al mese precedente</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Guadagno CER</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€118,50</div>
              <div className="text-xs text-muted-foreground mt-1">Ultimo mese</div>
              <div className="flex items-center text-xs text-green-600 mt-2">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+2.7% rispetto al mese precedente</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Efficienza impianti</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96%</div>
              <div className="text-xs text-muted-foreground mt-1">Media ultimo mese</div>
              <div className="flex items-center text-xs text-green-600 mt-2">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+0.8% rispetto al mese precedente</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">CO₂ evitata</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">320 kg</div>
              <div className="text-xs text-muted-foreground mt-1">Ultimo mese</div>
              <div className="flex items-center text-xs text-green-600 mt-2">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+4.2% rispetto al mese precedente</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Andamento produzione</CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              <div className="flex items-center justify-center h-64">
                <LineChart className="h-16 w-16 text-muted-foreground" />
                <p className="ml-4 text-sm text-muted-foreground">Grafico andamento produzione</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ultime fatture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <div className="font-medium">Maggio 2025</div>
                  <div className="text-sm text-muted-foreground">842 kWh - €118,50 (credito)</div>
                </div>
                <div className="border-b pb-2">
                  <div className="font-medium">Aprile 2025</div>
                  <div className="text-sm text-muted-foreground">810 kWh - €115,40 (credito)</div>
                </div>
                <div className="border-b pb-2">
                  <div className="font-medium">Marzo 2025</div>
                  <div className="text-sm text-muted-foreground">795 kWh - €112,70 (credito)</div>
                </div>
                <Button variant="outline" size="sm" asChild className="w-full mt-2">
                  <Link to="/producer/bills">Visualizza tutte</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProducerLayout>
  );
}
