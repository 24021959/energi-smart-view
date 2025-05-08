
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/types/auth';
import { toast } from 'sonner';

// LocalStorage key
export const AUTH_USER_KEY = 'energi-smart-auth-user';

/**
 * Loads user data from localStorage
 */
export const loadUserFromLocalStorage = (): UserProfile | null => {
  try {
    const localUser = localStorage.getItem(AUTH_USER_KEY);
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      console.log("User found in localStorage:", parsedUser);
      return parsedUser;
    }
    console.log("No user found in localStorage");
    return null;
  } catch (e) {
    console.error("Error parsing user from localStorage:", e);
    localStorage.removeItem(AUTH_USER_KEY);
    return null;
  }
};

/**
 * Saves user data to localStorage
 */
export const saveUserToLocalStorage = (user: UserProfile): void => {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  console.log("User saved to localStorage:", user);
};

/**
 * Removes user data from localStorage
 */
export const removeUserFromLocalStorage = (): void => {
  localStorage.removeItem(AUTH_USER_KEY);
  console.log("User removed from localStorage");
};

/**
 * Fetches current user session from Supabase
 */
export const fetchUserSession = async (): Promise<UserProfile | null> => {
  try {
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
        saveUserToLocalStorage(userProfile);
        
        return userProfile;
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching user session:", error);
    toast.error('Error loading session');
    return null;
  }
};

/**
 * Gets current user role
 * Re-export from supabase.ts
 */
export async function getUserRole() {
  // Import here to avoid circular dependencies
  const { getUserRole: getRole } = await import('@/lib/supabase');
  return getRole();
}
