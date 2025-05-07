
import { Card, CardContent } from "@/components/ui/card";
import { Solar, LightbulbOff } from "lucide-react";

interface EnergyData {
  label: string;
  value: string;
  percentage: string;
  color: string;
}

interface EnergyProductionConsumptionProps {
  type: "production" | "consumption";
  totalValue: string;
  data: EnergyData[];
}

export function EnergyProductionConsumption({ 
  type, 
  totalValue, 
  data 
}: EnergyProductionConsumptionProps) {
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className="mr-4 mt-1">
            {type === "production" ? (
              <Solar className="h-12 w-12 text-gray-700" />
            ) : (
              <LightbulbOff className="h-12 w-12 text-gray-700" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                Energia {type === "production" ? "prodotta" : "consumata"}
              </h3>
              <span className="text-xl font-bold">{totalValue}</span>
            </div>
            
            <div className="mt-4 space-y-3">
              {data.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <div>{item.label}</div>
                    <div className="flex items-center space-x-2">
                      <div>{item.value}</div>
                      {item.percentage && <div>{item.percentage}</div>}
                    </div>
                  </div>
                  {item.color !== "transparent" && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: item.percentage }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
