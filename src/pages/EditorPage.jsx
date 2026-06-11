import { PersonalInfoForm } from '../components/PersonalInfoForm'
import { ExperienceForm } from '../components/ExperienceForm'
import { ProjectsForm } from '../components/ProjectsForm'
import { SkillsForm } from '../components/SkillsForm'
import { EducationForm } from '../components/EducationForm'

export { PersonalInfoForm, ExperienceForm, ProjectsForm, SkillsForm, EducationForm }

export function EditorPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="space-y-12">
        <PersonalInfoForm />
        <ExperienceForm />
        <ProjectsForm />
        <SkillsForm />
        <EducationForm />
      </div>
    </div>
  )
}
