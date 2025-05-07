
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Mancano le variabili di ambiente per Supabase');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Funzione per il login
export async function loginUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  } catch (err) {
    console.error("Error during login:", err);
    return { data: null, error: err instanceof Error ? err : new Error('Errore sconosciuto durante il login') };
  }
}

// Funzione per il logout
export async function logoutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err) {
    console.error("Error during logout:", err);
    return { error: err instanceof Error ? err : new Error('Errore sconosciuto durante il logout') };
  }
}

// Funzione per controllare il ruolo dell'utente
export async function getUserRole() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    // Ottieni il ruolo dell'utente dal profilo
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (error || !data) {
      console.error("Error fetching user role:", error);
      return null;
    }
    return data.role;
  } catch (err) {
    console.error("Error getting user role:", err);
    return null;
  }
}
