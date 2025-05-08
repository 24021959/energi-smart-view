
import { 
  BarChart, 
  Bar,
  ResponsiveContainer 
} from "recharts";

interface EnergyWeekChartProps {
  type: "production" | "consumption";
}

export function EnergyWeekChart({ type }: EnergyWeekChartProps) {
  // Dati di esempio per i grafici
  const productionData = [
    { name: "Lun", value: 32 },
    { name: "Mar", value: 40 },
    { name: "Mer", value: 36 },
    { name: "Gio", value: 31 },
    { name: "Ven", value: 28 },
    { name: "Sab", value: 40 },
    { name: "Dom", value: 42.8 }
  ];

  const consumptionData = [
    { name: "Lun", value: 45 },
    { name: "Mar", value: 52 },
    { name: "Mer", value: 49 },
    { name: "Gio", value: 62 },
    { name: "Ven", value: 57 },
    { name: "Sab", value: 36 },
    { name: "Dom", value: 48.2 }
  ];

  const data = type === "production" ? productionData : consumptionData;
  const barColor = type === "production" ? "#22c55e" : "#3b82f6";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Bar dataKey="value" fill={barColor} radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
