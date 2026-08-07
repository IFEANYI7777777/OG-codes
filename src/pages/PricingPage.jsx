import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Crown, Zap, BarChart3, Globe, Sparkles, GripVertical, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

export function PricingPage() {
  const [annual, setAnnual] = useState(true)

  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Build your portfolio for free',
      features: ['Basic templates (Modern, Classic, Minimal)', 'Local export (HTML/JSON)', 'Standard support'],
      cta: 'Start Free',
      href: '/register',
      highlight: false,
    },
    {
      name: 'Pro',
      price: annual ? '$9/mo' : '$12/mo',
      description: 'Unlock premium features',
      features: ['All 6 premium templates', 'Public portfolio URL', 'Cloud storage & sync', 'PDF export', 'Analytics dashboard', 'AI descriptions', 'Priority support'],
      cta: 'Get Pro',
      href: '/register',
      highlight: true,
    },
    {
      name: 'Team',
      price: annual ? '$29/mo' : '$39/mo',
      description: 'For agencies and teams',
      features: ['Everything in Pro', '5 team members', 'Custom domain', 'White-label export', 'Dedicated onboarding'],
      cta: 'Contact Sales',
      href: 'mailto:sales@portfolio-builder.app',
      highlight: false,
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6"
          >
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-gray-300">Simple, transparent pricing</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-4"
          >
            Invest in Your Brand
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Create stunning portfolios that stand out. Upgrade to unlock cloud backup, public URLs, premium templates, and powerful analytics.
          </motion.p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium ${annual ? 'text-white' : 'text-gray-500'}`}>Annual</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-8 rounded-full transition-colors ${annual ? 'bg-indigo-500' : 'bg-gray-700'}`}
            >
              <span className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${annual ? 'translate-x-1' : 'translate-x-7'}`} />
            </button>
            <span className={`text-sm font-medium ${!annual ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
            {annual && (
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">Save 25%</span>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`relative rounded-3xl p-8 ${plan.highlight
                ? 'bg-gradient-to-b from-indigo-500/20 to-purple-500/10 border-2 border-indigo-500/50 shadow-2xl shadow-indigo-500/20'
                : 'bg-gray-900/60 backdrop-blur-xl border border-white/10'
                }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.price !== '$0' && <span className="text-gray-400 text-sm">/month</span>}
                </div>
                <p className="text-gray-400 text-sm mt-2">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className={`w-5 h-5 mt-0.5 ${plan.highlight ? 'text-indigo-400' : 'text-emerald-400'}`} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to={plan.href}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30'
                    : 'bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20'
                }`}
              >
                {plan.name === 'Team' ? 'Contact Sales' : plan.cta}
                {plan.highlight && <Zap className="w-4 h-4" />}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">All plans include</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Globe, label: 'Public URLs' },
              { icon: FileText, label: 'PDF Export' },
              { icon: BarChart3, label: 'Analytics' },
              { icon: Sparkles, label: 'AI Descriptions' },
              { icon: GripVertical, label: 'Drag & Drop' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 justify-center">
                <Icon className="w-5 h-5 text-indigo-400" />
                <span className="text-gray-300">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
