import { usePortfolio } from '../context/PortfolioContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, GraduationCap } from 'lucide-react'
import { useState } from 'react'
import { DndSectionList } from './DndSectionList'

export function EducationForm() {
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
          <GraduationCap className="w-6 h-6 text-green-400" />
          Education
        </h2>
        <button
          onClick={() => addItem('education')}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      <DndSectionList
        items={data.education}
        onReorder={(from, to) => reorderItems('education', from, to)}
        renderItem={(edu) => (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-white/10 rounded-xl p-6 pl-10 hover:border-green-500/30 transition-colors bg-white/5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">
                    {edu.degree || 'New Degree'}
                    {edu.school ? ` from ${edu.school}` : ''}
                  </h3>
                  <p className="text-sm text-gray-400">{edu.year || 'Years not specified'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedId === edu.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => removeItem('education', edu.id)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {expandedId === edu.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 pt-4 border-t border-white/10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">School/University</label>
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => updateItem('education', edu.id, { school: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                        placeholder="University name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateItem('education', edu.id, { degree: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                        placeholder="B.Sc Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Field of Study</label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => updateItem('education', edu.id, { field: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                        placeholder="Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Years</label>
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => updateItem('education', edu.id, { year: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                        placeholder="2015 - 2019"
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
