
import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UserPlus, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { MemberFormValues } from '@/types/member';

// Import smaller component pieces
import EntityTypeSelector from '@/components/admin/member/EntityTypeSelector';
import MemberTypeSelector from '@/components/admin/member/MemberTypeSelector';
import GeneralInfoForm from '@/components/admin/member/GeneralInfoForm';
import PersonalInfoForm from '@/components/admin/member/PersonalInfoForm';
import CompanyInfoForm from '@/components/admin/member/CompanyInfoForm';
import AddressInfoForm from '@/components/admin/member/AddressInfoForm';
import TermsAcceptanceForm from '@/components/admin/member/TermsAcceptanceForm';
import ConfigurationSelector from '@/components/admin/member/ConfigurationSelector';

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
      configurationId: '',
      termsAccepted: false
    }
  });
  
  // Watch values for conditional rendering and effects
  const sameAddressValue = form.watch("sameAddress");
  const entityTypeValue = form.watch("entityType");

  // When sameAddress changes, update supplyAddress if necessary
  useEffect(() => {
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
    
    if (!data.configurationId) {
      toast({
        title: "Configurazione mancante",
        description: "È necessario selezionare una configurazione.",
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
                  {/* Tipo di entità e ruolo */}
                  <div className="space-y-4">
                    <EntityTypeSelector 
                      control={form.control} 
                      resetField={form.resetField}
                      setIdDocumentFile={setIdDocumentFile}
                      setChamberOfCommerceFile={setChamberOfCommerceFile}
                    />
                    
                    <MemberTypeSelector control={form.control} />

                    {/* Selezione della configurazione */}
                    <div className="border rounded-md p-4">
                      <h3 className="text-lg font-medium mb-4">Associazione</h3>
                      <ConfigurationSelector control={form.control} />
                    </div>

                    {/* Dati generali */}
                    <div className="border rounded-md p-4">
                      <h3 className="text-lg font-medium mb-4">
                        {entityTypeValue === 'person' ? 'Dati personali' : 'Dati aziendali'}
                      </h3>
                      
                      <div className="space-y-4">
                        {/* Dati comuni */}
                        <GeneralInfoForm 
                          control={form.control}
                          entityType={entityTypeValue}
                        />

                        {/* Campi specifici per persone fisiche */}
                        {entityTypeValue === 'person' && (
                          <PersonalInfoForm
                            control={form.control}
                            idDocumentFile={idDocumentFile}
                            handleIdDocumentUpload={handleIdDocumentUpload}
                          />
                        )}

                        {/* Campi specifici per aziende */}
                        {entityTypeValue === 'company' && (
                          <CompanyInfoForm
                            control={form.control}
                            chamberOfCommerceFile={chamberOfCommerceFile}
                            handleChamberDocUpload={handleChamberDocUpload}
                          />
                        )}
                      </div>
                    </div>

                    {/* Sezione indirizzi */}
                    <div className="border rounded-md p-4">
                      <h3 className="text-lg font-medium mb-4">Indirizzi</h3>
                      
                      <div className="space-y-4">
                        <AddressInfoForm 
                          control={form.control}
                          watch={form.watch}
                          setValue={form.setValue}
                          entityType={entityTypeValue}
                        />
                      </div>
                    </div>

                    {/* Termini e condizioni */}
                    <TermsAcceptanceForm control={form.control} />
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
