import { supabase } from "@/lib/supabase";
import { Plant, PlantFormData, PlantStatus } from "@/types/plant";
import { v4 as uuidv4 } from "uuid";

// Qui conserviamo i dati fittizi per quando non c'è connessione a Supabase
const mockPlants: Plant[] = [
  {
    id: '1',
    name: 'Impianto A',
    type: 'solar',
    power: 100,
    address: 'Via Roma, 1',
    city: 'Roma',
    province: 'RM',
    postalCode: '00100',
    status: 'active',
    owner: 'Mario Rossi',
    installationDate: '2023-01-01',
    createdAt: '2023-01-01',
  },
  {
    id: '2',
    name: 'Impianto B',
    type: 'wind',
    power: 200,
    address: 'Via Milano, 2',
    city: 'Milano',
    province: 'MI',
    postalCode: '20100',
    status: 'inactive',
    owner: 'Luigi Bianchi',
    installationDate: '2023-02-01',
    createdAt: '2023-02-01',
  },
  {
    id: '3',
    name: 'Impianto C',
    type: 'hydro',
    power: 300,
    address: 'Via Napoli, 3',
    city: 'Napoli',
    province: 'NA',
    postalCode: '80100',
    status: 'pending',
    owner: 'Giuseppe Verdi',
    installationDate: '2023-03-01',
    createdAt: '2023-03-01',
  },
];

// Funzione per controllare se stiamo usando dati mock o reali
const isUsingMock = (): boolean => {
  // In una versione reale controlleremmo la connessione a Supabase
  return true; // Per ora usiamo sempre i mock
};

// GET - Ottieni tutti gli impianti
export async function getPlants(): Promise<Plant[]> {
  try {
    if (isUsingMock()) {
      return [...mockPlants];
    }
    
    const { data, error } = await supabase
      .from('plants')
      .select('*');
      
    if (error) {
      console.error('Errore nel recupero impianti:', error);
      throw error;
    }
    
    return data as Plant[];
  } catch (err) {
    console.error('Errore imprevisto:', err);
    return [...mockPlants]; // Fallback ai mock in caso di errore
  }
}

// GET - Ottieni un impianto specifico per ID
export async function getPlantById(id: string): Promise<Plant | null> {
  try {
    if (isUsingMock()) {
      const plant = mockPlants.find(p => p.id === id);
      return plant || null;
    }
    
    const { data, error } = await supabase
      .from('plants')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Errore nel recupero impianto:', error);
      throw error;
    }
    
    return data as Plant;
  } catch (err) {
    console.error('Errore imprevisto:', err);
    const mockPlant = mockPlants.find(p => p.id === id);
    return mockPlant || null;
  }
}

// POST - Crea un nuovo impianto
export async function createPlant(plantData: PlantFormData, status: PlantStatus = 'pending'): Promise<Plant> {
  try {
    const newPlant: Plant = {
      id: uuidv4(),
      ...plantData,
      status,
      createdAt: new Date().toISOString(),
    };
    
    if (isUsingMock()) {
      // Aggiungeremmo l'impianto ai mock
      console.log('Nuovo impianto creato (mock):', newPlant);
      return newPlant;
    }
    
    const { data, error } = await supabase
      .from('plants')
      .insert(newPlant)
      .select()
      .single();
      
    if (error) {
      console.error('Errore nella creazione impianto:', error);
      throw error;
    }
    
    return data as Plant;
  } catch (err) {
    console.error('Errore imprevisto:', err);
    throw err;
  }
}

// PUT - Aggiorna un impianto esistente
export async function updatePlant(id: string, plantData: Partial<PlantFormData>, status?: PlantStatus): Promise<Plant> {
  try {
    const updateData = {
      ...plantData,
      ...(status && { status }),
      updatedAt: new Date().toISOString(),
    };
    
    if (isUsingMock()) {
      // Simula l'aggiornamento
      console.log('Impianto aggiornato (mock):', { id, ...updateData });
      
      // Restituisci un oggetto che assomiglia a un impianto aggiornato
      return {
        id,
        name: plantData.name || 'Nome aggiornato',
        type: plantData.type || 'solar',
        power: plantData.power || 100,
        address: plantData.address || 'Indirizzo aggiornato',
        city: plantData.city || 'Città',
        province: plantData.province || 'PR',
        postalCode: plantData.postalCode || '00000',
        status: status || 'active',
        owner: plantData.owner || 'Proprietario',
        installationDate: plantData.installationDate || new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
    }
    
    const { data, error } = await supabase
      .from('plants')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Errore nell\'aggiornamento impianto:', error);
      throw error;
    }
    
    return data as Plant;
  } catch (err) {
    console.error('Errore imprevisto:', err);
    throw err;
  }
}

// DELETE - Elimina un impianto
export async function deletePlant(id: string): Promise<boolean> {
  try {
    if (isUsingMock()) {
      // Simula l'eliminazione
      console.log('Impianto eliminato (mock):', id);
      return true;
    }
    
    const { error } = await supabase
      .from('plants')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Errore nell\'eliminazione impianto:', error);
      throw error;
    }
    
    return true;
  } catch (err) {
    console.error('Errore imprevisto:', err);
    throw err;
  }
}
