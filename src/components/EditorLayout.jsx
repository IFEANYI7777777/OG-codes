import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Briefcase, FolderOpen, Sparkles, GraduationCap, Palette, Menu, X } from 'lucide-react'
import { PersonalInfoForm, ExperienceForm, ProjectsForm, SkillsForm, EducationForm } from '../pages/EditorPage'
import { ThemeControls } from '../components/ThemeControls'
import { PortfolioPreview } from '../components/PortfolioPreview'

function Sidebar({ activeSection, onSectionChange, collapsed, setCollapsed }) {
  const sections = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'skills', label: 'Skills', icon: Sparkles },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'theme', label: 'Theme', icon: Palette },
  ]

  return (
    <aside
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 flex flex-col`}
    >
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && (
          <div>
            <h1 className="text-xl font-bold font-heading">Portfolio Builder</h1>
            <p className="text-xs text-gray-500 mt-1">Professional Edition</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
      </div>
      {!collapsed && (
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {sections.map(section => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{section.label}</span>
              </button>
            )
          })}
        </nav>
      )}
      {collapsed && (
        <nav className="p-2 space-y-1 flex-1 overflow-y-auto">
          {sections.map(section => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full flex items-center justify-center px-3 py-3 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                title={section.label}
              >
                <Icon className="w-5 h-5" />
              </button>
            )
          })}
        </nav>
      )}
    </aside>
  )
}

export function EditorLayout() {
  const [activeSection, setActiveSection] = useState('personal')

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(`section-${sectionId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={scrollToSection}
      />
      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-4xl mx-auto px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Portfolio Builder</h1>
              <p className="text-gray-600">Create your professional portfolio in minutes</p>
            </motion.div>

            <div className="space-y-16">
              <section id="section-personal" className="scroll-mt-8">
                <PersonalInfoForm />
              </section>

              <section id="section-experience" className="scroll-mt-8">
                <ExperienceForm />
              </section>

              <section id="section-projects" className="scroll-mt-8">
                <ProjectsForm />
              </section>

              <section id="section-skills" className="scroll-mt-8">
                <SkillsForm />
              </section>

              <section id="section-education" className="scroll-mt-8">
                <EducationForm />
              </section>

              <section id="section-theme" className="scroll-mt-8">
                <ThemeControls />
              </section>
            </div>
          </div>
        </div>
        <div className="w-1/2 bg-gray-50 p-8 overflow-y-auto border-l">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
            Live Preview
          </h3>
          <PortfolioPreview />
        </div>
      </main>
    </div>
  )
}

