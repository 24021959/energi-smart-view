
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MemberAddressProps {
  legalAddress: string;
  supplyAddress: string;
}

interface MemberCredentialsProps {
  username: string;
}

interface MemberAddressCredentialsProps {
  addresses: MemberAddressProps;
  credentials: MemberCredentialsProps;
}

const MemberAddressCredentials = ({ addresses, credentials }: MemberAddressCredentialsProps) => {
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
              <div className="font-medium">{addresses.legalAddress}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Indirizzo di fornitura</div>
              <div className="font-medium">{addresses.supplyAddress}</div>
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
              <div className="text-sm text-muted-foreground">Username</div>
              <div className="font-medium">{credentials.username}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Password</div>
              <div className="font-medium">••••••••••</div>
            </div>
            <Button variant="outline" size="sm">Reimposta Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberAddressCredentials;
