
import { ProducerLayout } from '@/layouts/ProducerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProducerProduction() {
  return (
    <ProducerLayout title="Produzione Energetica">
      <div className="grid gap-4">
        <h1 className="text-2xl font-bold">Monitoraggio Produzione</h1>
        <p className="text-muted-foreground">Monitora e analizza la produzione energetica dei tuoi impianti.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Produzione in tempo reale</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Visualizzazione dei dati di produzione in tempo reale</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Efficienza impianti</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Analisi dell'efficienza dei tuoi impianti di produzione</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProducerLayout>
  );
}
