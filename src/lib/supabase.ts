
import { createClient } from '@supabase/supabase-js';

// Valori fittizi per test
const supabaseUrl = 'https://yoursupabaseurl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXJzdXBhYmFzZXVybCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjAwMDAwMDAwLCJleHAiOjE5MDAwMDAwMDB9.fittizio';

// Se disponibili, usa le variabili d'ambiente
if (import.meta.env.VITE_SUPABASE_URL) {
  supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
}

if (import.meta.env.VITE_SUPABASE_ANON_KEY) {
  supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Funzione per il login
export async function loginUser(email: string, password: string) {
  try {
    console.log("Tentativo di login per:", email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("Risultato login:", { data, error });
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
    console.log("Controllo ruolo utente...");
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log("Nessun utente trovato");
      return null;
    }
    
    console.log("Utente trovato:", user);
    
    // Per test, restituisci un ruolo fittizio
    // In ambiente di produzione, dovresti recuperare il ruolo dal database
    return 'user'; // oppure 'cer_manager' per testare accessi admin
    
    /* Codice per recuperare il ruolo dal profilo - da implementare quando la tabella sarà creata
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
    */
  } catch (err) {
    console.error("Error getting user role:", err);
    return null;
  }
}
