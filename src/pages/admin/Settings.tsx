
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useAuth } from '@/hooks/useAuthContext';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function Settings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { authState } = useAuth();
  const { user } = authState;
  
  // Stati per il form dei dati CER
  const [cerName, setCerName] = useState('CER Energia Comune');
  const [cerCode, setCerCode] = useState('CER-2025-0042');
  const [cerAddress, setCerAddress] = useState('Via Roma, 123, Milano');
  const [cerEmail, setCerEmail] = useState('info@energiacomune.it');
  const [cerPhone, setCerPhone] = useState('02 1234567');

  // Stati per le notifiche
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [reportNotifications, setReportNotifications] = useState(true);
  const [systemNotifications, setSystemNotifications] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Area principale */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <h1 className="text-2xl font-bold mb-6">Impostazioni</h1>
          
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
              <TabsTrigger value="profile">Profilo CER</TabsTrigger>
              <TabsTrigger value="notifications">Notifiche</TabsTrigger>
              <TabsTrigger value="security">Sicurezza</TabsTrigger>
              <TabsTrigger value="advanced">Avanzate</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profilo della CER</CardTitle>
                  <CardDescription>
                    Gestisci le informazioni della tua Comunità Energetica Rinnovabile.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="cerName">Nome CER</Label>
                      <Input 
                        id="cerName" 
                        value={cerName} 
                        onChange={(e) => setCerName(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cerCode">Codice CER</Label>
                      <Input 
                        id="cerCode" 
                        value={cerCode}
                        onChange={(e) => setCerCode(e.target.value)}
                        readOnly 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cerAddress">Indirizzo</Label>
                    <Input 
                      id="cerAddress" 
                      value={cerAddress} 
                      onChange={(e) => setCerAddress(e.target.value)} 
                    />
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="cerEmail">Email</Label>
                      <Input 
                        id="cerEmail" 
                        type="email" 
                        value={cerEmail} 
                        onChange={(e) => setCerEmail(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cerPhone">Telefono</Label>
                      <Input 
                        id="cerPhone" 
                        value={cerPhone} 
                        onChange={(e) => setCerPhone(e.target.value)} 
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Salva Modifiche</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Preferenze di Notifica</CardTitle>
                  <CardDescription>
                    Configura come e quando ricevere notifiche dalla piattaforma.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Notifiche Email</h3>
                      <p className="text-sm text-muted-foreground">
                        Ricevi aggiornamenti via email
                      </p>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Report Periodici</h3>
                      <p className="text-sm text-muted-foreground">
                        Ricevi report periodici sulle performance
                      </p>
                    </div>
                    <Switch 
                      checked={reportNotifications} 
                      onCheckedChange={setReportNotifications} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Notifiche di Sistema</h3>
                      <p className="text-sm text-muted-foreground">
                        Ricevi notifiche per gli aggiornamenti di sistema
                      </p>
                    </div>
                    <Switch 
                      checked={systemNotifications} 
                      onCheckedChange={setSystemNotifications} 
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Salva Preferenze</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Sicurezza</CardTitle>
                  <CardDescription>
                    Gestisci la sicurezza del tuo account e cambia la password.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Password Attuale</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nuova Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Conferma Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Cambia Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="advanced">
              <Card>
                <CardHeader>
                  <CardTitle>Impostazioni Avanzate</CardTitle>
                  <CardDescription>
                    Configurazioni avanzate per la gestione della CER.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Modalità Debug</h3>
                      <p className="text-sm text-muted-foreground">
                        Abilita log estesi e strumenti di debug
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">API Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Consenti l'accesso via API ai dati
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Esportazione Dati</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Esporta tutti i dati della CER in formato CSV
                    </p>
                    <Button variant="outline">Esporta Dati</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
