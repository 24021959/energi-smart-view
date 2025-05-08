
import React from 'react';
import { AdminLayout } from '@/layouts/AdminLayout';

export default function MemberNotFound() {
  return (
    <AdminLayout title="Dettaglio Membro">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Membro non trovato</h2>
        <p className="text-muted-foreground mb-4">Il membro richiesto non esiste o è stato rimosso.</p>
      </div>
    </AdminLayout>
  );
}
