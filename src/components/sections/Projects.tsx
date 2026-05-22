import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Star } from 'lucide-react'
import { projects } from '../../data/portfolioData'
import SectionTitle from '../ui/SectionTitle'
import type { ProjectCategory } from '../../types'

const categories: ProjectCategory[] = ['All', 'Web', 'Mobile', 'UI/UX', 'Systems', 'Research']

const projectColors: Record<string, string> = {
  Web: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  Mobile: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  'UI/UX': 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  Systems: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  Research: 'bg-green-500/10 text-green-600 dark:text-green-400',
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const initials = project.title.split(' ').slice(0, 2).map(w => w[0]).join('')
  const gradients = [
    'from-primary-500 to-purple-600',
    'from-purple-500 to-pink-600',
    'from-blue-500 to-cyan-600',
    'from-orange-500 to-red-500',
    'from-green-500 to-teal-600',
    'from-rose-500 to-pink-600',
    'from-indigo-500 to-blue-600',
    'from-violet-500 to-purple-600',
  ]
  const grad = gradients[index % gradients.length]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35 }}
      className="card card-hover group overflow-hidden flex flex-col"
    >
      {/* Image / placeholder */}
      <div className={`relative h-44 bg-gradient-to-br ${grad} flex items-center justify-center overflow-hidden`}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/90 text-4xl font-black">{initials}</span>
            <span className="text-white/60 text-xs px-3 py-1 rounded-full bg-white/10">
              {project.category}
            </span>
          </div>
        )}
        {project.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-yellow-400/90 text-yellow-900 rounded-full px-2 py-0.5 text-xs font-bold">
            <Star size={10} fill="currentColor" />
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${projectColors[project.category] || ''} backdrop-blur-sm bg-white/10 text-white`}>
            {project.category}
          </span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
            aria-label="Live Demo"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 group-hover:text-primary-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>
        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map(tech => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>('All')

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="bg-white dark:bg-dark-surface">
      <div className="section-container">
        <SectionTitle
          tag="Portfolio"
          title="My Projects"
          subtitle="A showcase of apps, websites, and systems I've built."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                filter === cat
                  ? 'bg-primary-500 text-white shadow-glow'
                  : 'bg-slate-100 dark:bg-dark-card text-slate-500 dark:text-slate-400 hover:bg-primary-500/10 hover:text-primary-500'
              }`}
            >
              {cat}
              {cat !== 'All' && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({projects.filter(p => p.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  )
}
