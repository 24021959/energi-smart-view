
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Loader, Download, Battery } from 'lucide-react';
import { EnergyOptimizationChart } from './EnergyOptimizationChart';
import { OptimizationRecommendations } from './OptimizationRecommendations';
import { OptimizationMetrics } from './OptimizationMetrics';

export function CEROptimization() {
  const [isLoading, setIsLoading] = useState(false);
  const [scenarioType, setScenarioType] = useState<'current' | 'optimized'>('current');
  const [timeframe, setTimeframe] = useState('last30days');

  const handleRunAnalysis = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Ottimizzazione della Comunità Energetica</CardTitle>
              <CardDescription>
                Analisi e suggerimenti per migliorare l'efficienza della CER
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Periodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last30days">Ultimi 30 giorni</SelectItem>
                  <SelectItem value="last3months">Ultimi 3 mesi</SelectItem>
                  <SelectItem value="last6months">Ultimi 6 mesi</SelectItem>
                  <SelectItem value="lastyear">Ultimo anno</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                onClick={handleRunAnalysis} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Analisi in corso...
                  </>
                ) : (
                  "Esegui analisi"
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="mb-6">
            <OptimizationMetrics />
          </div>

          <Tabs value={scenarioType} onValueChange={value => setScenarioType(value as 'current' | 'optimized')}>
            <TabsList className="mb-4">
              <TabsTrigger value="current">Scenario Attuale</TabsTrigger>
              <TabsTrigger value="optimized">Scenario Ottimizzato</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current" className="space-y-6">
              <div className="h-[400px] border rounded-lg p-4 bg-gray-50">
                <EnergyOptimizationChart scenarioType="current" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Efficienza attuale della CER</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Autoconsumo</span>
                          <span className="font-semibold">42%</span>
                        </div>
                        <Progress value={42} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Energia condivisa</span>
                          <span className="font-semibold">35%</span>
                        </div>
                        <Progress value={35} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Bilanciamento complessivo</span>
                          <span className="font-semibold">66%</span>
                        </div>
                        <Progress value={66} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Bilancio energetico</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-sm text-muted-foreground">Produzione totale</span>
                          <p className="text-xl font-semibold">15.430 kWh</p>
                        </div>
                        <Battery className="h-10 w-10 text-green-500" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-sm text-muted-foreground">Consumo totale</span>
                          <p className="text-xl font-semibold">18.920 kWh</p>
                        </div>
                        <Battery className="h-10 w-10 text-red-500" />
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="space-y-1">
                          <span className="text-sm text-muted-foreground">Bilancio netto</span>
                          <p className="text-xl font-semibold text-red-600">-3.490 kWh</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="optimized" className="space-y-6">
              <div className="h-[400px] border rounded-lg p-4 bg-gray-50">
                <EnergyOptimizationChart scenarioType="optimized" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Efficienza ottimizzata della CER</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Autoconsumo</span>
                          <span className="font-semibold">68%</span>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Energia condivisa</span>
                          <span className="font-semibold">58%</span>
                        </div>
                        <Progress value={58} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Bilanciamento complessivo</span>
                          <span className="font-semibold">87%</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Bilancio energetico ottimizzato</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-sm text-muted-foreground">Produzione totale</span>
                          <p className="text-xl font-semibold">19.780 kWh</p>
                        </div>
                        <Battery className="h-10 w-10 text-green-500" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-sm text-muted-foreground">Consumo totale</span>
                          <p className="text-xl font-semibold">18.920 kWh</p>
                        </div>
                        <Battery className="h-10 w-10 text-red-500" />
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="space-y-1">
                          <span className="text-sm text-muted-foreground">Bilancio netto</span>
                          <p className="text-xl font-semibold text-green-600">+860 kWh</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex flex-col">
          <OptimizationRecommendations />
          
          <div className="w-full flex justify-end mt-6">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>Esporta rapporto</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
