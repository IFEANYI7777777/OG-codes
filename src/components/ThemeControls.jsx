import { usePortfolio } from '../context/PortfolioContext'
import { motion } from 'framer-motion'
import { Download, Upload, RotateCcw, Palette, FileCode } from 'lucide-react'

export function ThemeControls() {
  const { data, updateTheme, exportData, importData, resetData } = usePortfolio()
  const theme = data.theme

  const handleExport = () => {
    const json = exportData()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio-data.json'
    a.click()
    URL.revokeObjectURL(url)
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

  const templates = [
    { id: 'modern', label: 'Modern', desc: 'Clean and contemporary' },
    { id: 'classic', label: 'Classic', desc: 'Traditional and elegant' },
    { id: 'minimal', label: 'Minimal', desc: 'Simple and focused' },
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
        <Palette className="w-6 h-6 text-indigo-400" />
        <h2 className="text-2xl font-heading font-semibold text-white">Theme & Settings</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-3">Template</label>
          <div className="grid grid-cols-3 gap-3">
            {templates.map(t => (
              <button
                key={t.id}
                onClick={() => updateTheme({ ...theme, template: t.id })}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  theme.template === t.id
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-white/10 hover:border-white/20 bg-white/5'
                }`}
              >
                <div className="font-semibold text-white">{t.label}</div>
                <div className="text-xs text-gray-400 mt-1">{t.desc}</div>
              </button>
            ))}
          </div>
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
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Primary Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.primary}
                onChange={(e) => updateTheme({ ...theme, primary: e.target.value })}
                className="w-12 h-12 rounded-lg border border-white/20 cursor-pointer bg-white/10"
              />
              <input
                type="text"
                value={theme.primary}
                onChange={(e) => updateTheme({ ...theme, primary: e.target.value })}
                className="flex-1 px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Background Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.background}
                onChange={(e) => updateTheme({ ...theme, background: e.target.value })}
                className="w-12 h-12 rounded-lg border border-white/20 cursor-pointer bg-white/10"
              />
              <input
                type="text"
                value={theme.background}
                onChange={(e) => updateTheme({ ...theme, background: e.target.value })}
                className="flex-1 px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Text Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.text}
                onChange={(e) => updateTheme({ ...theme, text: e.target.value })}
                className="w-12 h-12 rounded-lg border border-white/20 cursor-pointer bg-white/10"
              />
              <input
                type="text"
                value={theme.text}
                onChange={(e) => updateTheme({ ...theme, text: e.target.value })}
                className="flex-1 px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Accent Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.secondary}
                onChange={(e) => updateTheme({ ...theme, secondary: e.target.value })}
                className="w-12 h-12 rounded-lg border border-white/20 cursor-pointer bg-white/10"
              />
              <input
                type="text"
                value={theme.secondary}
                onChange={(e) => updateTheme({ ...theme, secondary: e.target.value })}
                className="flex-1 px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              />
            </div>
          </div>
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
      </div>

      <div className="border-t border-white/10 pt-8 space-y-4">
        <h3 className="text-lg font-semibold text-white">Export & Import</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExportHTML}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all"
          >
            <FileCode className="w-4 h-4" />
            Export HTML
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-gray-200 rounded-lg hover:bg-white/20 transition-all"
          >
            <Download className="w-4 h-4" />
            Export JSON
          </button>
          <label className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-gray-200 rounded-lg hover:bg-white/20 transition-all cursor-pointer">
            <Upload className="w-4 h-4" />
            Import JSON
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
          <button
            onClick={resetData}
            className="flex items-center gap-2 px-4 py-2 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-all ml-auto"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
        <p className="text-xs text-gray-500">Export HTML generates a standalone single-file portfolio. Export JSON saves your data for later editing.</p>
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
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: ${theme.font === 'inter' ? "'Inter', system-ui, sans-serif" : theme.font === 'poppins' ? "'Poppins', system-ui, sans-serif" : theme.font === 'roboto' ? "'Roboto', system-ui, sans-serif" : "'Open Sans', system-ui, sans-serif"};
      background: ${theme.background || '#ffffff'};
      color: ${theme.text || '#1f2937'};
      line-height: 1.6;
      padding: 40px 20px;
    }
    .container { max-width: 800px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 40px; }
    .avatar { width: 120px; height: 120px; border-radius: 50%; margin: 0 auto 20px; object-fit: cover; }
    .name { font-size: 2.5rem; font-weight: 700; margin-bottom: 10px; }
    .title { font-size: 1.25rem; color: ${theme.primary || '#2563eb'}; margin-bottom: 20px; }
    .section { margin-bottom: 30px; }
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
          <div class="item-meta">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</div>
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
