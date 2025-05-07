import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, User, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Schema di validazione del form
const loginSchema = z.object({
  email: z.string().email({
    message: 'Email non valida'
  }),
  password: z.string().min(6, {
    message: 'Password deve contenere almeno 6 caratteri'
  })
});
type LoginFormData = z.infer<typeof loginSchema>;
export default function Login() {
  const {
    authState,
    login
  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<'user' | 'cer_manager'>('user');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Se l'utente è già autenticato, reindirizza
  if (authState.user) {
    // Reindirizza in base al ruolo
    if (authState.user.role === 'cer_manager') {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  // Configurazione del form con react-hook-form
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Gestione del submit del form
  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      const {
        success,
        error
      } = await login(data.email, data.password);
      if (success) {
        toast({
          title: "Accesso effettuato",
          description: `Benvenuto nel sistema EnergiSmart`
        });
      } else {
        toast({
          variant: "destructive",
          title: "Errore di accesso",
          description: error || "Credenziali non valide"
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Errore",
        description: "Si è verificato un errore durante il login"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-secondary/20 to-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Energy Smart</CardTitle>
          <CardDescription>
            Accedi alla piattaforma di gestione energetica
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="user" value={loginType} onValueChange={value => setLoginType(value as 'user' | 'cer_manager')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="user" className="flex items-center gap-2">
                <User size={16} />
                Utente
              </TabsTrigger>
              <TabsTrigger value="cer_manager" className="flex items-center gap-2">
                <Users size={16} />
                Gestore CER
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="user" className="mt-0">
              <div className={`p-4 rounded-md mb-4 bg-blue-50 border border-blue-100`}>
                <h3 className="font-medium text-blue-800">Accesso Utente</h3>
                <p className="text-sm text-blue-700">
                  Accedi per visualizzare i tuoi dati energetici personali
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="cer_manager" className="mt-0">
              <div className={`p-4 rounded-md mb-4 bg-purple-50 border border-purple-100`}>
                <h3 className="font-medium text-purple-800">Accesso Gestore CER</h3>
                <p className="text-sm text-purple-700">
                  Accedi come gestore della Comunità Energetica Rinnovabile
                </p>
              </div>
            </TabsContent>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="email" render={({
                field
              }) => <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                <FormField control={form.control} name="password" render={({
                field
              }) => <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                          <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <Button type="submit" className={`w-full ${loginType === 'cer_manager' ? 'bg-purple-600 hover:bg-purple-700' : ''}`} disabled={isSubmitting}>
                  {isSubmitting ? "Accesso in corso..." : "Accedi"}
                </Button>
              </form>
            </Form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-sm text-center text-muted-foreground">
            Per assistenza contattare il supporto tecnico
          </p>
        </CardFooter>
      </Card>
    </div>;
}