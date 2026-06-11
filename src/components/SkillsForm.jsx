import { usePortfolio } from '../context/PortfolioContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, GripVertical, Code, Sparkles, Database, Cloud } from 'lucide-react'
import { useState } from 'react'

const categoryIcons = {
  'frontend': Code,
  'backend': Database,
  'devops': Cloud,
  'design': Sparkles,
  'default': Code,
}

export function SkillsForm() {
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
          <Code className="w-6 h-6 text-violet-400" />
          Skills
        </h2>
        <button
          onClick={() => addItem('skills')}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <AnimatePresence>
        {data.skills.map((skill, index) => {
          const Icon = categoryIcons[skill.category?.toLowerCase()] || categoryIcons.default
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border border-white/10 rounded-xl p-6 hover:border-violet-500/30 transition-colors bg-white/5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4 flex-1">
                  <GripVertical className="w-5 h-5 text-gray-500 cursor-move" />
                  <Icon className="w-5 h-5 text-violet-400" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {skill.category || 'New Category'}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {skill.items.length} skill{skill.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExpandedId(expandedId === index ? null : index)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedId === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => removeItem('skills', index)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {expandedId === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 pt-4 border-t border-white/10"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Category</label>
                      <input
                        type="text"
                        value={skill.category}
                        onChange={(e) => {
                          const newSkills = [...data.skills]
                          newSkills[index] = { ...newSkills[index], category: e.target.value }
                          updateItem('skills', index, newSkills[index])
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
                        placeholder="e.g., Frontend"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Skills (comma separated)</label>
                      <textarea
                        value={skill.items.join(', ')}
                        onChange={(e) => {
                          const newSkills = [...data.skills]
                          newSkills[index] = { ...newSkills[index], items: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }
                          updateItem('skills', index, newSkills[index])
                        }}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all resize-none"
                        placeholder="React, Next.js, TypeScript"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </motion.div>
  )
}