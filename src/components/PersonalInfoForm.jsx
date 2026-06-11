import { usePortfolio } from '../context/PortfolioContext'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Globe, Link2, FileText, Camera } from 'lucide-react'

export function PersonalInfoForm() {
  const { data, updatePersonal } = usePortfolio()
  const p = data.personal

  const fields = [
    { icon: User, label: 'Full Name', field: 'name', type: 'text', placeholder: 'Enter your name' },
    { icon: Globe, label: 'Title', field: 'title', type: 'text', placeholder: 'Senior Developer' },
    { icon: Mail, label: 'Email', field: 'email', type: 'email', placeholder: 'you@example.com' },
    { icon: Phone, label: 'Phone', field: 'phone', type: 'tel', placeholder: '+1 234 567 8900' },
    { icon: MapPin, label: 'Location', field: 'location', type: 'text', placeholder: 'City, Country' },
    { icon: Link2, label: 'Website', field: 'website', type: 'url', placeholder: 'https://yoursite.com' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-heading font-semibold text-white mb-6">Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((f, i) => (
          <div key={i}>
            <label className="flex items-center text-sm font-medium text-gray-200 mb-2">
              <f.icon className="w-4 h-4 mr-2 text-indigo-400" />
              {f.label}
            </label>
            <input
              type={f.type}
              value={p[f.field]}
              onChange={(e) => updatePersonal({ ...p, [f.field]: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              placeholder={f.placeholder}
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="flex items-center text-sm font-medium text-gray-200 mb-2">
            <Camera className="w-4 h-4 mr-2 text-indigo-400" />
            Avatar URL
          </label>
          <input
            type="url"
            value={p.avatar}
            onChange={(e) => updatePersonal({ ...p, avatar: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center text-sm font-medium text-gray-200 mb-2">
            <FileText className="w-4 h-4 mr-2 text-indigo-400" />
            Resume URL
          </label>
          <input
            type="url"
            value={p.resume}
            onChange={(e) => updatePersonal({ ...p, resume: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
            placeholder="https://example.com/resume.pdf"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-200 mb-2">Bio</label>
          <textarea
            value={p.bio}
            onChange={(e) => updatePersonal({ ...p, bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all resize-none"
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>
    </motion.div>
  )
}