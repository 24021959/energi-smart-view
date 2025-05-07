
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

// Dati fittizi per il grafico
const data = [
  { name: 'Gen', produzione: 24, consumo: 40 },
  { name: 'Feb', produzione: 30, consumo: 45 },
  { name: 'Mar', produzione: 42, consumo: 50 },
  { name: 'Apr', produzione: 50, consumo: 52 },
  { name: 'Mag', produzione: 65, consumo: 55 },
  { name: 'Giu', produzione: 78, consumo: 70 },
  { name: 'Lug', produzione: 82, consumo: 85 },
  { name: 'Ago', produzione: 75, consumo: 80 },
  { name: 'Set', produzione: 60, consumo: 65 },
  { name: 'Ott', produzione: 48, consumo: 55 },
  { name: 'Nov', produzione: 35, consumo: 45 },
  { name: 'Dic', produzione: 30, consumo: 42 }
];

// Configurazione colori grafico
const chartConfig = {
  produzione: {
    label: "Produzione",
    theme: {
      light: "#22c55e", // verde
      dark: "#22c55e"
    }
  },
  consumo: {
    label: "Consumo",
    theme: {
      light: "#7c3aed", // viola
      dark: "#7c3aed"
    }
  }
};

export function EnergyConsumptionChart() {
  return (
    <ChartContainer config={chartConfig} className="aspect-[4/3]">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorProduzione" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorConsumo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis unit=" kWh" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area 
          type="monotone" 
          dataKey="produzione" 
          stroke="#22c55e" 
          fillOpacity={1} 
          fill="url(#colorProduzione)" 
          strokeWidth={2}
        />
        <Area 
          type="monotone" 
          dataKey="consumo" 
          stroke="#7c3aed" 
          fillOpacity={1} 
          fill="url(#colorConsumo)" 
          strokeWidth={2}
        />
      </AreaChart>
      <ChartLegend content={<ChartLegendContent />} />
    </ChartContainer>
  );
}
