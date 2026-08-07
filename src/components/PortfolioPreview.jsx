import { usePortfolio } from '../context/PortfolioContext'
import { MapPin, Mail, Phone, Globe, ExternalLink } from 'lucide-react'

export function PortfolioPreview({ data: propData }) {
  const { data: ctxData } = usePortfolio()
  const data = propData || ctxData
  const p = data.personal
  const theme = data.theme

  const fontMap = {
    inter: "'Inter', ui-sans-serif, system-ui, sans-serif",
    poppins: "'Poppins', ui-sans-serif, system-ui, sans-serif",
    roboto: "'Roboto', ui-sans-serif, system-ui, sans-serif",
    opensans: "'Open Sans', ui-sans-serif, system-ui, sans-serif",
  }

  const spacingMap = {
    compact: 'space-y-4',
    normal: 'space-y-6',
    relaxed: 'space-y-8',
  }

  return (
    <div className="sticky top-8">
      <div
        className="rounded-2xl shadow-2xl overflow-hidden bg-white"
        style={{
          fontFamily: fontMap[theme.font],
          backgroundColor: theme.background,
          color: theme.text,
        }}
      >
        <div className="p-8 md:p-12 space-y-8">
          <header className={`border-b pb-8 ${spacingMap[theme.spacing]}`}>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {p.avatar && (
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover ring-4 ring-offset-4"
                  style={{ ringColor: theme.primary }}
                />
              )}
              <div className="flex-1">
                <h1
                  className="text-4xl md:text-5xl font-bold mb-2"
                  style={{ color: theme.secondary }}
                >
                  {p.name}
                </h1>
                <h2
                  className="text-2xl mb-4"
                  style={{ color: theme.primary }}
                >
                  {p.title}
                </h2>
                {p.bio && (
                  <p className="text-gray-600 max-w-2xl leading-relaxed">
                    {p.bio}
                  </p>
                )}
                <div className="flex flex-wrap gap-4 mt-6 text-sm">
                  {p.email && (
                    <a href={`mailto:${p.email}`} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                      <Mail className="w-4 h-4" style={{ color: theme.primary }} />
                      <span>{p.email}</span>
                    </a>
                  )}
                  {p.phone && (
                    <span className="flex items-center gap-2">
                      <Phone className="w-4 h-4" style={{ color: theme.primary }} />
                      <span>{p.phone}</span>
                    </span>
                  )}
                  {p.location && (
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" style={{ color: theme.primary }} />
                      <span>{p.location}</span>
                    </span>
                  )}
                  {p.website && (
                    <a href={p.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                      <Globe className="w-4 h-4" style={{ color: theme.primary }} />
                      <span>Website</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </header>

          {data.experience.length > 0 && (
            <section className={spacingMap[theme.spacing]}>
              <h3
                className="text-2xl font-bold pb-2 border-b-2"
                style={{ color: theme.secondary, borderColor: theme.primary }}
              >
                Work Experience
              </h3>
              <div className={`grid gap-6 ${spacingMap[theme.spacing]}`}>
                {data.experience.map(exp => (
                  <div key={exp.id} className="relative">
                    <h4 className="text-xl font-semibold" style={{ color: theme.secondary }}>
                      {exp.role}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium" style={{ color: theme.primary }}>{exp.company}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-500">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-gray-600 mb-3 leading-relaxed">{exp.description}</p>
                    )}
                    {exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map(tech => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{ backgroundColor: theme.primary + '20', color: theme.primary }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.projects.length > 0 && (
            <section className={spacingMap[theme.spacing]}>
              <h3
                className="text-2xl font-bold pb-2 border-b-2"
                style={{ color: theme.secondary, borderColor: theme.primary }}
              >
                Projects
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {data.projects.filter(p => p.featured).map(project => (
                  <div
                    key={project.id}
                    className="p-6 rounded-xl border hover:shadow-lg transition-shadow"
                    style={{ borderColor: theme.primary + '40' }}
                  >
                    <h4 className="text-xl font-semibold mb-2" style={{ color: theme.secondary }}>
                      {project.title}
                    </h4>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm mb-3 hover:opacity-70 transition-opacity"
                        style={{ color: theme.primary }}
                      >
                        View Project <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map(tech => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section className={spacingMap[theme.spacing]}>
              <h3
                className="text-2xl font-bold pb-2 border-b-2"
                style={{ color: theme.secondary, borderColor: theme.primary }}
              >
                Skills
              </h3>
              <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${spacingMap[theme.spacing]}`}>
                {data.skills.map((skill, index) => (
                  <div key={index} className="p-5 rounded-xl bg-gray-50">
                    <h4 className="font-semibold text-lg mb-3" style={{ color: theme.secondary }}>
                      {skill.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map(item => (
                        <span
                          key={item}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-white border"
                          style={{ borderColor: theme.primary + '40', color: theme.text }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section className={spacingMap[theme.spacing]}>
              <h3
                className="text-2xl font-bold pb-2 border-b-2"
                style={{ color: theme.secondary, borderColor: theme.primary }}
              >
                Education
              </h3>
              <div className={`grid gap-4 ${spacingMap[theme.spacing]}`}>
                {data.education.map(edu => (
                  <div key={edu.id} className="p-5 rounded-xl border border-gray-100">
                    <h4 className="text-lg font-semibold" style={{ color: theme.secondary }}>
                      {edu.degree}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium" style={{ color: theme.primary }}>{edu.school}</span>
                      {edu.field && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-600">{edu.field}</span>
                        </>
                      )}
                    </div>
                    {edu.year && <p className="text-sm text-gray-500">{edu.year}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

