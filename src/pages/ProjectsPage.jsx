import { ProjectsForm } from '../components/ProjectsForm'

export function ProjectsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-800/50 overflow-hidden mb-6">
        <div className="p-8 border-b border-gray-800/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-transparent">
                Projects
              </h1>
              <p className="text-gray-400 text-sm">Showcase your best work</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <ProjectsForm />
        </div>
      </div>
    </div>
  )
}
