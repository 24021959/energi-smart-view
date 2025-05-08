
import { 
  Card,
  CardContent
} from "@/components/ui/card";

export function OptimizationMetrics() {
  const metrics = [
    {
      title: "Potenziale di ottimizzazione",
      value: "32%",
      description: "Margine di miglioramento dell'efficienza energetica",
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Risparmio potenziale",
      value: "€8.350",
      description: "Stima annuale con implementazione raccomandazioni",
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Riduzione CO2",
      value: "12,4t",
      description: "Potenziale riduzione annua con l'ottimizzazione",
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "ROI stimato",
      value: "2,3 anni",
      description: "Tempo di ritorno degli investimenti consigliati",
      color: "bg-amber-100 text-amber-800"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className={`inline-flex items-center justify-center rounded-md p-1 ${metric.color}`}>
              <span className="text-xs font-medium">{metric.title}</span>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
