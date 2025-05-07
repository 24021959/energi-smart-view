
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, getUserRole } from '@/lib/supabase';
import { AuthState, UserProfile } from '@/types/auth';

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
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { data: { user } } = await supabase.auth.getUser();
          const role = await getUserRole();
          
          if (user) {
            setAuthState({
              user: {
                id: user.id,
                email: user.email || '',
                role: role as 'cer_manager' | 'user',
                created_at: user.created_at || new Date().toISOString(),
              },
              isLoading: false,
              error: null,
            });
          } else {
            setAuthState({ ...initialState, isLoading: false });
          }
        } else {
          setAuthState({ ...initialState, isLoading: false });
        }
      } catch (error) {
        setAuthState({
          user: null,
          isLoading: false,
          error: 'Errore durante il caricamento della sessione',
        });
      }
    };

    const authListener = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_IN') {
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      // Il listener si occuperà di aggiornare lo stato
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: 'Errore durante il login',
      };
    }
  };

  // Funzione di logout
  const logout = async () => {
    await supabase.auth.signOut();
    // Il listener si occuperà di aggiornare lo stato
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
