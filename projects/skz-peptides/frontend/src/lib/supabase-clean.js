import { createClient } from '@supabase/supabase-js'

// Hardcoded for now to avoid env variable issues
const supabaseUrl = 'https://maiktyhqvyfyxhcoiauu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1haWt0eWhxdnlmeXhoY29pYXV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NTg0OTYsImV4cCI6MjA5MDUzNDQ5Nn0.TSEK25biMIbZII8udHWDyWqyxsXpc3UXHENU7kShRlM'

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key (first 50 chars):', supabaseAnonKey.substring(0, 50) + '...')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test connection
export const testConnection = async () => {
  try {
    console.log('Testing Supabase connection...')
    const { data, error } = await supabase.from('orders').select('count').limit(1)
    if (error) {
      console.error('Supabase connection error:', error)
      return false
    }
    console.log('Supabase connection successful!')
    return true
  } catch (err) {
    console.error('Supabase connection failed:', err)
    return false
  }
}