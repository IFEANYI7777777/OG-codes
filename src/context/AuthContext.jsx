/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (!isSupabaseConfigured()) {
      try {
        const saved = localStorage.getItem('portfolio-user')
        if (saved) return JSON.parse(saved)
      } catch { void 0 }
    }
    return null
  })
  const [loading, setLoading] = useState(() => isSupabaseConfigured())

  useEffect(() => {
    if (!isSupabaseConfigured()) return

    let mounted = true
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setUser(session?.user ?? null)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const login = useCallback(async (email, password) => {
    if (!isSupabaseConfigured()) {
      const users = JSON.parse(localStorage.getItem('portfolio-users') || '[]')
      const found = users.find(u => u.email === email && u.password === password)
      if (!found) throw new Error('Invalid email or password')
      const session = { email: found.email, name: found.name, id: found.email }
      setUser(session)
      localStorage.setItem('portfolio-user', JSON.stringify(session))
      return session
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data.user
  }, [])

  const register = useCallback(async (name, email, password) => {
    if (!isSupabaseConfigured()) {
      const users = JSON.parse(localStorage.getItem('portfolio-users') || '[]')
      if (users.find(u => u.email === email)) throw new Error('Email already in use')
      users.push({ name, email, password })
      localStorage.setItem('portfolio-users', JSON.stringify(users))
      const session = { email, name, id: email }
      setUser(session)
      localStorage.setItem('portfolio-user', JSON.stringify(session))
      return session
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: name } }
    })
    if (error) throw error

    if (data.user) {
      await supabase.from('profiles').upsert({ id: data.user.id, email, display_name: name })
    }

    return data.user
  }, [])

  const logout = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setUser(null)
      localStorage.removeItem('portfolio-user')
      return
    }
    await supabase.auth.signOut()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
