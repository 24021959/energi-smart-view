
import { useState } from 'react';
import { loginUser } from '@/lib/supabase';
import { UserProfile } from '@/types/auth';
import { saveUserToLocalStorage } from '@/lib/auth/authUtils';

export function useAuthLogin() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoggingIn(true);
    try {
      console.log("Attempting login for:", email);
      
      const { data, error } = await loginUser(email, password);

      if (error) {
        console.error("Login error:", error);
        setIsLoggingIn(false);
        return {
          success: false,
          error: error.message || 'Login error',
        };
      }

      console.log("Login successful:", data);
      
      if (!data || !data.user) {
        console.error("No user data returned from login");
        setIsLoggingIn(false);
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
      saveUserToLocalStorage(userProfile);
      
      setIsLoggingIn(false);
      return { success: true, user: userProfile };
    } catch (error) {
      console.error("Exception during login:", error);
      setIsLoggingIn(false);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login error',
      };
    }
  };

  return { login, isLoggingIn };
}
