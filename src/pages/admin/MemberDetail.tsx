
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, UserCog, Zap, ZapOff, Battery } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { MemberListItem } from '@/types/member';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Dati di esempio per singolo membro
const getMemberById = (id: number): MemberListItem | undefined => {
  const members = [
    { 
      id: 1, 
      name: 'Mario Rossi', 
      email: 'mario.rossi@example.com', 
      type: 'Domestico', 
      status: 'Attivo',
      memberType: 'consumer' as const,
      isActive: true,
    },
    { 
      id: 2, 
      name: 'Laura Bianchi', 
      email: 'laura.bianchi@example.com', 
      type: 'Commerciale', 
      status: 'Attivo',
      memberType: 'prosumer' as const,
      isActive: true,
    },
    { 
      id: 3, 
      name: 'Giuseppe Verdi', 
      email: 'giuseppe.verdi@example.com', 
      type: 'Domestico', 
      status: 'In attesa',
      memberType: 'consumer' as const,
      isActive: false,
    },
    { 
      id: 4, 
      name: 'Francesca Neri', 
      email: 'francesca.neri@example.com', 
      type: 'Industriale', 
      status: 'Attivo',
      memberType: 'prosumer' as const,
      isActive: true,
    },
    { 
      id: 5, 
      name: 'Energia Sole srl', 
      email: 'info@energiasole.it', 
      type: 'Industriale', 
      status: 'Attivo',
      memberType: 'producer' as const,
      isActive: true,
    },
  ];
  
  return members.find(m => m.id === id);
};

// Dati aggiuntivi per il membro
const getMemberDetails = (id: number) => {
  return {
    id,
    fiscalCode: 'RSSMRA80A01H501Z',
    vatNumber: id === 5 ? '12345678901' : '',
    idType: 'Carta d\'identità',
    idNumber: 'CA12345XY',
    legalAddress: 'Via Roma 123, Roma',
    supplyAddress: 'Via Roma 123, Roma',
    podCode: 'IT001E12345678',
    username: `user${id}`,
    password: 'password123',
    registrationDate: '01/01/2023',
    consumptionData: id !== 5 ? [
      { month: 'Gen', value: 120 },
      { month: 'Feb', value: 100 },
      { month: 'Mar', value: 140 },
      { month: 'Apr', value: 135 },
      { month: 'Mag', value: 160 },
      { month: 'Giu', value: 180 },
    ] : [],
    productionData: id === 2 || id === 4 || id === 5 ? [
      { month: 'Gen', value: id === 5 ? 250 : 50 },
      { month: 'Feb', value: id === 5 ? 280 : 60 },
      { month: 'Mar', value: id === 5 ? 320 : 80 },
      { month: 'Apr', value: id === 5 ? 380 : 100 },
      { month: 'Mag', value: id === 5 ? 420 : 120 },
      { month: 'Giu', value: id === 5 ? 450 : 140 },
    ] : []
  };
};

export default function MemberDetail() {
  const { id } = useParams();
  const memberId = id ? parseInt(id) : 0;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [member, setMember] = useState<MemberListItem | null>(null);
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    // In un'app reale, qui ci sarebbe una chiamata API
    const fetchedMember = getMemberById(memberId);
    if (fetchedMember) {
      setMember(fetchedMember);
      setDetails(getMemberDetails(memberId));
    }
  }, [memberId]);

  const toggleMemberStatus = (isActive: boolean) => {
    if (!member) return;
    
    setMember({
      ...member,
      isActive,
      status: isActive ? 'Attivo' : 'In attesa'
    });
    
    toast({
      title: isActive ? "Membro attivato" : "Membro disattivato",
      description: `${member.name} è stato ${isActive ? 'attivato' : 'disattivato'} con successo.`,
      variant: isActive ? "default" : "destructive",
    });
  };

  if (!member || !details) {
    return (
      <div className="flex h-screen bg-background">
        <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className="flex flex-col flex-1">
          <AdminHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Membro non trovato</h2>
              <p className="text-muted-foreground mb-4">Il membro richiesto non esiste o è stato rimosso.</p>
              <Button asChild>
                <Link to="/admin/members">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Torna alla lista membri
                </Link>
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" asChild>
                <Link to="/admin/members">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-2xl font-bold">{member.name}</h1>
              {member.memberType === 'prosumer' ? (
                <Badge className="bg-purple-600">
                  <Zap className="mr-1 h-4 w-4" />
                  Prosumer
                </Badge>
              ) : member.memberType === 'producer' ? (
                <Badge className="bg-green-600">
                  <Battery className="mr-1 h-4 w-4" />
                  Producer
                </Badge>
              ) : (
                <Badge className="bg-blue-600">
                  <ZapOff className="mr-1 h-4 w-4" />
                  Consumer
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  {member.isActive ? 'Attivo' : 'Disattivato'}
                </span>
                <Switch 
                  checked={member.isActive} 
                  onCheckedChange={toggleMemberStatus}
                />
              </div>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Modifica
              </Button>
              <Button variant="outline">
                <UserCog className="mr-2 h-4 w-4" />
                Gestisci Accesso
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Panoramica</TabsTrigger>
              <TabsTrigger value="energy">Dati Energetici</TabsTrigger>
              <TabsTrigger value="documents">Documenti</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
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
                        <div className="font-medium">{member.name}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Email</div>
                        <div className="font-medium">{member.email}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Tipo</div>
                        <div className="font-medium">{member.type}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Stato</div>
                        <div className="font-medium">{member.status}</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {details.fiscalCode && (
                        <div>
                          <div className="text-sm text-muted-foreground">Codice Fiscale</div>
                          <div className="font-medium">{details.fiscalCode}</div>
                        </div>
                      )}
                      {details.vatNumber && (
                        <div>
                          <div className="text-sm text-muted-foreground">Partita IVA</div>
                          <div className="font-medium">{details.vatNumber}</div>
                        </div>
                      )}
                      {details.idType && (
                        <div>
                          <div className="text-sm text-muted-foreground">Documento</div>
                          <div className="font-medium">{details.idType} - {details.idNumber}</div>
                        </div>
                      )}
                      <div>
                        <div className="text-sm text-muted-foreground">Data Registrazione</div>
                        <div className="font-medium">{details.registrationDate}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                        <div className="font-medium">{details.legalAddress}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Indirizzo di fornitura</div>
                        <div className="font-medium">{details.supplyAddress}</div>
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
                        <div className="font-medium">{details.username}</div>
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
            </TabsContent>

            <TabsContent value="energy">
              <Card>
                <CardHeader>
                  <CardTitle>Dati Energetici</CardTitle>
                  <CardDescription>Informazioni relative al POD e ai consumi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Dettagli POD</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Codice POD</div>
                          <div className="font-medium">{details.podCode}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Indirizzo di fornitura</div>
                          <div className="font-medium">{details.supplyAddress}</div>
                        </div>
                      </div>
                    </div>

                    {(member.memberType === 'consumer' || member.memberType === 'prosumer') && (
                      <div>
                        <h3 className="text-lg font-medium mb-2">Dati di Consumo</h3>
                        <div className="h-60">
                          {/* Qui andrebbe un grafico dei consumi */}
                          <div className="bg-slate-100 h-full rounded-md flex items-center justify-center">
                            Grafico dei consumi (ultimi 6 mesi)
                          </div>
                        </div>
                      </div>
                    )}

                    {(member.memberType === 'producer' || member.memberType === 'prosumer') && (
                      <div>
                        <h3 className="text-lg font-medium mb-2">Dati di Produzione</h3>
                        <div className="h-60">
                          {/* Qui andrebbe un grafico della produzione */}
                          <div className="bg-slate-100 h-full rounded-md flex items-center justify-center">
                            Grafico della produzione (ultimi 6 mesi)
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Documenti</CardTitle>
                  <CardDescription>Documenti allegati del membro</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <div className="font-medium">Documento di identità</div>
                        <div className="text-sm text-muted-foreground">Carta d'identità - {details.idNumber}</div>
                      </div>
                      <Button variant="outline" size="sm">Visualizza</Button>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <div className="font-medium">Contratto CER</div>
                        <div className="text-sm text-muted-foreground">Firmato il {details.registrationDate}</div>
                      </div>
                      <Button variant="outline" size="sm">Visualizza</Button>
                    </div>

                    <Button className="w-full mt-4">
                      Carica Nuovo Documento
                    </Button>
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
