import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { defaultPortfolioData } from '../lib/defaultData'
import { portfolioSchema } from '../lib/schema'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const PortfolioContext = createContext(null)

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-data')
      if (saved) return JSON.parse(saved)
    } catch { void 0 }
    return defaultPortfolioData
  })
  const [portfolioId, setPortfolioId] = useState(() => localStorage.getItem('portfolio-id') || null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!portfolioId || !isSupabaseConfigured()) return
    const fetch = async () => {
      const { data: row, error } = await supabase.from('portfolios').select('data').eq('id', portfolioId).single()
      if (!error && row) {
        setData(row.data)
        localStorage.setItem('portfolio-data', JSON.stringify(row.data))
      }
      setLoading(false)
    }
    fetch()
  }, [portfolioId])

  const saveToSupabase = useCallback(async (next) => {
    if (!isSupabaseConfigured()) return
    if (!portfolioId) {
      const { data: row, error } = await supabase
        .from('portfolios')
        .insert({ data: next, user_id: (await supabase.auth.getUser()).data.user?.id })
        .select('id')
        .single()
      if (!error && row) {
        setPortfolioId(row.id)
        localStorage.setItem('portfolio-id', row.id)
      }
    } else {
      await supabase.from('portfolios').update({ data: next }).eq('id', portfolioId)
    }
  }, [portfolioId])

  const updateData = useCallback((section, values) => {
    setData(prev => {
      const next = { ...prev, [section]: values }
      localStorage.setItem('portfolio-data', JSON.stringify(next))
      saveToSupabase(next).catch(() => void 0)
      return next
    })
  }, [saveToSupabase])

  const updatePersonal = useCallback((values) => updateData('personal', values), [updateData])
  const updateTheme = useCallback((values) => updateData('theme', values), [updateData])

  const addItem = useCallback((section) => {
    setData(prev => {
      const next = {
        ...prev,
        [section]: [...prev[section], { id: Date.now().toString(), ...(section === 'skills' ? { category: '', items: [] } : {}) }]
      }
      localStorage.setItem('portfolio-data', JSON.stringify(next))
      saveToSupabase(next).catch(() => void 0)
      return next
    })
  }, [saveToSupabase])

  const updateItem = useCallback((section, id, values) => {
    setData(prev => {
      const next = {
        ...prev,
        [section]: prev[section].map(item => item.id === id ? { ...item, ...values } : item)
      }
      localStorage.setItem('portfolio-data', JSON.stringify(next))
      saveToSupabase(next).catch(() => void 0)
      return next
    })
  }, [saveToSupabase])

  const removeItem = useCallback((section, id) => {
    setData(prev => {
      const next = {
        ...prev,
        [section]: prev[section].filter(item => item.id !== id)
      }
      localStorage.setItem('portfolio-data', JSON.stringify(next))
      saveToSupabase(next).catch(() => void 0)
      return next
    })
  }, [saveToSupabase])

  const reorderItems = useCallback((section, fromIndex, toIndex) => {
    setData(prev => {
      const list = [...prev[section]]
      const [moved] = list.splice(fromIndex, 1)
      list.splice(toIndex, 0, moved)
      const next = { ...prev, [section]: list }
      localStorage.setItem('portfolio-data', JSON.stringify(next))
      saveToSupabase(next).catch(() => void 0)
      return next
    })
  }, [saveToSupabase])

  const uploadImage = useCallback(async (file) => {
    if (!isSupabaseConfigured()) {
      return URL.createObjectURL(file)
    }
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`
    const { error } = await supabase.storage.from('portfolio-images').upload(fileName, file)
    if (error) throw error
    const { data: { publicUrl } } = supabase.storage.from('portfolio-images').getPublicUrl(fileName)
    return publicUrl
  }, [])

  const importData = useCallback((json) => {
    const parsed = JSON.parse(json)
    const validated = portfolioSchema.parse(parsed)
    setData(validated)
    localStorage.setItem('portfolio-data', JSON.stringify(validated))
    saveToSupabase(validated).catch(() => void 0)
  }, [saveToSupabase])

  const exportData = useCallback(() => {
    return JSON.stringify(data, null, 2)
  }, [data])

  const resetData = useCallback(() => {
    setData(defaultPortfolioData)
    localStorage.removeItem('portfolio-data')
    saveToSupabase(defaultPortfolioData).catch(() => void 0)
  }, [saveToSupabase])

  const publishPortfolio = useCallback(async (slug) => {
    if (!isSupabaseConfigured()) {
      localStorage.setItem('portfolio-slug', slug)
      return { url: `${window.location.origin}/p/${slug}` }
    }

    const { data: row, error } = await supabase
      .from('portfolios')
      .upsert({ id: portfolioId, slug, published: true, user_id: (await supabase.auth.getUser()).data.user?.id, data })
      .select('slug')
      .single()

    if (error) throw error
    return { url: `${window.location.origin}/p/${row.slug}` }
  }, [portfolioId, data])

  const value = {
    data, setData, loading, portfolioId,
    updatePersonal, updateTheme,
    addItem, updateItem, removeItem, reorderItems,
    importData, exportData, resetData,
    uploadImage, publishPortfolio,
  }

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider')
  return context
}
