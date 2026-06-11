import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { PortfolioProvider } from './context/PortfolioContext'
import { AnimatePresence, motion } from 'framer-motion'
import {
  User, Briefcase, FolderOpen, Code, GraduationCap, Palette,
  Sparkles, Menu
} from 'lucide-react'
import { useState } from 'react'
import { PersonalPage } from './pages/PersonalPage'
import { ExperiencePage } from './pages/ExperiencePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { SkillsPage } from './pages/SkillsPage'
import { EducationPage } from './pages/EducationPage'
import { ThemePage } from './pages/ThemePage'

function NavItem({ to, icon: Icon, label }) {
  const location = useLocation()
  const isActive = location.pathname === to || (to === '/personal' && location.pathname === '/')

  return (
    <Link
      to={to}
      className="relative flex flex-col items-center gap-1 px-6 py-2 transition-all duration-300 group"
    >
      <div className="relative">
        <Icon className={`w-6 h-6 transition-colors duration-300 ${
          isActive ? 'text-indigo-400' : 'text-gray-400 group-hover:text-white'
        }`} />
        {isActive && (
          <motion.div
            layoutId="activeGlow"
            className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur-md"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
      </div>
      <span className={`text-xs font-medium transition-colors duration-300 ${
        isActive ? 'text-indigo-300' : 'text-gray-500 group-hover:text-gray-300'
      }`}>
        {label}
      </span>
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute -bottom-3 w-12 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  )
}

function TopNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { to: '/', icon: User, label: 'Personal' },
    { to: '/experience', icon: Briefcase, label: 'Experience' },
    { to: '/projects', icon: FolderOpen, label: 'Projects' },
    { to: '/skills', icon: Code, label: 'Skills' },
    { to: '/education', icon: GraduationCap, label: 'Education' },
    { to: '/theme', icon: Palette, label: 'Theme' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-2xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo - Left */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hidden sm:block">
            Portfolio Builder
          </span>
        </Link>

        {/* Center Navigation */}
        <nav className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => (
              <NavItem key={item.to} to={item.to} icon={item.icon} label={item.label} />
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-400" />
          </button>
        </nav>

        {/* Right - Preview indicator */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="relative">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping" />
          </div>
          <span className="text-xs text-gray-400">Live Preview</span>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-gray-900/90 backdrop-blur-xl border-t border-gray-800/50"
          >
            <div className="p-4 grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                >
                  <item.icon className="w-5 h-5 text-indigo-400" />
                  <span className="text-sm font-medium text-gray-300">{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function AppContent() {
  const location = useLocation()

  return (
    <>
      <TopNav />
      <main className="min-h-screen relative">
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full mix-blend-screen filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full mix-blend-screen filter blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-900/5 to-purple-900/5 rounded-full" />
        </div>

        <div className="relative z-10 pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Routes location={location}>
                <Route path="/" element={<PersonalPage />} />
                <Route path="/personal" element={<PersonalPage />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/education" element={<EducationPage />} />
                <Route path="/theme" element={<ThemePage />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <PortfolioProvider>
        <AppContent />
      </PortfolioProvider>
    </BrowserRouter>
  )
}

export default App