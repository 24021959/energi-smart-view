
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function OptimizationRecommendations() {
  const recommendations = [
    {
      id: 1,
      title: "Installazione di sistemi di accumulo",
      description: "Installare batterie con capacità di 15kWh migliorerà l'autoconsumo del 26% e aumenterà la quota di energia condivisa all'interno della comunità.",
      impact: "high",
      category: "infrastruttura",
      savings: "€3.400/anno"
    },
    {
      id: 2,
      title: "Ampliamento capacità fotovoltaica",
      description: "Aumentare la capacità produttiva di 8kW con pannelli sui tetti degli edifici degli utenti consumer permetterebbe di bilanciare meglio la comunità.",
      impact: "high",
      category: "produzione",
      savings: "€2.800/anno"
    },
    {
      id: 3,
      title: "Ottimizzazione dei consumi",
      description: "Spostare i consumi flessibili nelle ore di maggiore produzione fotovoltaica (11:00-16:00) aumenterebbe l'autoconsumo del 18%.",
      impact: "medium",
      category: "comportamento",
      savings: "€1.200/anno"
    },
    {
      id: 4,
      title: "Integrazione di nuovi membri consumatori",
      description: "Integrare 3-5 nuovi membri consumatori nel raggio di 1km dalla fonte di produzione principale ottimizzerebbe il rapporto produzione/consumo.",
      impact: "medium",
      category: "comunità",
      savings: "€950/anno"
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "bg-green-500 hover:bg-green-600";
      case "medium": return "bg-yellow-500 hover:bg-yellow-600";
      case "low": return "bg-blue-500 hover:bg-blue-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "infrastruttura": return "bg-purple-500 hover:bg-purple-600";
      case "produzione": return "bg-blue-500 hover:bg-blue-600";
      case "comportamento": return "bg-orange-500 hover:bg-orange-600";
      case "comunità": return "bg-teal-500 hover:bg-teal-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Raccomandazioni per l'ottimizzazione</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recommendations.map((rec) => (
            <li key={rec.id} className="border rounded-lg p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-lg">{rec.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-2 md:mt-0">
                  <div className="flex gap-2">
                    <Badge variant="secondary" className={getImpactColor(rec.impact)}>
                      Impatto: {rec.impact === "high" ? "Alto" : rec.impact === "medium" ? "Medio" : "Basso"}
                    </Badge>
                    <Badge variant="secondary" className={getCategoryColor(rec.category)}>
                      {rec.category.charAt(0).toUpperCase() + rec.category.slice(1)}
                    </Badge>
                  </div>
                  <Badge className="bg-green-700 hover:bg-green-800">{rec.savings}</Badge>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
