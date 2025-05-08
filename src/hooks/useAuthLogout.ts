
import { useState } from 'react';
import { logoutUser } from '@/lib/supabase';
import { removeUserFromLocalStorage } from '@/lib/auth/authUtils';
import { toast } from 'sonner';

export function useAuthLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      console.log("Logging out...");
      // Remove user from localStorage
      removeUserFromLocalStorage();
      await logoutUser();
      console.log("Logout successful");
      setIsLoggingOut(false);
      return { success: true };
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error('Error during logout');
      setIsLoggingOut(false);
      return { 
        success: false,
        error: error instanceof Error ? error.message : 'Logout error'
      };
    }
  };

  return { logout, isLoggingOut };
}
