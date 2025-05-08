
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader } from 'lucide-react';
import MemberEnergyChart from './MemberEnergyChart';

interface MemberDataAnalysisProps {
  memberId: number;
  dataLoading: boolean;
  onLoadData: (period: string) => void;
}

const MemberDataAnalysis = ({ memberId, dataLoading, onLoadData }: MemberDataAnalysisProps) => {
  const [period, setPeriod] = useState("ultimi3mesi");
  
  const handleLoadData = () => {
    const periodLabels = {
      "ultimo1mese": "ultimo mese",
      "ultimi3mesi": "ultimi 3 mesi",
      "ultimi6mesi": "ultimi 6 mesi", 
      "ultimoanno": "ultimo anno"
    };
    onLoadData(periodLabels[period as keyof typeof periodLabels]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analisi Dati</CardTitle>
          <CardDescription>
            Carica e analizza i dati energetici del membro
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-full sm:w-[220px]">
                <SelectValue placeholder="Seleziona periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ultimo1mese">Ultimo mese</SelectItem>
                <SelectItem value="ultimi3mesi">Ultimi 3 mesi</SelectItem>
                <SelectItem value="ultimi6mesi">Ultimi 6 mesi</SelectItem>
                <SelectItem value="ultimoanno">Ultimo anno</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              onClick={handleLoadData} 
              disabled={dataLoading}
              className="w-full sm:w-auto"
            >
              {dataLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Caricamento...
                </>
              ) : (
                "Carica dati"
              )}
            </Button>
          </div>
          
          <MemberEnergyChart memberId={memberId} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberDataAnalysis;
