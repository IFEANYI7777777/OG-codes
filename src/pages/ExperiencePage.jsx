import { ExperienceForm } from '../components/ExperienceForm'

export function ExperiencePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-800/50 overflow-hidden mb-6">
        <div className="p-8 border-b border-gray-800/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.93 23.93 0 0112 21c-5.383 0-10.27-2.144-13.747-5.745M12 3v11m0 0l-3-3m3 3l3-3M12 3c-4.418 0-8 1.79-8 4s3.582 4 8 4 8-1.79 8-4-3.582-4-8-4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Experience
              </h1>
              <p className="text-gray-400 text-sm">Your career journey</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <ExperienceForm />
        </div>
      </div>
    </div>
  )
}
