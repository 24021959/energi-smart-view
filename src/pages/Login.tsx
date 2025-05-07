
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Logo } from '@/components/Logo';
import { LoginFormData } from '@/types/auth';
import LoginForm from '@/components/auth/LoginForm';

// Schema di validazione del form
const loginSchema = z.object({
  email: z.string().email({
    message: 'Email non valida'
  }),
  password: z.string().min(6, {
    message: 'Password deve contenere almeno 6 caratteri'
  })
});

// Componente principale Login
export default function Login() {
  const { authState, login } = useAuth();
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<'user' | 'cer_manager'>('user');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Configurazione del form con react-hook-form
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Se l'utente è già autenticato, reindirizza
  if (authState.user) {
    console.log("Utente autenticato:", authState.user);
    // Reindirizza in base al ruolo
    if (authState.user.role === 'cer_manager') {
      console.log("Reindirizzamento a /admin");
      return <Navigate to="/admin" replace />;
    } else {
      console.log("Reindirizzamento a /");
      return <Navigate to="/" replace />;
    }
  }

  // Gestione del submit del form
  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      const { success, error } = await login(data.email, data.password);
      if (success) {
        toast({
          title: "Accesso effettuato",
          description: `Benvenuto nel sistema EnergiSmart`
        });
        
        // Forza il reindirizzamento in base all'email
        if (data.email.toLowerCase() === 'gestore@gestore.it') {
          console.log("Login come gestore, reindirizzamento a /admin");
          navigate('/admin');
        } else {
          console.log("Login come utente normale, reindirizzamento a /");
          navigate('/');
        }
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-secondary/20 to-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Logo size="md" />
          </div>
          <CardTitle className="text-3xl font-bold text-violet-900">Energy Smart</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue="user" 
            value={loginType} 
            onValueChange={value => setLoginType(value as 'user' | 'cer_manager')} 
            className="w-full"
          >
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
            
            <TabsContent value="user" className="mt-0"></TabsContent>
            <TabsContent value="cer_manager" className="mt-0"></TabsContent>

            <LoginForm
              form={form}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              loginType={loginType}
            />
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
