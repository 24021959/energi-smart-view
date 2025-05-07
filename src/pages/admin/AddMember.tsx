import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ArrowLeft, UserPlus, Upload, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface MemberFormValues {
  // Dati generali
  entityType: 'person' | 'company'; // Tipo di entità: persona fisica o giuridica
  memberType: 'consumer' | 'prosumer'; // Ruolo nella CER
  
  // Dati personali/aziendali
  name: string; // Nome completo o ragione sociale
  email: string;
  phone: string;
  
  // Per persone fisiche
  fiscalCode: string; // Codice fiscale
  idType: string; // Tipo documento
  idNumber: string; // Numero documento
  // idDocument: File; // File del documento d'identità (gestito separatamente)
  
  // Per aziende
  vatNumber: string; // Partita IVA
  companyType: string; // Tipo società
  // chamberOfCommerceDoc: File; // Visura camerale (gestito separatamente)
  
  // Indirizzi
  legalAddress: string; // Indirizzo di residenza/sede legale
  supplyAddress: string; // Indirizzo di fornitura
  sameAddress: boolean; // Flag se gli indirizzi coincidono
  
  // POD e dati energetici
  podCode: string; // Codice POD
  
  // Accettazione termini
  termsAccepted: boolean;
}

export default function AddMember() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [idDocumentFile, setIdDocumentFile] = useState<File | null>(null);
  const [chamberOfCommerceFile, setChamberOfCommerceFile] = useState<File | null>(null);
  
  const form = useForm<MemberFormValues>({
    defaultValues: {
      entityType: 'person',
      memberType: 'consumer',
      name: '',
      email: '',
      phone: '',
      fiscalCode: '',
      idType: 'identity_card',
      idNumber: '',
      vatNumber: '',
      companyType: '',
      legalAddress: '',
      supplyAddress: '',
      sameAddress: false,
      podCode: '',
      termsAccepted: false
    }
  });
  
  // Osservatore per il campo sameAddress
  const sameAddressValue = form.watch("sameAddress");
  const entityTypeValue = form.watch("entityType");

  // Quando cambia sameAddress, aggiorna supplyAddress se necessario
  React.useEffect(() => {
    if (sameAddressValue) {
      const legalAddress = form.getValues("legalAddress");
      form.setValue("supplyAddress", legalAddress);
    }
  }, [sameAddressValue, form]);

  function onSubmit(data: MemberFormValues) {
    console.log('Form data:', data);
    console.log('ID Document:', idDocumentFile);
    console.log('Chamber of Commerce Doc:', chamberOfCommerceFile);
    
    // Verifica che i documenti richiesti siano stati caricati
    if (entityTypeValue === 'person' && !idDocumentFile) {
      toast({
        title: "Documento mancante",
        description: "È necessario caricare un documento d'identità.",
        variant: "destructive"
      });
      return;
    }
    
    if (entityTypeValue === 'company' && !chamberOfCommerceFile) {
      toast({
        title: "Documento mancante",
        description: "È necessario caricare la visura camerale.",
        variant: "destructive"
      });
      return;
    }
    
    // Simuliamo il salvataggio del membro
    toast({
      title: "Membro aggiunto con successo",
      description: `${data.name} è stato aggiunto come ${data.memberType === 'consumer' ? 'consumer' : 'prosumer'}.`,
    });

    // Redirezione alla lista membri
    setTimeout(() => navigate('/admin/members'), 1500);
  }

  // Gestione caricamento file documento d'identità
  const handleIdDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdDocumentFile(e.target.files[0]);
    }
  };
  
  // Gestione caricamento visura camerale
  const handleChamberDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setChamberOfCommerceFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Area principale */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="flex items-center gap-2 mb-6">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/admin/members')}
              className="h-8 w-8"
            >
              <ArrowLeft size={18} />
            </Button>
            <h1 className="text-2xl font-bold">Aggiungi Membro CER</h1>
          </div>
          
          <Card className="max-w-3xl mx-auto mb-8">
            <CardHeader>
              <CardTitle>Nuovo Membro</CardTitle>
              <CardDescription>
                Aggiungi un nuovo membro alla comunità energetica rinnovabile.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Tipo di entità */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="entityType"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Tipo di soggetto</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => {
                                field.onChange(value);
                                // Reset dei campi non necessari quando cambia il tipo di entità
                                if (value === 'person') {
                                  form.resetField('vatNumber');
                                  form.resetField('companyType');
                                  setChamberOfCommerceFile(null);
                                } else {
                                  form.resetField('fiscalCode');
                                  form.resetField('idType');
                                  form.resetField('idNumber');
                                  setIdDocumentFile(null);
                                }
                              }}
                              defaultValue={field.value}
                              className="flex space-x-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="person" id="person" />
                                <Label htmlFor="person" className="cursor-pointer">Persona fisica</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="company" id="company" />
                                <Label htmlFor="company" className="cursor-pointer">Azienda/Ente</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Ruolo nella CER */}
                    <FormField
                      control={form.control}
                      name="memberType"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Ruolo nella CER</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="consumer" id="consumer" />
                                <Label htmlFor="consumer" className="cursor-pointer">Consumer (solo utilizzo energia)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="prosumer" id="prosumer" />
                                <Label htmlFor="prosumer" className="cursor-pointer">Prosumer (produzione e utilizzo energia)</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Dati generali */}
                    <div className="border rounded-md p-4">
                      <h3 className="text-lg font-medium mb-4">
                        {entityTypeValue === 'person' ? 'Dati personali' : 'Dati aziendali'}
                      </h3>
                      
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          rules={{ required: entityTypeValue === 'person' ? 'Il nome è obbligatorio' : 'La ragione sociale è obbligatoria' }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{entityTypeValue === 'person' ? 'Nome e cognome' : 'Ragione sociale'}</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={entityTypeValue === 'person' ? "Mario Rossi" : "Nome Azienda S.p.A."} 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            rules={{ 
                              required: 'L\'email è obbligatoria',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Indirizzo email non valido',
                              }
                            }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="esempio@dominio.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            rules={{ 
                              required: 'Il numero di telefono è obbligatorio',
                              pattern: {
                                value: /^[0-9+\s]+$/,
                                message: 'Numero di telefono non valido',
                              }
                            }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Telefono</FormLabel>
                                <FormControl>
                                  <Input placeholder="+39 123 456 7890" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Campi specifici per persone fisiche */}
                        {entityTypeValue === 'person' && (
                          <>
                            <FormField
                              control={form.control}
                              name="fiscalCode"
                              rules={{ 
                                required: 'Il codice fiscale è obbligatorio',
                                pattern: {
                                  value: /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i,
                                  message: 'Codice fiscale non valido',
                                }
                              }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Codice Fiscale</FormLabel>
                                  <FormControl>
                                    <Input placeholder="RSSMRA80A01H501U" {...field} autoCapitalize="characters" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="idType"
                                rules={{ required: 'Il tipo di documento è obbligatorio' }}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Tipo documento</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Seleziona il tipo di documento" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="identity_card">Carta d'identità</SelectItem>
                                        <SelectItem value="passport">Passaporto</SelectItem>
                                        <SelectItem value="driving_license">Patente di guida</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="idNumber"
                                rules={{ required: 'Il numero del documento è obbligatorio' }}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Numero documento</FormLabel>
                                    <FormControl>
                                      <Input placeholder="CA12345AA" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            {/* Caricamento documento d'identità */}
                            <div className="space-y-2">
                              <Label htmlFor="idDocument">Documento d'identità* (PDF, JPG, PNG)</Label>
                              <div className="flex items-center gap-4">
                                <Input
                                  id="idDocument"
                                  type="file"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  onChange={handleIdDocumentUpload}
                                  className="max-w-sm"
                                />
                                {idDocumentFile && (
                                  <span className="text-sm text-green-600">
                                    {idDocumentFile.name} caricato
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Carica una scansione/foto del documento d'identità.
                              </p>
                            </div>
                          </>
                        )}

                        {/* Campi specifici per aziende */}
                        {entityTypeValue === 'company' && (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="vatNumber"
                                rules={{ 
                                  required: 'La partita IVA è obbligatoria',
                                  pattern: {
                                    value: /^[0-9]{11}$/,
                                    message: 'Partita IVA non valida',
                                  }
                                }}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Partita IVA</FormLabel>
                                    <FormControl>
                                      <Input placeholder="12345678901" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="companyType"
                                rules={{ required: 'Il tipo di società è obbligatorio' }}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Tipo società</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Seleziona il tipo di società" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="spa">S.p.A.</SelectItem>
                                        <SelectItem value="srl">S.r.l.</SelectItem>
                                        <SelectItem value="snc">S.n.c.</SelectItem>
                                        <SelectItem value="sas">S.a.s.</SelectItem>
                                        <SelectItem value="ditta_individuale">Ditta individuale</SelectItem>
                                        <SelectItem value="pa">Pubblica Amministrazione</SelectItem>
                                        <SelectItem value="other">Altro</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            {/* Caricamento visura camerale */}
                            <div className="space-y-2">
                              <Label htmlFor="chamberDoc">Visura camerale* (PDF)</Label>
                              <div className="flex items-center gap-4">
                                <Input
                                  id="chamberDoc"
                                  type="file"
                                  accept=".pdf"
                                  onChange={handleChamberDocUpload}
                                  className="max-w-sm"
                                />
                                {chamberOfCommerceFile && (
                                  <span className="text-sm text-green-600">
                                    {chamberOfCommerceFile.name} caricato
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Carica una copia della visura camerale recente (non più vecchia di 6 mesi).
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Sezione indirizzi */}
                    <div className="border rounded-md p-4">
                      <h3 className="text-lg font-medium mb-4">Indirizzi</h3>
                      
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="legalAddress"
                          rules={{ required: entityTypeValue === 'person' ? 'L\'indirizzo di residenza è obbligatorio' : 'L\'indirizzo della sede legale è obbligatorio' }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {entityTypeValue === 'person' ? 'Indirizzo di residenza' : 'Sede legale'}
                              </FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Via/Piazza, numero civico, CAP, Città, Provincia" 
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    // Se gli indirizzi sono gli stessi, aggiorna anche l'indirizzo di fornitura
                                    if (sameAddressValue) {
                                      form.setValue("supplyAddress", e.target.value);
                                    }
                                  }} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="sameAddress"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  L'indirizzo di fornitura coincide con {entityTypeValue === 'person' ? 'la residenza' : 'la sede legale'}
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        {!sameAddressValue && (
                          <FormField
                            control={form.control}
                            name="supplyAddress"
                            rules={{ required: 'L\'indirizzo di fornitura è obbligatorio' }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Indirizzo di fornitura elettrica</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Via/Piazza, numero civico, CAP, Città, Provincia" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        
                        <FormField
                          control={form.control}
                          name="podCode"
                          rules={{ 
                            required: 'Il codice POD è obbligatorio',
                            pattern: {
                              value: /^IT\d{3}E\d{8}$/,
                              message: 'Formato POD non valido (es. IT001E12345678)'
                            }
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Codice POD</FormLabel>
                              <FormControl>
                                <Input placeholder="IT001E12345678" {...field} />
                              </FormControl>
                              <FormDescription>
                                Il codice identificativo del punto di prelievo dell'energia elettrica (si trova sulla bolletta).
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Termini e condizioni */}
                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      rules={{ required: 'Devi accettare i termini per procedere' }}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Accettazione termini</FormLabel>
                            <FormDescription>
                              Il membro ha accettato i termini e le condizioni di partecipazione alla CER.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full gap-2">
                    {entityTypeValue === 'person' ? (
                      <UserPlus size={18} />
                    ) : (
                      <Building size={18} />
                    )}
                    {entityTypeValue === 'person' ? 'Aggiungi Persona' : 'Aggiungi Azienda'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
