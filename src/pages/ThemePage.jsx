import { ThemeControls } from '../components/ThemeControls'

export function ThemePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-800/50 overflow-hidden mb-6">
        <div className="p-8 border-b border-gray-800/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Theme & Settings
              </h1>
              <p className="text-gray-400 text-sm">Customize your portfolio look</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <ThemeControls />
        </div>
      </div>
    </div>
  )
}
