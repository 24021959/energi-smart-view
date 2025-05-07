
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, getUserRole, loginUser } from '@/lib/supabase';
import { AuthState, UserProfile } from '@/types/auth';
import { toast } from '@/hooks/use-toast';

// Valore predefinito del contesto
const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

// Creazione del contesto
const AuthContext = createContext<{
  authState: AuthState;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}>({
  authState: initialState,
  login: async () => ({ success: false }),
  logout: async () => {},
});

// Provider del contesto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  // Controlla la sessione all'avvio
  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("Checking session...");
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log("Session found:", session);
          const { data: { user } } = await supabase.auth.getUser();
          
          if (user) {
            console.log("User found:", user);
            // Recupera il ruolo dell'utente
            const role = await getUserRole();
            console.log("User role:", role);
            
            setAuthState({
              user: {
                id: user.id,
                email: user.email || '',
                role: role as 'cer_manager' | 'user' || 'user', // Fallback al ruolo 'user' se non definito
                created_at: user.created_at || new Date().toISOString(),
              },
              isLoading: false,
              error: null,
            });
          } else {
            console.log("No user found in session");
            setAuthState({ ...initialState, isLoading: false });
          }
        } else {
          console.log("No session found");
          setAuthState({ ...initialState, isLoading: false });
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setAuthState({
          user: null,
          isLoading: false,
          error: 'Errore durante il caricamento della sessione',
        });
        toast({
          variant: "destructive",
          title: "Errore",
          description: "Impossibile caricare la sessione utente",
        });
      }
    };

    const authListener = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      if (event === 'SIGNED_IN' && session) {
        await checkSession();
      } else if (event === 'SIGNED_OUT') {
        setAuthState({ ...initialState, isLoading: false });
      }
    });

    checkSession();
    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, []);

  // Funzione di login
  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login for:", email);
      
      const { data, error } = await loginUser(email, password);

      if (error) {
        console.error("Login error:", error);
        return {
          success: false,
          error: error.message || 'Errore durante il login',
        };
      }

      console.log("Login successful:", data);
      // Il listener si occuperà di aggiornare lo stato
      return { success: true };
    } catch (error) {
      console.error("Exception during login:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Errore durante il login',
      };
    }
  };

  // Funzione di logout
  const logout = async () => {
    try {
      console.log("Logging out...");
      await supabase.auth.signOut();
      console.log("Logout successful");
      // Il listener si occuperà di aggiornare lo stato
    } catch (error) {
      console.error("Error during logout:", error);
      toast({
        variant: "destructive",
        title: "Errore",
        description: "Impossibile effettuare il logout",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizzato per utilizzare il contesto
export function useAuth() {
  return useContext(AuthContext);
}
