import { usePortfolio } from '../context/PortfolioContext'
import { isSupabaseConfigured } from '../lib/supabase'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Download, Upload, Sparkles, Globe, BarChart3,
  Crown, LayoutTemplate, FileText, GripVertical, Link2, Copy
} from 'lucide-react'

export function ThemeControls() {
  const { data, updateTheme, exportData, importData, resetData, publishPortfolio } = usePortfolio()
  const theme = data.theme
  const [slug, setSlug] = useState('')
  const [publishedUrl, setPublishedUrl] = useState('')
  const [publishing, setPublishing] = useState(false)

  const handlePublish = async () => {
    const finalSlug = (slug || data.personal.name || 'portfolio')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    if (!finalSlug) return
    setPublishing(true)
    try {
      const { url } = await publishPortfolio(finalSlug)
      setPublishedUrl(url)
    } catch (err) {
      alert('Could not publish: ' + err.message)
    }
    setPublishing(false)
  }

  const copyUrl = () => {
    navigator.clipboard?.writeText(publishedUrl)
  }

  const handleExportJSON = () => {
    const json = exportData()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio-data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleExportPDF = () => {
    window.print()
  }

  const handleExportHTML = () => {
    const portfolioHTML = generatePortfolioHTML(data)
    const blob = new Blob([portfolioHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'my-portfolio.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => importData(event.target.result)
      reader.readAsText(file)
    }
  }

  const handleAIDescriptions = () => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    if (!apiKey) {
      alert('Add VITE_OPENAI_API_KEY to .env to enable AI descriptions')
      return
    }
    // Placeholder: actual AI call goes here
    alert('AI description generation requires an API integration.')
  }

  const templates = [
    { id: 'modern', label: 'Modern', desc: 'Clean' },
    { id: 'classic', label: 'Classic', desc: 'Traditional' },
    { id: 'minimal', label: 'Minimal', desc: 'Simple' },
    { id: 'neon', label: 'Neon', desc: 'Premium', price: '$9' },
    { id: 'corporate', label: 'Corporate', desc: 'Premium', price: '$9' },
    { id: 'creative', label: 'Creative', desc: 'Premium', price: '$9' },
  ]

  const fonts = [
    { id: 'inter', label: 'Inter' },
    { id: 'poppins', label: 'Poppins' },
    { id: 'roboto', label: 'Roboto' },
    { id: 'opensans', label: 'Open Sans' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-3">
        <LayoutTemplate className="w-6 h-6 text-indigo-400" />
        <h2 className="text-2xl font-heading font-semibold text-white">Theme & Settings</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-3">Template</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {templates.map(t => (
              <button
                key={t.id}
                onClick={() => updateTheme({ ...theme, template: t.id })}
                className={`p-4 rounded-xl border-2 transition-all text-left relative ${
                  theme.template === t.id
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-white/10 hover:border-white/20 bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{t.label}</div>
                    <div className="text-xs text-gray-400 mt-1">{t.desc}</div>
                  </div>
                  {t.price && (
                    <span className="flex items-center gap-1 text-xs font-medium text-amber-400 bg-amber-400/10 px-2 py-1 rounded-lg">
                      <Crown className="w-3 h-3" />
                      {t.price}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">Premium templates require the Premium plan.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-3">Font Family</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {fonts.map(f => (
              <button
                key={f.id}
                onClick={() => updateTheme({ ...theme, font: f.id })}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  theme.font === f.id
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-white/10 hover:border-white/20 bg-white/5'
                }`}
                style={{ fontFamily: f.id === 'inter' ? 'Inter, sans-serif' : f.id === 'poppins' ? 'Poppins, sans-serif' : f.id === 'roboto' ? 'Roboto, sans-serif' : 'Open Sans, sans-serif' }}
              >
                <div className="font-semibold text-white">Aa</div>
                <div className="text-xs text-gray-400 mt-1">{f.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Primary Color', field: 'primary' },
            { label: 'Background Color', field: 'background' },
            { label: 'Text Color', field: 'text' },
            { label: 'Accent/Secondary Color', field: 'secondary' },
          ].map(color => (
            <div key={color.field}>
              <label className="block text-sm font-medium text-gray-200 mb-2">{color.label}</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme[color.field]}
                  onChange={(e) => updateTheme({ ...theme, [color.field]: e.target.value })}
                  className="w-12 h-12 rounded-lg border border-white/20 cursor-pointer bg-white/10"
                />
                <input
                  type="text"
                  value={theme[color.field]}
                  onChange={(e) => updateTheme({ ...theme, [color.field]: e.target.value })}
                  className="flex-1 px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-3">Spacing</label>
          <div className="grid grid-cols-3 gap-3">
            {['compact', 'normal', 'relaxed'].map(spacing => (
              <button
                key={spacing}
                onClick={() => updateTheme({ ...theme, spacing })}
                className={`p-3 rounded-xl border-2 transition-all capitalize ${
                  theme.spacing === spacing
                    ? 'border-indigo-500 bg-indigo-500/10 text-white'
                    : 'border-white/10 text-gray-300 hover:border-white/20 hover:text-white bg-white/5'
                }`}
              >
                {spacing}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <GripVertical className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Drag-and-drop section ordering requires the premium editor.</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 space-y-6">
        <h3 className="text-lg font-semibold text-white">Export & Share</h3>
        <div className="flex flex-wrap gap-3">
          <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all">
            <FileText className="w-4 h-4" />
            Export PDF
          </button>
          <button onClick={handleExportHTML} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all">
            <Globe className="w-4 h-4" />
            Export HTML
          </button>
          <button onClick={handleExportJSON} className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-gray-200 rounded-lg hover:bg-white/20 transition-all">
            <Download className="w-4 h-4" />
            Export JSON
          </button>
          <label className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-gray-200 rounded-lg hover:bg-white/20 transition-all cursor-pointer">
            <Upload className="w-4 h-4" />
            Import JSON
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
          <button onClick={resetData} className="flex items-center gap-2 px-4 py-2 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-all ml-auto">
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-white">Public Portfolio URL</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="your-portfolio-slug"
                className="flex-1 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              />
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all text-sm font-medium disabled:opacity-50"
              >
                <Link2 className="w-4 h-4" />
                {publishing ? 'Publishing...' : 'Publish'}
              </button>
            </div>
            {publishedUrl && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                <a href={publishedUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-xs text-green-300 truncate hover:underline">{publishedUrl}</a>
                <button onClick={copyUrl} className="p-1 text-green-300 hover:text-white" title="Copy">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            )}
            <p className="text-xs text-gray-500">
              {isSupabaseConfigured() ? 'Stored in your Supabase project and live at the URL above.' : 'Saved locally — connect Supabase in .env to make it public on the web.'}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium text-white">Analytics</span>
            </div>
            <p className="text-xs text-gray-400">View count, referrers, and engagement (requires Supabase analytics table).</p>
            <button onClick={() => alert('Analytics requires Supabase integration.')} className="text-xs text-indigo-400 hover:text-indigo-300">View dashboard →</button>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-white">AI Descriptions</span>
            </div>
            <p className="text-xs text-gray-400">Generate bio, project summaries, and experience descriptions from your data.</p>
            <button onClick={handleAIDescriptions} className="text-xs text-purple-400 hover:text-purple-300">Try AI writer →</button>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-white">Custom Domain</span>
            </div>
            <p className="text-xs text-gray-400">Connect your own domain (requires DNS setup + premium plan).</p>
            <button onClick={() => alert('Custom domains require domain verification via Supabase/Netlify.')} className="text-xs text-amber-400 hover:text-amber-300">Setup domain →</button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function generatePortfolioHTML(data) {
  const p = data.personal
  const theme = data.theme
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${p.name || 'My Portfolio'}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: ${theme.font === 'inter' ? "'Inter', system-ui, sans-serif" : theme.font === 'poppins' ? "'Poppins', system-ui, sans-serif" : theme.font === 'roboto' ? "'Roboto', system-ui, sans-serif" : "'Open Sans', system-ui, sans-serif"};
      background: ${theme.background || '#ffffff'};
      color: ${theme.text || '#1f2937'};
      line-height: 1.6;
      padding: 40px 20px;
    }
    @media print {
      body { padding: 0; }
    }
    .container { max-width: 800px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 40px; }
    .avatar { width: 120px; height: 120px; border-radius: 50%; margin: 0 auto 20px; object-fit: cover; }
    .name { font-size: 2.5rem; font-weight: 700; margin-bottom: 10px; }
    .title { font-size: 1.25rem; color: ${theme.primary || '#2563eb'}; margin-bottom: 20px; }
    .section { margin-bottom: 30px; page-break-inside: avoid; }
    .section-title { font-size: 1.5rem; font-weight: 600; margin-bottom: 15px; border-bottom: 2px solid ${theme.primary || '#2563eb'}; padding-bottom: 10px; }
    .item { margin-bottom: 20px; }
    .item-title { font-weight: 600; font-size: 1.1rem; }
    .item-meta { color: ${theme.secondary || '#1e293b'}; font-size: 0.9rem; margin: 5px 0; }
    .tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
    .tag { background: ${theme.primary ? theme.primary + '20' : '#2563eb20'}; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; }
  </style>
</head>
<body>
  <div class="container">
    <header class="header">
      ${p.avatar ? `<img src="${p.avatar}" alt="${p.name}" class="avatar" />` : ''}
      <h1 class="name">${p.name || 'Your Name'}</h1>
      ${p.title ? `<p class="title">${p.title}</p>` : ''}
      ${p.bio ? `<p>${p.bio}</p>` : ''}
    </header>
    ${data.experience.length ? `
    <section class="section">
      <h2 class="section-title">Experience</h2>
      ${data.experience.map(exp => `
        <div class="item">
          <div class="item-title">${exp.role} at ${exp.company}</div>
          <div class="item-meta">${exp.startDate || ''} - ${exp.current ? 'Present' : (exp.endDate || '')}</div>
          ${exp.description ? `<p>${exp.description}</p>` : ''}
          ${exp.technologies?.length ? `<div class="tags">${exp.technologies.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
        </div>
      `).join('')}
    </section>` : ''}
    ${data.projects.length ? `
    <section class="section">
      <h2 class="section-title">Projects</h2>
      ${data.projects.map(project => `
        <div class="item">
          <div class="item-title">${project.title}</div>
          ${project.url ? `<a href="${project.url}" target="_blank">View Project</a>` : ''}
          ${project.description ? `<p>${project.description}</p>` : ''}
          ${project.technologies?.length ? `<div class="tags">${project.technologies.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
        </div>
      `).join('')}
    </section>` : ''}
    ${data.skills.length ? `
    <section class="section">
      <h2 class="section-title">Skills</h2>
      ${data.skills.map(skill => `
        <div class="item">
          <div class="item-title">${skill.category}</div>
          <div class="tags">${skill.items?.map(item => `<span class="tag">${item}</span>`).join('') || ''}</div>
        </div>
      `).join('')}
    </section>` : ''}
    ${data.education.length ? `
    <section class="section">
      <h2 class="section-title">Education</h2>
      ${data.education.map(edu => `
        <div class="item">
          <div class="item-title">${edu.degree} from ${edu.school}</div>
          ${edu.field ? `<div class="item-meta">${edu.field}</div>` : ''}
          ${edu.year ? `<div class="item-meta">${edu.year}</div>` : ''}
        </div>
      `).join('')}
    </section>` : ''}
  </div>
</body>
</html>`
}