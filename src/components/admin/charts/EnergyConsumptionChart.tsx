
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// Dati di esempio per il grafico
const data = [
  { name: 'Gen', produzione: 140, consumo: 240 },
  { name: 'Feb', produzione: 180, consumo: 220 },
  { name: 'Mar', produzione: 220, consumo: 240 },
  { name: 'Apr', produzione: 280, consumo: 260 },
  { name: 'Mag', produzione: 320, consumo: 280 },
  { name: 'Giu', produzione: 400, consumo: 350 },
  { name: 'Lug', produzione: 430, consumo: 410 },
  { name: 'Ago', produzione: 410, consumo: 390 },
  { name: 'Set', produzione: 350, consumo: 320 },
  { name: 'Ott', produzione: 280, consumo: 290 },
  { name: 'Nov', produzione: 200, consumo: 250 },
  { name: 'Dic', produzione: 150, consumo: 260 },
];

// Configurazione colori per il grafico
const chartConfig = {
  produzione: {
    label: 'Energia Prodotta',
    theme: {
      light: '#8B5CF6',
      dark: '#A78BFA',
    },
  },
  consumo: {
    label: 'Energia Consumata',
    theme: {
      light: '#EC4899',
      dark: '#F472B6',
    },
  },
};

export function EnergyConsumptionChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="h-full"
    >
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorProduzione" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorConsumo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area 
          type="monotone" 
          dataKey="produzione" 
          fill="url(#colorProduzione)" 
          stroke="#8B5CF6"
          fillOpacity={0.4}
        />
        <Area 
          type="monotone" 
          dataKey="consumo" 
          fill="url(#colorConsumo)" 
          stroke="#EC4899"
          fillOpacity={0.4}
        />
      </AreaChart>
      <ChartLegend content={<ChartLegendContent />} />
    </ChartContainer>
  );
}
