import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { skillCategories } from '../../data/portfolioData'
import SectionTitle from '../ui/SectionTitle'

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const { ref, inView } = useScrollAnimation()
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{name}</span>
        <span className="text-xs font-semibold text-primary-500">{level}%</span>
      </div>
      <div className="h-1.5 bg-slate-200 dark:bg-dark-border rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-purple-500"
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const [active, setActive] = useState(skillCategories[0].category)
  const current = skillCategories.find(c => c.category === active)!

  return (
    <section id="skills" className="bg-slate-50 dark:bg-dark-bg">
      <div className="section-container">
        <SectionTitle
          tag="Skills"
          title="My Tech Stack"
          subtitle="Technologies and tools I work with to build modern digital products."
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Category list */}
          <div className="space-y-2">
            {skillCategories.map(({ category, color }, i) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setActive(category)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-300 ${
                  active === category
                    ? 'bg-white dark:bg-dark-card shadow-card dark:shadow-card-dark border border-primary-500/30'
                    : 'hover:bg-white/60 dark:hover:bg-dark-card/60'
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${color}`} />
                <span
                  className={`font-medium text-sm ${
                    active === category
                      ? 'text-primary-500'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {category}
                </span>
                <span className="ml-auto text-xs text-slate-400">
                  {skillCategories.find(c => c.category === category)!.skills.length}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Skill bars */}
          <div className="lg:col-span-2">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="card p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${current.color}`} />
                <h3 className="font-bold text-slate-900 dark:text-white">{active} Skills</h3>
                <span className="ml-auto text-xs text-slate-400 bg-slate-100 dark:bg-dark-surface px-2 py-0.5 rounded-full">
                  {current.skills.length} skills
                </span>
              </div>

              {current.skills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.1} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <p className="text-center text-slate-400 text-sm mb-6 uppercase tracking-widest">All Technologies</p>
          <div className="flex flex-wrap justify-center gap-2">
            {skillCategories.flatMap(c => c.skills).map(skill => (
              <motion.span
                key={skill.name}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-300 text-xs font-medium shadow-sm hover:border-primary-400 hover:text-primary-500 transition-all duration-200 cursor-default"
              >
                {skill.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
