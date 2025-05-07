
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface MemberPersonalInfo {
  name: string;
  email: string;
  type: string;
  status: string;
  fiscalCode?: string;
  vatNumber?: string;
  idType?: string;
  idNumber?: string;
  registrationDate: string;
}

interface MemberOverviewProps {
  personalInfo: MemberPersonalInfo;
}

const MemberOverview = ({ personalInfo }: MemberOverviewProps) => {
  const { 
    name, 
    email, 
    type, 
    status, 
    fiscalCode, 
    vatNumber, 
    idType, 
    idNumber, 
    registrationDate 
  } = personalInfo;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dati Personali</CardTitle>
        <CardDescription>Informazioni di base del membro</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground">Nome</div>
              <div className="font-medium">{name}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-medium">{email}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Tipo</div>
              <div className="font-medium">{type}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Stato</div>
              <div className="font-medium">{status}</div>
            </div>
          </div>
          <div className="space-y-3">
            {fiscalCode && (
              <div>
                <div className="text-sm text-muted-foreground">Codice Fiscale</div>
                <div className="font-medium">{fiscalCode}</div>
              </div>
            )}
            {vatNumber && (
              <div>
                <div className="text-sm text-muted-foreground">Partita IVA</div>
                <div className="font-medium">{vatNumber}</div>
              </div>
            )}
            {idType && (
              <div>
                <div className="text-sm text-muted-foreground">Documento</div>
                <div className="font-medium">{idType} - {idNumber}</div>
              </div>
            )}
            <div>
              <div className="text-sm text-muted-foreground">Data Registrazione</div>
              <div className="font-medium">{registrationDate}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberOverview;
