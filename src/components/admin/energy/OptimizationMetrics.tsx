
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

export function OptimizationMetrics() {
  const metrics = [
    {
      title: "Potenziale di ottimizzazione",
      value: "32%",
      description: "Margine di miglioramento dell'efficienza energetica",
      color: "bg-green-100 text-green-800",
      trend: "+2.5%"
    },
    {
      title: "Risparmio potenziale",
      value: "€8.350",
      description: "Stima annuale con implementazione raccomandazioni",
      color: "bg-blue-100 text-blue-800",
      trend: "+€650"
    },
    {
      title: "Riduzione CO2",
      value: "12,4t",
      description: "Potenziale riduzione annua con l'ottimizzazione",
      color: "bg-purple-100 text-purple-800",
      trend: "+1.2t"
    },
    {
      title: "ROI stimato",
      value: "2,3 anni",
      description: "Tempo di ritorno degli investimenti consigliati",
      color: "bg-amber-100 text-amber-800",
      trend: "-0.2 anni"
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
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>{metric.trend} rispetto al mese scorso</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
