
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MemberInfoProps {
  email: string;
  phone: string;
  address: string;
  fiscalCode: string;
  vatNumber: string;
}

interface MemberAddressCredentialsProps {
  memberInfo: MemberInfoProps;
}

const MemberAddressCredentials = ({ memberInfo }: MemberAddressCredentialsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Indirizzi</CardTitle>
          <CardDescription>Indirizzi associati al membro</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground">Indirizzo di residenza/sede legale</div>
              <div className="font-medium">{memberInfo.address}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Credenziali di Accesso</CardTitle>
          <CardDescription>Credenziali per l'accesso alla piattaforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-medium">{memberInfo.email}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Telefono</div>
              <div className="font-medium">{memberInfo.phone}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Codice Fiscale</div>
              <div className="font-medium">{memberInfo.fiscalCode}</div>
            </div>
            {memberInfo.vatNumber && (
              <div>
                <div className="text-sm text-muted-foreground">Partita IVA</div>
                <div className="font-medium">{memberInfo.vatNumber}</div>
              </div>
            )}
            <Button variant="outline" size="sm">Reimposta Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberAddressCredentials;
