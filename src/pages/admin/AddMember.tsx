
import { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
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
  name: string;
  email: string;
  memberType: 'consumer' | 'prosumer';
  type: string;
  address: string;
  termsAccepted: boolean;
}

export default function AddMember() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  
  const form = useForm<MemberFormValues>({
    defaultValues: {
      name: '',
      email: '',
      memberType: 'consumer',
      type: 'Domestico',
      address: '',
      termsAccepted: false
    }
  });

  function onSubmit(data: MemberFormValues) {
    console.log('Form data:', data);
    
    // Simuliamo il salvataggio del membro
    toast({
      title: "Membro aggiunto con successo",
      description: `${data.name} è stato aggiunto come ${data.memberType === 'consumer' ? 'consumer' : 'prosumer'}.`,
    });

    // Redirezione alla lista membri
    setTimeout(() => navigate('/admin/members'), 1500);
  }

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
          
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Nuovo Membro</CardTitle>
              <CardDescription>
                Aggiungi un nuovo membro alla comunità energetica rinnovabile.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      rules={{ required: 'Il nome è obbligatorio' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Mario Rossi" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                            <Input placeholder="mario.rossi@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                          <FormDescription>
                            Seleziona il ruolo del membro all'interno della comunità energetica.
                          </FormDescription>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="type"
                      rules={{ required: 'Il tipo è obbligatorio' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipologia</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex space-x-4"
                            >
                              <div className="flex items-center space-x-1">
                                <RadioGroupItem value="Domestico" id="domestico" />
                                <Label htmlFor="domestico" className="cursor-pointer">Domestico</Label>
                              </div>
                              <div className="flex items-center space-x-1">
                                <RadioGroupItem value="Commerciale" id="commerciale" />
                                <Label htmlFor="commerciale" className="cursor-pointer">Commerciale</Label>
                              </div>
                              <div className="flex items-center space-x-1">
                                <RadioGroupItem value="Industriale" id="industriale" />
                                <Label htmlFor="industriale" className="cursor-pointer">Industriale</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      rules={{ required: 'L\'indirizzo è obbligatorio' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Indirizzo</FormLabel>
                          <FormControl>
                            <Input placeholder="Via Roma 123, 00100 Roma" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="termsAccepted"
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
                    <UserPlus size={18} />
                    Aggiungi Membro
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
