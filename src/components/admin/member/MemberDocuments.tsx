
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DocumentInfo {
  idNumber?: string;
  registrationDate: string;
}

interface MemberDocumentsProps {
  documentInfo: DocumentInfo;
}

const MemberDocuments = ({ documentInfo }: MemberDocumentsProps) => {
  const { idNumber, registrationDate } = documentInfo;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documenti</CardTitle>
        <CardDescription>Documenti allegati del membro</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {idNumber && (
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <div className="font-medium">Documento di identità</div>
                <div className="text-sm text-muted-foreground">Carta d'identità - {idNumber}</div>
              </div>
              <Button variant="outline" size="sm">Visualizza</Button>
            </div>
          )}
          
          <div className="flex justify-between items-center p-3 border rounded-md">
            <div>
              <div className="font-medium">Contratto CER</div>
              <div className="text-sm text-muted-foreground">Firmato il {registrationDate}</div>
            </div>
            <Button variant="outline" size="sm">Visualizza</Button>
          </div>

          <Button className="w-full mt-4">
            Carica Nuovo Documento
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberDocuments;
