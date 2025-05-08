
import { ProducerLayout } from '@/layouts/ProducerLayout';

export default function ProducerBills() {
  return (
    <ProducerLayout title="Fatture">
      <div className="grid gap-4">
        <h1 className="text-2xl font-bold">Gestione Fatture</h1>
        <p className="text-muted-foreground">Visualizza e gestisci le tue fatture di vendita dell'energia.</p>
      </div>
    </ProducerLayout>
  );
}
