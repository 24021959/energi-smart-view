
import { createContext, useContext, ReactNode } from 'react';
import { AuthState, UserProfile } from '@/types/auth';
import { useAuthSession } from './useAuthSession';
import { useAuthLogin } from './useAuthLogin';
import { useAuthLogout } from './useAuthLogout';

// Create context
const AuthContext = createContext<{
  authState: AuthState;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}>({
  authState: { user: null, isLoading: true, error: null },
  login: async () => ({ success: false }),
  logout: async () => {},
});

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const { authState, setAuthState } = useAuthSession();
  const { login: loginHook } = useAuthLogin();
  const { logout: logoutHook } = useAuthLogout();

  // Login function
  const login = async (email: string, password: string) => {
    const result = await loginHook(email, password);
    
    if (result.success && result.user) {
      // Update auth state with the new user
      setAuthState({
        user: result.user,
        isLoading: false,
        error: null
      });
      return { success: true };
    }
    
    return {
      success: false,
      error: result.error || 'Unknown login error'
    };
  };

  // Logout function
  const logout = async () => {
    const result = await logoutHook();
    
    if (result.success) {
      // Update state manually
      setAuthState({
        user: null,
        isLoading: false,
        error: null
      });
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
