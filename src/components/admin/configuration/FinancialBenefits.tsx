
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FinancialBenefitsProps {
  title: string;
  subtitle: string;
  value: string;
  change: string;
  changeLabel: string;
  color: string;
  hasTooltip?: boolean;
}

export function FinancialBenefits({
  title,
  subtitle,
  value,
  change,
  changeLabel,
  color,
  hasTooltip = false
}: FinancialBenefitsProps) {
  return (
    <Card className={`border-none shadow-sm ${color}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-medium pr-4">{title}</h3>
          {hasTooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-5 w-5 text-gray-600 cursor-help flex-shrink-0" />
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p className="w-64">Informazioni aggiuntive su questo valore.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        <div className="mt-2">
          <p className="text-sm">{subtitle}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        
        <div className="mt-2 text-sm flex items-center">
          <span>{change}</span>
          <span className="ml-1">{changeLabel}</span>
        </div>
      </CardContent>
    </Card>
  );
}
