
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, getUserRole, loginUser, logoutUser } from '@/lib/supabase';
import { AuthState, UserProfile } from '@/types/auth';
import { toast } from '@/hooks/use-toast';

// Valore predefinito del contesto
const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

// Chiavi localStorage
const AUTH_USER_KEY = 'energi-smart-auth-user';

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
        
        // Prima verifica se c'è un utente in localStorage (per utenti demo)
        const localUser = localStorage.getItem(AUTH_USER_KEY);
        if (localUser) {
          try {
            const parsedUser = JSON.parse(localUser);
            console.log("User found in localStorage:", parsedUser);
            setAuthState({
              user: parsedUser,
              isLoading: false,
              error: null,
            });
            return; // Interrompi qui se c'è un utente nel localStorage
          } catch (e) {
            console.error("Error parsing user from localStorage:", e);
            localStorage.removeItem(AUTH_USER_KEY);
          }
        }
        
        // Se non c'è un utente nel localStorage, verifica con supabase
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log("Session found:", session);
          const { data: { user } } = await supabase.auth.getUser();
          
          if (user) {
            console.log("User found:", user);
            // Recupera il ruolo dell'utente
            const role = await getUserRole();
            console.log("User role:", role);
            
            const userProfile = {
              id: user.id,
              email: user.email || '',
              role: role as 'cer_manager' | 'user' | 'producer' | 'consumer' | 'prosumer' || 'user', // Fallback al ruolo 'user' se non definito
              created_at: user.created_at || new Date().toISOString(),
            };
            
            setAuthState({
              user: userProfile,
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
        localStorage.removeItem(AUTH_USER_KEY); // Rimuovi utente dal localStorage al logout
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
      
      // Aggiorno lo stato manualmente per garantire un reindirizzamento corretto
      if (data && data.user) {
        // Salva l'utente nel localStorage per utenti demo
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify({
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
          created_at: data.user.created_at
        }));
        
        setAuthState({
          user: {
            id: data.user.id,
            email: data.user.email,
            role: data.user.role,
            created_at: data.user.created_at
          },
          isLoading: false,
          error: null
        });
      }
      
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
      // Rimuovi utente dal localStorage
      localStorage.removeItem(AUTH_USER_KEY);
      await logoutUser();
      console.log("Logout successful");
      
      // Aggiorno lo stato manualmente
      setAuthState({
        user: null,
        isLoading: false,
        error: null
      });
      
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
