import { createContext, useContext, useState, useCallback } from 'react'
import { defaultPortfolioData } from '../lib/defaultData'
import { portfolioSchema } from '../lib/schema'

const PortfolioContext = createContext(null)

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-data')
      if (saved) return JSON.parse(saved)
    } catch { void 0; }
    return defaultPortfolioData
  })

  const updateData = useCallback((section, values) => {
    setData(prev => {
      const next = { ...prev, [section]: values }
      localStorage.setItem('portfolio-data', JSON.stringify(next))
      return next
    })
  }, [])

  const updatePersonal = useCallback((values) => updateData('personal', values), [updateData])
  const updateTheme = useCallback((values) => updateData('theme', values), [updateData])

  const addItem = useCallback((section) => {
    setData(prev => {
      const next = {
        ...prev,
        [section]: [...prev[section], { id: Date.now().toString(), ...(section === 'skills' ? { category: '', items: [] } : {}) }]
      }
      localStorage.setItem('portfolio-data', JSON.stringify(next))
      return next
    })
  }, [])

  const updateItem = useCallback((section, id, values) => {
    setData(prev => {
      const next = {
        ...prev,
        [section]: prev[section].map(item => item.id === id ? { ...item, ...values } : item)
      }
      localStorage.setItem('portfolio-data', JSON.stringify(next))
      return next
    })
  }, [])

  const removeItem = useCallback((section, id) => {
    setData(prev => {
      const next = {
        ...prev,
        [section]: prev[section].filter(item => item.id !== id)
      }
      localStorage.setItem('portfolio-data', JSON.stringify(next))
      return next
    })
  }, [])

  const importData = useCallback((json) => {
    const parsed = JSON.parse(json)
    const validated = portfolioSchema.parse(parsed)
    setData(validated)
    localStorage.setItem('portfolio-data', JSON.stringify(validated))
  }, [])

  const exportData = useCallback(() => {
    return JSON.stringify(data, null, 2)
  }, [data])

  const resetData = useCallback(() => {
    setData(defaultPortfolioData)
    localStorage.removeItem('portfolio-data')
  }, [])

  const value = {
    data,
    updatePersonal,
    updateTheme,
    addItem,
    updateItem,
    removeItem,
    importData,
    exportData,
    resetData,
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
