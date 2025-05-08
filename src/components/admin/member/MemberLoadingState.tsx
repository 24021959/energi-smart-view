
import React from 'react';
import { AdminLayout } from '@/layouts/AdminLayout';

export default function MemberLoadingState() {
  return (
    <AdminLayout title="Caricamento...">
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Caricamento dati membro...</p>
      </div>
    </AdminLayout>
  );
}
