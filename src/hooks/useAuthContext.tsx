
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, getUserRole, loginUser, logoutUser } from '@/lib/supabase';
import { AuthState, UserProfile } from '@/types/auth';
import { toast } from 'sonner';

// LocalStorage key
const AUTH_USER_KEY = 'energi-smart-auth-user';

// Default context state
const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

// Create context
const AuthContext = createContext<{
  authState: AuthState;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}>({
  authState: initialState,
  login: async () => ({ success: false }),
  logout: async () => {},
});

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  // Check session on startup
  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("Checking session...");
        
        // First check localStorage for demo user
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
            return; // Stop here if we have a localStorage user
          } catch (e) {
            console.error("Error parsing user from localStorage:", e);
            localStorage.removeItem(AUTH_USER_KEY);
          }
        } else {
          console.log("No user found in localStorage");
        }
        
        // If no localStorage user, check Supabase
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log("Session found:", session);
          const { data: { user } } = await supabase.auth.getUser();
          
          if (user) {
            console.log("User found:", user);
            // Get user role
            const role = await getUserRole();
            console.log("User role:", role);
            
            const userProfile: UserProfile = {
              id: user.id,
              email: user.email || '',
              role: role as 'cer_manager' | 'user' | 'producer' | 'consumer' | 'prosumer' || 'user', 
              created_at: user.created_at || new Date().toISOString(),
            };
            
            // Save to localStorage for persistence
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userProfile));
            
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
          error: 'Error loading session',
        });
        toast.error('Error loading session');
      }
    };

    // Listen for auth state changes
    const authListener = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      if (event === 'SIGNED_IN' && session) {
        await checkSession();
      } else if (event === 'SIGNED_OUT') {
        localStorage.removeItem(AUTH_USER_KEY); // Remove user from localStorage on logout
        setAuthState({ ...initialState, isLoading: false });
      }
    });

    checkSession();
    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login for:", email);
      
      const { data, error } = await loginUser(email, password);

      if (error) {
        console.error("Login error:", error);
        return {
          success: false,
          error: error.message || 'Login error',
        };
      }

      console.log("Login successful:", data);
      
      if (!data || !data.user) {
        console.error("No user data returned from login");
        return { 
          success: false,
          error: 'User data not found'
        };
      }
      
      // Create complete user profile
      const userProfile: UserProfile = {
        id: data.user.id,
        email: data.user.email || '',
        role: data.user.role as 'cer_manager' | 'user' | 'producer' | 'consumer' | 'prosumer',
        created_at: data.user.created_at || new Date().toISOString()
      };
      
      console.log("User profile created:", userProfile);
      
      // Save user to localStorage
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userProfile));
      
      // Update auth state
      setAuthState({
        user: userProfile,
        isLoading: false,
        error: null
      });
      
      return { success: true };
    } catch (error) {
      console.error("Exception during login:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login error',
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      console.log("Logging out...");
      // Remove user from localStorage
      localStorage.removeItem(AUTH_USER_KEY);
      await logoutUser();
      console.log("Logout successful");
      
      // Update state manually
      setAuthState({
        user: null,
        isLoading: false,
        error: null
      });
      
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error('Error during logout');
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}
