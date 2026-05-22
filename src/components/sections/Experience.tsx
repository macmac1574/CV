import { motion } from 'framer-motion'
import { Briefcase, Code2, Users, BookOpen, CheckCircle2 } from 'lucide-react'
import { experiences } from '../../data/portfolioData'
import SectionTitle from '../ui/SectionTitle'
import type { Experience } from '../../types'

const typeConfig = {
  internship: { icon: Briefcase, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-500/10', text: 'text-blue-500', label: 'Internship' },
  freelance: { icon: Code2, color: 'from-purple-500 to-violet-500', bg: 'bg-purple-500/10', text: 'text-purple-500', label: 'Freelance' },
  organization: { icon: Users, color: 'from-orange-500 to-amber-500', bg: 'bg-orange-500/10', text: 'text-orange-500', label: 'Organization' },
  academic: { icon: BookOpen, color: 'from-green-500 to-teal-500', bg: 'bg-green-500/10', text: 'text-green-500', label: 'Academic' },
}

function TimelineItem({ exp, index }: { exp: Experience; index: number }) {
  const config = typeConfig[exp.type]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-14"
    >
      {/* Timeline dot */}
      <div className={`absolute left-0 top-1 w-10 h-10 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-md z-10`}>
        <Icon size={17} className="text-white" />
      </div>

      {/* Card */}
      <div className="card p-5 md:p-6 card-hover">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">{exp.role}</h3>
            <p className="text-primary-500 font-semibold text-sm mt-0.5">{exp.company}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs text-slate-400 bg-slate-100 dark:bg-dark-surface px-2.5 py-1 rounded-full whitespace-nowrap">
              {exp.period}
            </span>
            {exp.current && (
              <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Current
              </span>
            )}
          </div>
        </div>

        <ul className="space-y-2">
          {exp.description.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckCircle2 size={13} className="text-primary-500 flex-shrink-0 mt-0.5" />
              <span className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>

        <div className={`inline-flex items-center gap-1.5 mt-4 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
          <Icon size={11} />
          {config.label}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="bg-slate-50 dark:bg-dark-bg">
      <div className="section-container">
        <SectionTitle
          tag="Experience"
          title="My Journey"
          subtitle="Professional experience, freelance work, and academic achievements."
        />

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-purple-500 to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <TimelineItem key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
