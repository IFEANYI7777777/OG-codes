import { usePortfolio } from '../context/PortfolioContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Briefcase } from 'lucide-react'
import { useState } from 'react'
import { DndSectionList } from './DndSectionList'

export function ExperienceForm() {
  const { data, addItem, updateItem, removeItem, reorderItems } = usePortfolio()
  const [expandedId, setExpandedId] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-semibold text-white flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-indigo-400" />
          Work Experience
        </h2>
        <button
          onClick={() => addItem('experience')}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Position
        </button>
      </div>

      <DndSectionList
        items={data.experience}
        onReorder={(from, to) => reorderItems('experience', from, to)}
        renderItem={(exp) => (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-white/10 rounded-xl p-6 pl-10 hover:border-indigo-500/30 transition-colors bg-white/5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">
                    {exp.role || 'New Position'}
                    {exp.company ? ` at ${exp.company}` : ''}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {exp.startDate || 'Start date'} {exp.current ? ' - Present' : (exp.endDate || 'End date')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedId === exp.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => removeItem('experience', exp.id)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {expandedId === exp.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 pt-4 border-t border-white/10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateItem('experience', exp.id, { company: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Role</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateItem('experience', exp.id, { role: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                        placeholder="Job title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Start Date</label>
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateItem('experience', exp.id, { startDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">End Date</label>
                      <input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateItem('experience', exp.id, { endDate: e.target.value })}
                        disabled={exp.current}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <label className="flex items-center gap-2 mt-2">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateItem('experience', exp.id, { current: e.target.checked })}
                          className="w-4 h-4 text-indigo-500 border-white/20 rounded focus:ring-indigo-400 bg-white/5"
                        />
                        <span className="text-sm text-gray-300">I currently work here</span>
                      </label>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-200 mb-2">Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateItem('experience', exp.id, { description: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all resize-none"
                        placeholder="What did you do here?"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-200 mb-2">Technologies (comma separated)</label>
                      <input
                        type="text"
                        value={exp.technologies.join(', ')}
                        onChange={(e) => updateItem('experience', exp.id, { technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                        placeholder="React, Node.js, TypeScript"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      />
    </motion.div>
  )
}
