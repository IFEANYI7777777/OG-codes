import { SkillsForm } from '../components/SkillsForm'

export function SkillsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-800/50 overflow-hidden mb-6">
        <div className="p-8 border-b border-gray-800/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                Skills
              </h1>
              <p className="text-gray-400 text-sm">Your expertise and abilities</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <SkillsForm />
        </div>
      </div>
    </div>
  )
}
