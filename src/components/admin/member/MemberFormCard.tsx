
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MemberForm } from './MemberForm';

export function MemberFormCard() {
  return (
    <Card className="max-w-3xl mx-auto mb-8">
      <CardHeader>
        <CardTitle>Nuovo Membro</CardTitle>
        <CardDescription>
          Aggiungi un nuovo membro alla comunità energetica rinnovabile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MemberForm />
      </CardContent>
    </Card>
  );
}
