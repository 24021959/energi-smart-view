
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Document {
  id?: number;
  type?: string;
  name?: string;
  date?: string;
  url?: string;
}

interface MemberDocumentsProps {
  documentsList: Document[];
  memberId: number;
}

const MemberDocuments = ({ documentsList, memberId }: MemberDocumentsProps) => {
  // Usiamo i mock data se non abbiamo documenti reali
  const documents = documentsList.length > 0 ? documentsList : [];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documenti</CardTitle>
        <CardDescription>Documenti allegati del membro</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted-foreground">Nessun documento disponibile</p>
            </div>
          ) : (
            documents.map((doc, index) => (
              <div key={doc.id || index} className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <div className="font-medium">{doc.type || 'Documento'}</div>
                  <div className="text-sm text-muted-foreground">
                    {doc.name || ''} {doc.date ? `- ${doc.date}` : ''}
                  </div>
                </div>
                <Button variant="outline" size="sm">Visualizza</Button>
              </div>
            ))
          )}

          <Button className="w-full mt-4">
            Carica Nuovo Documento
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberDocuments;
