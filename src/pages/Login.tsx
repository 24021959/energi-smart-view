
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
}) as z.ZodType<LoginFormData>;

// Componente principale Login
export default function Login() {
  const { authState, login } = useAuth();
  const navigate = useNavigate();
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
    switch(authState.user.role) {
      case 'cer_manager':
        console.log("Reindirizzamento a /admin");
        return <Navigate to="/admin" replace />;
      case 'consumer':
        console.log("Reindirizzamento a /consumer");
        return <Navigate to="/consumer" replace />;
      case 'prosumer':
        console.log("Reindirizzamento a /prosumer");
        return <Navigate to="/prosumer" replace />;
      case 'producer':
        console.log("Reindirizzamento a /producer");
        return <Navigate to="/producer" replace />;
      default:
        console.log("Reindirizzamento a /");
        return <Navigate to="/" replace />;
    }
  }

  // Gestione del submit del form
  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      console.log("Tentativo di login con:", data);
      const { success, error } = await login(data.email, data.password);
      if (success) {
        toast({
          title: "Accesso effettuato",
          description: `Benvenuto nel sistema EnergiSmart`
        });
        
        // Il reindirizzamento verrà gestito automaticamente in base al ruolo dell'utente
        // dal controllo in cima a questa funzione quando authState.user sarà aggiornato
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
          <CardDescription>
            Accedi alla piattaforma della Comunità Energetica Rinnovabile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  );
}
