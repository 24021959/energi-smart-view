
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export function MonthlyEnergyChart() {
  // Dati di esempio per il grafico mensile
  const data = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const date = new Date(2023, 4, day);
    
    // Simulazione di una curva di produzione che riflette il meteo
    const weatherFactor = Math.sin(i * 0.4) * 0.3 + 0.7; // Fattore meteo che varia
    
    // Produzione che segue un pattern stagionale ma con variazioni meteo
    const production = Math.round((450 + Math.sin(i * 0.2) * 150) * weatherFactor);
    
    // Consumo più costante ma con variazioni nel weekend
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const consumption = Math.round(500 + Math.random() * 100 + (isWeekend ? -100 : 0));
    
    // Energia condivisa come quota della produzione
    const shared = Math.min(production, Math.round(production * (0.3 + Math.random() * 0.2)));
    
    return {
      date: `${day}/5`,
      produzione: production,
      consumo: consumption,
      condivisa: shared
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
        <XAxis 
          dataKey="date" 
          tickLine={false}
          axisLine={{ stroke: '#E5E7EB' }}
          tick={{ fontSize: 12, fill: '#6B7280' }}
        />
        <YAxis 
          tickLine={false}
          axisLine={{ stroke: '#E5E7EB' }}
          tick={{ fontSize: 12, fill: '#6B7280' }}
          label={{ value: 'kWh', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6B7280', fontSize: 12 } }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
          formatter={(value) => [`${value} kWh`, undefined]}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: '12px' }}
        />
        <Area 
          type="monotone" 
          name="Energia Condivisa" 
          dataKey="condivisa" 
          stackId="1"
          stroke="#8b5cf6" 
          fill="#c4b5fd"
        />
        <Area 
          type="monotone" 
          name="Produzione" 
          dataKey="produzione" 
          stroke="#22c55e" 
          fill="#bbf7d0"
          fillOpacity={0.6}
        />
        <Line 
          type="monotone" 
          name="Consumo" 
          dataKey="consumo" 
          stroke="#3b82f6" 
          strokeWidth={2}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
