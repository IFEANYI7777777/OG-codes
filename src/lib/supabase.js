import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = () => {
  return (
    !!url &&
    !!key &&
    url.startsWith('https://') &&
    !url.includes('placeholder') &&
    key.length > 10
  )
}

export const supabase = isSupabaseConfigured() ? createClient(url, key) : null
