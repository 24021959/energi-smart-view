
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Configuration } from "@/types/configuration";
import { MemberListItem } from "@/types/member";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { AddMemberToConfigDialog } from "@/components/admin/configuration/AddMemberToConfigDialog";

// Dati di esempio
const mockConfigurations: Configuration[] = [
  {
    id: '1',
    name: 'CER Di Peccioli',
    type: 'cer',
    description: 'Simulazione Gruppo di autoconsumo',
    address: 'Via Carlo Serassi, 21',
    city: 'Bergamo',
    postalCode: '24124',
    province: 'BG',
    participants: 5,
    status: 'active',
    imageUrl: '/lovable-uploads/24090a5a-717a-4091-908c-f28d226e8f71.png',
    createdAt: '2023-01-15T10:30:00Z',
    startDate: '2023-02-01'
  },
  {
    id: '2',
    name: 'GAC Testing',
    type: 'gac',
    description: 'Via Roma 123',
    address: 'Via Roma, 123',
    city: 'Roma',
    postalCode: '00100',
    province: 'RM',
    participants: 16,
    status: 'pending',
    createdAt: '2023-02-20T14:15:00Z',
    startDate: '2023-03-15'
  },
  {
    id: '3',
    name: 'Energy Dream',
    type: 'cer',
    description: 'Test CER 2 Gate',
    address: 'Via Energia, 45',
    city: 'Milano',
    postalCode: '20100',
    province: 'MI',
    participants: 8,
    status: 'active',
    imageUrl: '/lovable-uploads/24090a5a-717a-4091-908c-f28d226e8f71.png',
    createdAt: '2023-03-10T09:45:00Z',
    startDate: '2023-04-01'
  },
  {
    id: '4',
    name: 'Stefano Pistoia',
    type: 'msu',
    description: 'Monitoraggio utenza Stefano Pistoia',
    address: 'Via Immaginetta, 28',
    city: 'Pisa',
    postalCode: '56100',
    province: 'PI',
    participants: 1,
    status: 'active',
    createdAt: '2023-04-05T16:20:00Z',
    startDate: '2023-05-01'
  },
];

// Membri di esempio associati alla configurazione
const mockMembers: MemberListItem[] = [
  { id: 1, name: "Mario Rossi", email: "mario.rossi@example.com", type: "person", status: "active", memberType: "consumer", isActive: true },
  { id: 2, name: "Azienda ABC", email: "info@aziendaabc.com", type: "company", status: "active", memberType: "producer", isActive: true },
  { id: 3, name: "Giulia Bianchi", email: "giulia.bianchi@example.com", type: "person", status: "pending", memberType: "consumer", isActive: false },
  { id: 4, name: "Cooperativa Verde", email: "info@cooperativaverde.org", type: "company", status: "active", memberType: "prosumer", isActive: true },
  { id: 5, name: "Lorenzo Neri", email: "lorenzo.neri@example.com", type: "person", status: "active", memberType: "consumer", isActive: true },
];

// Badge per visualizzare il tipo di configurazione
const TypeBadge = ({ type }: { type: string }) => {
  const colors: Record<string, string> = {
    'cer': 'bg-green-100 text-green-800',
    'gac': 'bg-blue-100 text-blue-800',
    'aid': 'bg-purple-100 text-purple-800',
    'cs': 'bg-yellow-100 text-yellow-800',
    'msu': 'bg-orange-100 text-orange-800',
    'edificio': 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${colors[type]}`}>
      {type.toUpperCase()}
    </span>
  );
};

// Badge per visualizzare lo stato della configurazione
const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-orange-100 text-orange-800',
    planning: 'bg-blue-100 text-blue-800',
  };

  const labels: Record<string, string> = {
    active: 'Attivo',
    pending: 'In attesa',
    planning: 'Pianificato',
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${colors[status]}`}>
      {labels[status]}
    </span>
  );
};

const ConfigurationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [configuration, setConfiguration] = useState<Configuration | null>(null);
  const [members, setMembers] = useState<MemberListItem[]>([]);
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);

  useEffect(() => {
    // In un'app reale, qui ci sarebbe una chiamata API
    const config = mockConfigurations.find(c => c.id === id);
    if (config) {
      setConfiguration(config);
      // In un'app reale, qui ci sarebbe una chiamata API per ottenere i membri associati
      setMembers(mockMembers);
    }
  }, [id]);

  const handleEditConfiguration = () => {
    if (configuration) {
      navigate(`/admin/configurations/edit/${configuration.id}`);
    }
  };

  if (!configuration) {
    return (
      <AdminLayout title="Dettaglio Configurazione">
        <div className="container mx-auto px-4 py-8">
          <p>Configurazione non trovata</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={configuration.name}>
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Link to="/admin/configurations" className="mr-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Torna alle configurazioni
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-purple-900">{configuration.name}</h1>
          <div className="ml-auto space-x-2">
            <Button variant="outline" onClick={handleEditConfiguration}>Modifica</Button>
            <Button variant="destructive">Elimina</Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Colonna sinistra - Info configurazione */}
          <div className="w-full lg:w-1/3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Informazioni</CardTitle>
                  <div className="flex space-x-2">
                    <TypeBadge type={configuration.type} />
                    <StatusBadge status={configuration.status} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {configuration.imageUrl && (
                    <div className="flex justify-center mb-4">
                      <div className="w-32 h-32 bg-white rounded-full overflow-hidden border border-gray-200">
                        <img src={configuration.imageUrl} alt={configuration.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Descrizione</h3>
                    <p className="mt-1">{configuration.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Indirizzo</h3>
                    <p className="mt-1">
                      {configuration.address}<br />
                      {configuration.postalCode} {configuration.city} ({configuration.province})
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Data di inizio</h3>
                    <p className="mt-1">{configuration.startDate}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Data creazione</h3>
                    <p className="mt-1">{new Date(configuration.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Colonna destra - Tab con membri e altre informazioni */}
          <div className="w-full lg:w-2/3">
            <Tabs defaultValue="members" className="w-full">
              <TabsList>
                <TabsTrigger value="members">Partecipanti ({configuration.participants})</TabsTrigger>
                <TabsTrigger value="plants">Impianti</TabsTrigger>
                <TabsTrigger value="documents">Documenti</TabsTrigger>
              </TabsList>
              
              <TabsContent value="members" className="pt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Partecipanti</CardTitle>
                      <AddMemberToConfigDialog configId={configuration.id} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Ruolo</TableHead>
                          <TableHead>Stato</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {members.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell className="font-medium">{member.name}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>
                              {member.type === 'person' ? 'Persona' : 'Azienda'}
                            </TableCell>
                            <TableCell>
                              {member.memberType === 'consumer' ? 'Consumatore' : 
                               member.memberType === 'producer' ? 'Produttore' : 'Prosumer'}
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${member.isActive ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                                {member.isActive ? 'Attivo' : 'In attesa'}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="plants" className="pt-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Impianti</CardTitle>
                      <Button size="sm">Aggiungi Impianto</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Nessun impianto associato a questa configurazione.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="documents" className="pt-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Documenti</CardTitle>
                      <Button size="sm">Carica Documento</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Nessun documento caricato per questa configurazione.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ConfigurationDetail;
