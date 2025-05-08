
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export default function AddProperty() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/admin/properties');
  };

  const handleDemoSubmit = () => {
    toast({
      title: "Funzionalità in sviluppo",
      description: "La creazione di nuove proprietà sarà disponibile nella prossima versione."
    });
    navigate('/admin/properties');
  };

  return (
    <AdminLayout title="Aggiungi Proprietà">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Aggiungi Nuova Proprietà</h1>
        <p className="text-muted-foreground">
          Registra una nuova proprietà e associa un proprietario e un consumatore
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Dettagli Proprietà</CardTitle>
          <CardDescription>
            Inserisci i dati relativi alla nuova proprietà
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground text-center mb-4">
              Questa funzionalità è attualmente in fase di sviluppo.<br />
              Sarà disponibile nella prossima versione dell'applicazione.
            </p>
            
            <div className="flex gap-4 mt-4">
              <Button variant="outline" onClick={handleBackClick}>
                Torna all'elenco
              </Button>
              <Button onClick={handleDemoSubmit}>
                Demo: Crea Proprietà
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
