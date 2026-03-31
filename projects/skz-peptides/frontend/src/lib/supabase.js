import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key not provided. Orders will use localStorage only.')
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database table schemas
export const createTables = async () => {
  if (!supabase) return false
  
  try {
    // This would normally be done via Supabase dashboard SQL editor
    // Orders table structure:
    // CREATE TABLE orders (
    //   id TEXT PRIMARY KEY,
    //   customer_name TEXT NOT NULL,
    //   customer_phone TEXT,
    //   notes TEXT,
    //   items JSONB NOT NULL,
    //   total DECIMAL(10,2) NOT NULL,
    //   status TEXT DEFAULT 'Pending',
    //   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    //   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    // );
    
    return true
  } catch (error) {
    console.error('Error creating tables:', error)
    return false
  }
}