
import { ConsumerLayout } from '@/layouts/ConsumerLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Receipt, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ConsumerBills() {
  // Dati di esempio per le bollette
  const bills = [
    { id: 1, period: "Maggio 2025", consumption: 487, cost: 92.3, uploadDate: "2025-06-10" },
    { id: 2, period: "Aprile 2025", consumption: 499, cost: 90.65, uploadDate: "2025-05-12" },
    { id: 3, period: "Marzo 2025", consumption: 512, cost: 93.40, uploadDate: "2025-04-15" },
  ];

  return (
    <ConsumerLayout title="Le mie bollette">
      <div className="grid gap-4 md:gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Le mie bollette</h1>
          <Button asChild>
            <Link to="/consumer/bills/upload">
              <Plus className="mr-2 h-4 w-4" />
              Carica nuova bolletta
            </Link>
          </Button>
        </div>

        {bills.length > 0 ? (
          <div className="grid gap-4">
            {bills.map(bill => (
              <Card key={bill.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Receipt className="mr-2 h-5 w-5" />
                    Bolletta {bill.period}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Consumo</div>
                      <div className="text-xl font-semibold">{bill.consumption} kWh</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Costo</div>
                      <div className="text-xl font-semibold">€{bill.cost.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Data caricamento</div>
                      <div className="text-xl font-semibold">{bill.uploadDate}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm">Dettagli</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <Receipt className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Nessuna bolletta caricata</h2>
            <p className="text-muted-foreground mb-6">
              Non hai ancora caricato alcuna bolletta. Carica la tua prima bolletta per iniziare a monitorare i tuoi consumi.
            </p>
            <Button asChild>
              <Link to="/consumer/bills/upload">
                <Plus className="mr-2 h-4 w-4" />
                Carica una bolletta
              </Link>
            </Button>
          </div>
        )}
      </div>
    </ConsumerLayout>
  );
}
