
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/Logo';
import { LoginFormData } from '@/types/auth';
import LoginForm from '@/components/auth/LoginForm';
import { getRedirectPathForRole } from '@/lib/config';

// Form validation schema
const loginSchema = z.object({
  email: z.string().email({
    message: 'Email non valida'
  }),
  password: z.string().min(6, {
    message: 'Password deve contenere almeno 6 caratteri'
  })
}) as z.ZodType<LoginFormData>;

// Login component
export default function Login() {
  const { authState, login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debug auth state changes
  useEffect(() => {
    console.log("Login component - Auth state changed:", { 
      user: authState.user, 
      isLoading: authState.isLoading,
      error: authState.error
    });
    
    if (authState.user) {
      // Redirect to appropriate dashboard based on role
      redirectToUserDashboard(authState.user.role);
    }
  }, [authState.user, authState.isLoading]);

  // Redirect function
  const redirectToUserDashboard = (role: string) => {
    const path = getRedirectPathForRole(role);
    console.log(`Login - Redirecting to: ${path} for user with role ${role}`);
    navigate(path, { replace: true });
  };

  // Form setup with react-hook-form
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // If user is already authenticated, redirect
  if (authState.user && !authState.isLoading) {
    const path = getRedirectPathForRole(authState.user.role);
    console.log(`Automatic redirect to ${path}`);
    return <Navigate to={path} replace />;
  }

  // Form submission handler
  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      console.log("Login attempt with:", data);
      const { success, error } = await login(data.email, data.password);
      
      if (success) {
        toast.success("Accesso effettuato", {
          description: `Benvenuto nel sistema EnergiSmart`
        });
        // Redirection will be handled by the effect monitoring authState.user
      } else {
        toast.error("Errore di accesso", {
          description: error || "Credenziali non valide"
        });
      }
    } catch (error) {
      toast.error("Errore", {
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
          
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">Credenziali di test:</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>
                <p><strong>Consumer:</strong></p>
                <p>consumer@consumer.it</p>
                <p>password: consumer</p>
              </div>
              <div>
                <p><strong>Producer:</strong></p>
                <p>producer@producer.it</p>
                <p>password: producer</p>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>
                <p><strong>Prosumer:</strong></p>
                <p>prosumer@prosumer.it</p>
                <p>password: prosumer</p>
              </div>
              <div>
                <p><strong>Admin/CER:</strong></p>
                <p>gestore@gestore.it</p>
                <p>password: gestore</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
