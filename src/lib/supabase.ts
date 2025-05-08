
import { createClient } from '@supabase/supabase-js';

// Valori fittizi per test
let supabaseUrl = 'https://yoursupabaseurl.supabase.co';
let supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXJzdXBhYmFzZXVybCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjAwMDAwMDAwLCJleHAiOjE5MDAwMDAwMDB9.fittizio';

// Se disponibili, usa le variabili d'ambiente
if (import.meta.env.VITE_SUPABASE_URL) {
  supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
}

if (import.meta.env.VITE_SUPABASE_ANON_KEY) {
  supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Utenti demo per test con diversi ruoli
const demoUsers = {
  "utente@utente.it": {
    id: "user-123",
    email: "utente@utente.it",
    password: "utente",
    role: "user",
    created_at: new Date().toISOString()
  },
  "gestore@gestore.it": {
    id: "manager-456",
    email: "gestore@gestore.it",
    password: "gestore",
    role: "cer_manager",
    created_at: new Date().toISOString()
  },
  "producer@producer.it": {
    id: "producer-789",
    email: "producer@producer.it",
    password: "producer",
    role: "producer",
    created_at: new Date().toISOString()
  },
  "consumer@consumer.it": {
    id: "consumer-012",
    email: "consumer@consumer.it",
    password: "consumer",
    role: "consumer",
    created_at: new Date().toISOString()
  },
  "prosumer@prosumer.it": {
    id: "prosumer-345",
    email: "prosumer@prosumer.it",
    password: "prosumer",
    role: "prosumer",
    created_at: new Date().toISOString()
  }
};

// Funzione per il login
export async function loginUser(email: string, password: string) {
  try {
    console.log("Tentativo di login per:", email);
    
    // Verifica se è un utente demo
    const demoUser = demoUsers[email.toLowerCase()];
    if (demoUser && demoUser.password === password) {
      console.log("Login demo riuscito per:", email, "con ruolo:", demoUser.role);
      return {
        data: {
          user: demoUser
        },
        error: null
      };
    }
    
    // Se non è un utente demo o le credenziali sono errate, prova con Supabase
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
    
    // Controlla se è uno dei nostri utenti demo basandosi sull'email
    if (user.email) {
      const demoUser = demoUsers[user.email.toLowerCase()];
      if (demoUser) {
        console.log("Utente demo trovato con ruolo:", demoUser.role);
        return demoUser.role;
      }
    }
    
    // Per test, restituisci un ruolo fittizio se non è un utente demo
    console.log("Nessun utente demo trovato, restituisco ruolo default");
    return 'user'; // oppure 'cer_manager' per testare accessi admin
  } catch (err) {
    console.error("Error getting user role:", err);
    return null;
  }
}
