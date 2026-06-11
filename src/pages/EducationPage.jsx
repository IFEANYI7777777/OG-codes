import { EducationForm } from '../components/EducationForm'

export function EducationPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-800/50 overflow-hidden mb-6">
        <div className="p-8 border-b border-gray-800/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Education
              </h1>
              <p className="text-gray-400 text-sm">Your academic background</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <EducationForm />
        </div>
      </div>
    </div>
  )
}
