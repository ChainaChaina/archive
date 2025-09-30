import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Configurações para resolver problemas de cookies em localhost
const supabaseOptions = {
  auth: {
    persistSession: false, // Não persistir sessão para evitar problemas de cookies
    autoRefreshToken: false, // Não auto-refresh tokens
    detectSessionInUrl: false, // Não detectar sessão na URL
  },
  global: {
    headers: {
      'X-Client-Info': 'vinyl-archive'
    }
  }
}

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Anon Key:', supabaseAnonKey?.substring(0, 20) + '...')

export const supabase = createClient(supabaseUrl, supabaseAnonKey, supabaseOptions)
