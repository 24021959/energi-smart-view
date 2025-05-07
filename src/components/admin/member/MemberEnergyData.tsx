
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface EnergyData {
  podCode: string;
  supplyAddress: string;
  hasConsumptionData: boolean;
  hasProductionData: boolean;
  memberType: 'consumer' | 'producer' | 'prosumer';
}

interface MemberEnergyDataProps {
  energyData: EnergyData;
}

const MemberEnergyData = ({ energyData }: MemberEnergyDataProps) => {
  const { podCode, supplyAddress, hasConsumptionData, hasProductionData, memberType } = energyData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dati Energetici</CardTitle>
        <CardDescription>Informazioni relative al POD e ai consumi</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Dettagli POD</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Codice POD</div>
                <div className="font-medium">{podCode}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Indirizzo di fornitura</div>
                <div className="font-medium">{supplyAddress}</div>
              </div>
            </div>
          </div>

          {(memberType === 'consumer' || memberType === 'prosumer') && hasConsumptionData && (
            <div>
              <h3 className="text-lg font-medium mb-2">Dati di Consumo</h3>
              <div className="h-60">
                {/* Qui andrebbe un grafico dei consumi */}
                <div className="bg-slate-100 h-full rounded-md flex items-center justify-center">
                  Grafico dei consumi (ultimi 6 mesi)
                </div>
              </div>
            </div>
          )}

          {(memberType === 'producer' || memberType === 'prosumer') && hasProductionData && (
            <div>
              <h3 className="text-lg font-medium mb-2">Dati di Produzione</h3>
              <div className="h-60">
                {/* Qui andrebbe un grafico della produzione */}
                <div className="bg-slate-100 h-full rounded-md flex items-center justify-center">
                  Grafico della produzione (ultimi 6 mesi)
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberEnergyData;
