import { usePortfolio } from '../context/PortfolioContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, GripVertical, FolderOpen, Star } from 'lucide-react'
import { useState } from 'react'

export function ProjectsForm() {
  const { data, addItem, updateItem, removeItem } = usePortfolio()
  const [expandedId, setExpandedId] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-semibold text-white flex items-center gap-2">
          <FolderOpen className="w-6 h-6 text-pink-400" />
          Projects
        </h2>
        <button
          onClick={() => addItem('projects')}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg hover:shadow-lg hover:shadow-pink-500/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      <AnimatePresence>
        {data.projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-white/10 rounded-xl p-6 hover:border-pink-500/30 transition-colors bg-white/5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4 flex-1">
                <GripVertical className="w-5 h-5 text-gray-500 cursor-move" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{project.title || 'New Project'}</h3>
                    {project.featured && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                  </div>
                  <p className="text-sm text-gray-400">{project.description || 'No description'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedId === project.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => removeItem('projects', project.id)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {expandedId === project.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 pt-4 border-t border-white/10"
                >
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Title</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => updateItem('projects', project.id, { title: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                        placeholder="Project name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Description</label>
                      <textarea
                        value={project.description}
                        onChange={(e) => updateItem('projects', project.id, { description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all resize-none"
                        placeholder="What does this project do?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">URL</label>
                      <input
                        type="url"
                        value={project.url}
                        onChange={(e) => updateItem('projects', project.id, { url: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                        placeholder="https://project-link.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Technologies (comma separated)</label>
                      <input
                        type="text"
                        value={project.technologies.join(', ')}
                        onChange={(e) => updateItem('projects', project.id, { technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                        placeholder="React, Next.js, Tailwind"
                      />
                    </div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={project.featured}
                        onChange={(e) => updateItem('projects', project.id, { featured: e.target.checked })}
                        className="w-4 h-4 text-pink-500 border-white/20 rounded focus:ring-pink-400 bg-white/5"
                      />
                      <span className="text-sm text-gray-300">Featured project</span>
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}