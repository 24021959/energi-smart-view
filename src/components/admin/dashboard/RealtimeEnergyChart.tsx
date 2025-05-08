
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from "recharts";

export function RealtimeEnergyChart() {
  // Dati di esempio per il grafico in tempo reale
  // In una applicazione reale, questi dati verrebbero aggiornati da un API
  const data = [
    { time: '08:00', produzione: 6.2, consumo: 8.7, autoconsumo: 6.2 },
    { time: '09:00', produzione: 8.5, consumo: 9.2, autoconsumo: 8.5 },
    { time: '10:00', produzione: 11.3, consumo: 12.8, autoconsumo: 11.3 },
    { time: '11:00', produzione: 13.8, consumo: 15.4, autoconsumo: 13.8 },
    { time: '12:00', produzione: 15.2, consumo: 14.3, autoconsumo: 14.3 },
    { time: '13:00', produzione: 16.1, consumo: 13.9, autoconsumo: 13.9 },
    { time: '14:00', produzione: 15.7, consumo: 18.3, autoconsumo: 15.7 },
    { time: '15:00', produzione: 14.9, consumo: 17.5, autoconsumo: 14.9 },
    { time: '16:00', produzione: 13.2, consumo: 16.8, autoconsumo: 13.2 },
    { time: '17:00', produzione: 10.8, consumo: 15.3, autoconsumo: 10.8 },
    { time: '18:00', produzione: 8.4, consumo: 14.7, autoconsumo: 8.4 },
    { time: '19:00', produzione: 5.6, consumo: 16.2, autoconsumo: 5.6 },
    { time: '20:00', produzione: 3.2, consumo: 18.6, autoconsumo: 3.2 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
        <XAxis 
          dataKey="time" 
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
          verticalAlign="bottom" 
          height={36}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: '12px' }}
        />
        <Line 
          type="monotone" 
          name="Produzione" 
          dataKey="produzione" 
          stroke="#22c55e" 
          strokeWidth={2} 
          dot={{ r: 0 }}
          activeDot={{ r: 5, strokeWidth: 0 }}
        />
        <Line 
          type="monotone" 
          name="Consumo" 
          dataKey="consumo" 
          stroke="#3b82f6" 
          strokeWidth={2} 
          dot={{ r: 0 }}
          activeDot={{ r: 5, strokeWidth: 0 }}
        />
        <Line 
          type="monotone" 
          name="Autoconsumo" 
          dataKey="autoconsumo" 
          stroke="#8b5cf6" 
          strokeWidth={2} 
          strokeDasharray="5 5"
          dot={{ r: 0 }}
          activeDot={{ r: 5, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
