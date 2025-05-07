
import { Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Battery, TreeDeciduous, Smile } from "lucide-react";

interface EnergyStatsProps {
  icon: "energy" | "co2" | "trees";
  value: string;
  description: string;
  hasTooltip?: boolean;
}

export function EnergyStats({ icon, value, description, hasTooltip = false }: EnergyStatsProps) {
  const renderIcon = () => {
    switch(icon) {
      case 'energy':
        return <Battery className="h-12 w-12 text-green-600" />;
      case 'co2':
        return <Smile className="h-12 w-12 text-gray-600" />;
      case 'trees':
        return <TreeDeciduous className="h-12 w-12 text-green-700" />;
      default:
        return null;
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className="mr-4">
            {renderIcon()}
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
          {hasTooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-5 w-5 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-64">Informazioni aggiuntive su questo valore.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
