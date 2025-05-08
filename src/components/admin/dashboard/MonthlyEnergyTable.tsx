
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingDown, TrendingUp } from "lucide-react";

export function MonthlyEnergyTable() {
  // Dati di esempio per la tabella mensile
  const monthlyData = [
    {
      month: "Maggio 2023",
      produzione: 14289,
      consumo: 16730,
      condivisa: 7142,
      autoconsumo: 50.1,
      bilanciamento: -2441
    },
    {
      month: "Aprile 2023",
      produzione: 13150,
      consumo: 15980,
      condivisa: 6575,
      autoconsumo: 48.2,
      bilanciamento: -2830
    },
    {
      month: "Marzo 2023",
      produzione: 11890,
      consumo: 16120,
      condivisa: 5945,
      autoconsumo: 45.8,
      bilanciamento: -4230
    },
    {
      month: "Febbraio 2023",
      produzione: 9240,
      consumo: 15650,
      condivisa: 4620,
      autoconsumo: 42.5,
      bilanciamento: -6410
    },
    {
      month: "Gennaio 2023",
      produzione: 7680,
      consumo: 17520,
      condivisa: 3840,
      autoconsumo: 38.4,
      bilanciamento: -9840
    },
    {
      month: "Dicembre 2022",
      produzione: 6450,
      consumo: 18340,
      condivisa: 3225,
      autoconsumo: 37.2,
      bilanciamento: -11890
    },
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mese</TableHead>
            <TableHead className="text-right">Produzione (kWh)</TableHead>
            <TableHead className="text-right">Consumo (kWh)</TableHead>
            <TableHead className="text-right">Condivisa (kWh)</TableHead>
            <TableHead className="text-right">Autoconsumo (%)</TableHead>
            <TableHead className="text-right">Bilanciamento (kWh)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {monthlyData.map((row) => (
            <TableRow key={row.month}>
              <TableCell className="font-medium">{row.month}</TableCell>
              <TableCell className="text-right">{row.produzione.toLocaleString()}</TableCell>
              <TableCell className="text-right">{row.consumo.toLocaleString()}</TableCell>
              <TableCell className="text-right">{row.condivisa.toLocaleString()}</TableCell>
              <TableCell className="text-right">{row.autoconsumo}%</TableCell>
              <TableCell className="text-right">
                <span className={row.bilanciamento >= 0 ? "text-green-600 flex items-center justify-end" : "text-red-600 flex items-center justify-end"}>
                  {row.bilanciamento >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {row.bilanciamento.toLocaleString()}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
