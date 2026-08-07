import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { defaultPortfolioData } from '../lib/defaultData'
import { PortfolioPreview } from '../components/PortfolioPreview'
import { Sparkles, Home } from 'lucide-react'

export function PublicPortfolioPage() {
  const { slug } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    const load = async () => {
      if (isSupabaseConfigured()) {
        const { data: row, error } = await supabase
          .from('portfolios')
          .select('data')
          .eq('slug', slug)
          .eq('published', true)
          .single()
        if (mounted) {
          if (error || !row) {
            setError('This portfolio is not available.')
          } else {
            setData(row.data)
          }
          setLoading(false)
        }
        return
      }

      try {
        const saved = localStorage.getItem('portfolio-data')
        if (saved) setData(JSON.parse(saved))
        else setData(defaultPortfolioData)
      } catch {
        setData(defaultPortfolioData)
      }
      if (mounted) setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050508]">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050508]">
      <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-2xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Portfolio Builder
            </span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all text-sm font-medium"
          >
            <Home className="w-4 h-4" />
            Build yours
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {error ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">{error}</p>
            <Link to="/" className="inline-block mt-4 text-indigo-400 hover:text-indigo-300">
              Go to homepage
            </Link>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <PortfolioPreview data={data} />
          </motion.div>
        )}
      </div>
    </div>
  )
}
