
import { createContext, useContext, ReactNode } from 'react';
import { AuthState, UserProfile, LoginResult, LogoutResult } from '@/types/auth';
import { useAuthSession } from './useAuthSession';
import { useAuthLogin } from './useAuthLogin';
import { useAuthLogout } from './useAuthLogout';

// Define strongly typed context interface
interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<LogoutResult>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  authState: { user: null, isLoading: true, error: null },
  login: async () => ({ success: false }),
  logout: async () => ({ success: false }),
});

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const { authState, setAuthState } = useAuthSession();
  const { login: loginHook } = useAuthLogin();
  const { logout: logoutHook } = useAuthLogout();

  // Login function
  const login = async (email: string, password: string): Promise<LoginResult> => {
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
  const logout = async (): Promise<LogoutResult> => {
    const result = await logoutHook();
    
    if (result.success) {
      // Update state manually
      setAuthState({
        user: null,
        isLoading: false,
        error: null
      });
    }
    
    return result;
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
