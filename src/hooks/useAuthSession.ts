
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { AuthState } from '@/types/auth';
import { fetchUserSession, loadUserFromLocalStorage } from '@/lib/auth/authUtils';

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

export function useAuthSession() {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("Checking session...");
        
        // First check localStorage for demo user
        const localUser = loadUserFromLocalStorage();
        if (localUser) {
          console.log("User found in localStorage:", localUser);
          setAuthState({
            user: localUser,
            isLoading: false,
            error: null,
          });
          return; // Stop here if we have a localStorage user
        }
        
        // If no localStorage user, check Supabase
        console.log("No localStorage user found, checking Supabase session...");
        const userProfile = await fetchUserSession();
        
        if (userProfile) {
          console.log("Supabase user session found:", userProfile);
          setAuthState({
            user: userProfile,
            isLoading: false,
            error: null,
          });
        } else {
          console.log("No user session found in Supabase either");
          setAuthState({ ...initialState, isLoading: false });
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setAuthState({
          user: null,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Error loading session',
        });
      }
    };

    console.log("useAuthSession hook initializing");
    checkSession();

    // Listen for auth state changes
    const authListener = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      if (event === 'SIGNED_IN' && session) {
        await checkSession();
      } else if (event === 'SIGNED_OUT') {
        console.log("User signed out, clearing auth state");
        setAuthState({ ...initialState, isLoading: false });
      }
    });

    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, []);

  return { authState, setAuthState };
}
