
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useAuth } from '@/hooks/useAuthContext';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CEROptimization } from '@/components/admin/energy/CEROptimization';

// Dati di esempio per i grafici
const monthlyData = [
  { name: 'Gen', produzione: 400, consumo: 240, condivisione: 160 },
  { name: 'Feb', produzione: 300, consumo: 220, condivisione: 120 },
  { name: 'Mar', produzione: 500, consumo: 280, condivisione: 220 },
  { name: 'Apr', produzione: 600, consumo: 320, condivisione: 280 },
  { name: 'Mag', produzione: 750, consumo: 400, condivisione: 350 },
  { name: 'Giu', produzione: 800, consumo: 380, condivisione: 420 },
];

const dailyData = [
  { time: '00:00', produzione: 50, consumo: 90 },
  { time: '03:00', produzione: 30, consumo: 70 },
  { time: '06:00', produzione: 80, consumo: 60 },
  { time: '09:00', produzione: 200, consumo: 150 },
  { time: '12:00', produzione: 350, consumo: 200 },
  { time: '15:00', produzione: 280, consumo: 220 },
  { time: '18:00', produzione: 150, consumo: 280 },
  { time: '21:00', produzione: 60, consumo: 140 },
];

export default function EnergyData() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { authState } = useAuth();
  const { user } = authState;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Area principale */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <h1 className="text-2xl font-bold mb-6">Dati Energetici</h1>
          
          <Tabs defaultValue="monthly">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
              <TabsTrigger value="monthly">Dati Mensili</TabsTrigger>
              <TabsTrigger value="daily">Dati Giornalieri</TabsTrigger>
              <TabsTrigger value="optimization">Ottimizzazione CER</TabsTrigger>
            </TabsList>
            
            <TabsContent value="monthly">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Produzione e Consumo Mensile</CardTitle>
                    <CardDescription>
                      Andamento della produzione e consumo energetico negli ultimi mesi
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="produzione" fill="#4ade80" name="Produzione (kWh)" />
                        <Bar dataKey="consumo" fill="#f87171" name="Consumo (kWh)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Energia Condivisa</CardTitle>
                    <CardDescription>
                      Quantità di energia condivisa all'interno della CER
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="condivisione" 
                          stroke="#8b5cf6" 
                          strokeWidth={2}
                          name="Energia Condivisa (kWh)" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="daily">
              <Card>
                <CardHeader>
                  <CardTitle>Andamento Giornaliero</CardTitle>
                  <CardDescription>
                    Produzione e consumo energetico nelle 24 ore
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="produzione" 
                        stroke="#4ade80" 
                        strokeWidth={2}
                        name="Produzione (kWh)" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="consumo" 
                        stroke="#f87171" 
                        strokeWidth={2}
                        name="Consumo (kWh)" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="optimization">
              <CEROptimization />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
