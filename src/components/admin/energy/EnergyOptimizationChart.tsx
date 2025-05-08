
import { 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface EnergyOptimizationChartProps {
  scenarioType: 'current' | 'optimized';
}

export function EnergyOptimizationChart({ scenarioType }: EnergyOptimizationChartProps) {
  // Dati di esempio per lo scenario attuale
  const currentData = [
    { hour: '00:00', produzione: 0, consumo: 42, autoconsumo: 0 },
    { hour: '04:00', produzione: 0, consumo: 36, autoconsumo: 0 },
    { hour: '08:00', produzione: 28, consumo: 76, autoconsumo: 28 },
    { hour: '12:00', produzione: 85, consumo: 68, autoconsumo: 68 },
    { hour: '16:00', produzione: 56, consumo: 82, autoconsumo: 56 },
    { hour: '20:00', produzione: 10, consumo: 94, autoconsumo: 10 },
  ];

  // Dati di esempio per lo scenario ottimizzato
  const optimizedData = [
    { hour: '00:00', produzione: 18, consumo: 42, autoconsumo: 18, storage: 0 },
    { hour: '04:00', produzione: 12, consumo: 36, autoconsumo: 12, storage: 0 },
    { hour: '08:00', produzione: 78, consumo: 76, autoconsumo: 76, storage: 2 },
    { hour: '12:00', produzione: 125, consumo: 68, autoconsumo: 68, storage: 57 },
    { hour: '16:00', produzione: 96, consumo: 82, autoconsumo: 82, storage: 14 },
    { hour: '20:00', produzione: 20, consumo: 94, autoconsumo: 20, storage: 74 },
  ];

  const data = scenarioType === 'current' ? currentData : optimizedData;

  if (scenarioType === 'current') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
          <XAxis 
            dataKey="hour" 
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
            tick={{ fontSize: 12, fill: '#6B7280' }}
          />
          <YAxis 
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
            tick={{ fontSize: 12, fill: '#6B7280' }}
            label={{ value: 'kW', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6B7280', fontSize: 12 } }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
            formatter={(value) => [`${value} kW`, undefined]}
          />
          <Legend 
            verticalAlign="top" 
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '12px' }}
          />
          <Area 
            type="monotone" 
            dataKey="produzione" 
            name="Produzione" 
            stackId="1"
            stroke="#22c55e" 
            fill="#22c55e"
            fillOpacity={0.6}
          />
          <Area 
            type="monotone" 
            dataKey="autoconsumo" 
            name="Autoconsumo" 
            stackId="2"
            stroke="#8b5cf6" 
            fill="#8b5cf6"
            fillOpacity={0.6}
          />
          <Area 
            type="monotone" 
            dataKey="consumo" 
            name="Consumo" 
            stackId="3"
            stroke="#3b82f6" 
            fill="#3b82f6"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  } else {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
          <XAxis 
            dataKey="hour" 
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
            tick={{ fontSize: 12, fill: '#6B7280' }}
          />
          <YAxis 
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
            tick={{ fontSize: 12, fill: '#6B7280' }}
            label={{ value: 'kW', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6B7280', fontSize: 12 } }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
            formatter={(value) => [`${value} kW`, undefined]}
          />
          <Legend 
            verticalAlign="top" 
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '12px' }}
          />
          <Bar 
            dataKey="produzione" 
            name="Produzione" 
            fill="#22c55e"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="autoconsumo" 
            name="Autoconsumo" 
            fill="#8b5cf6"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="consumo" 
            name="Consumo" 
            fill="#3b82f6"
            fillOpacity={0.7}
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="storage" 
            name="Accumulo" 
            fill="#f59e0b"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
