import { createClient } from '@supabase/supabase-js';

// Usamos import.meta.env para Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Config de Supabase:", { 
  url: supabaseUrl ? "Detectada" : "Faltante", 
  key: supabaseAnonKey ? "Detectada" : "Faltante" 
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Faltan las variables de entorno de Supabase. Revisa tu archivo .env.local");
}

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Las variables de entorno no se cargaron correctamente.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);