
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight, ChevronDown, Users } from "lucide-react";
import { ConfigMembersExpander } from '@/components/admin/configuration/ConfigMembersExpander';
import { Configuration } from "@/types/configuration";

interface ConfigurationComponentsProps {
  configuration: Configuration;
}

export function ConfigurationComponents({ configuration }: ConfigurationComponentsProps) {
  const [isComponentsOpen, setIsComponentsOpen] = useState(false);

  return (
    <Card className="border shadow-sm">
      <Collapsible
        open={isComponentsOpen}
        onOpenChange={setIsComponentsOpen}
        className="w-full"
      >
        <CollapsibleTrigger asChild>
          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
            <div className="flex items-center">
              {isComponentsOpen ? (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              )}
              <h3 className="ml-2 text-lg font-medium">Componenti Configurazione Energetica</h3>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              <span>Partecipanti ({configuration.participants || 0})</span>
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="border-t">
            <ConfigMembersExpander configuration={configuration} />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
