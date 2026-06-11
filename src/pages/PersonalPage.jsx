import { PersonalInfoForm } from '../components/PersonalInfoForm'

export function PersonalPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header card */}
      <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-800/50 overflow-hidden mb-6">
        <div className="p-8 border-b border-gray-800/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
                Personal Information
              </h1>
              <p className="text-gray-400 text-sm">Your professional identity</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <PersonalInfoForm />
        </div>
      </div>
    </div>
  )
}
