
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MemberEnergyChartProps {
  memberId: number;
}

const MemberEnergyChart = ({ memberId }: MemberEnergyChartProps) => {
  // Mock data - would be fetched from an API in a real implementation
  const monthlyData = [
    { month: 'Gen', produzione: 0, consumo: 240 },
    { month: 'Feb', produzione: 0, consumo: 220 },
    { month: 'Mar', produzione: 0, consumo: 280 },
    { month: 'Apr', produzione: 0, consumo: 320 },
    { month: 'Mag', produzione: 0, consumo: 400 },
    { month: 'Giu', produzione: 0, consumo: 380 },
  ];
  
  const dailyData = [
    { time: '00:00', consumo: 3.2 },
    { time: '03:00', consumo: 2.8 },
    { time: '06:00', consumo: 3.5 },
    { time: '09:00', consumo: 5.2 },
    { time: '12:00', consumo: 6.8 },
    { time: '15:00', consumo: 7.3 },
    { time: '18:00', consumo: 8.1 },
    { time: '21:00', consumo: 5.4 },
  ];

  // For producers or prosumers, we would have production data as well
  const isProsumer = false;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Dati Energetici</CardTitle>
          <CardDescription>
            Analisi dei consumi energetici
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          <span>Esporta</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="monthly">Mensile</TabsTrigger>
            <TabsTrigger value="daily">Giornaliero</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monthly" className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis 
                    dataKey="month" 
                    tickLine={false} 
                    axisLine={{ stroke: '#E5E7EB' }}
                  />
                  <YAxis 
                    tickLine={false} 
                    axisLine={{ stroke: '#E5E7EB' }}
                    label={{ value: 'kWh', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip />
                  <Legend />
                  {isProsumer && (
                    <Bar dataKey="produzione" fill="#4ade80" name="Produzione (kWh)" />
                  )}
                  <Bar dataKey="consumo" fill="#3b82f6" name="Consumo (kWh)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="daily" className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dailyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis 
                    dataKey="time" 
                    tickLine={false} 
                    axisLine={{ stroke: '#E5E7EB' }} 
                  />
                  <YAxis 
                    tickLine={false} 
                    axisLine={{ stroke: '#E5E7EB' }}
                    label={{ value: 'kWh', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="consumo" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Consumo (kWh)" 
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MemberEnergyChart;
