import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Mail, Calendar, Sparkles } from 'lucide-react'
import { personalInfo } from '../../data/portfolioData'
import SectionTitle from '../ui/SectionTitle'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

function StatCard({ value, label, suffix }: { value: number; label: string; suffix: string }) {
  const { ref, inView } = useScrollAnimation()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4 }}
      className="text-center p-4"
    >
      <div className="text-3xl md:text-4xl font-black gradient-text mb-1">
        {inView ? value : 0}{suffix}
      </div>
      <div className="text-slate-500 dark:text-slate-400 text-sm">{label}</div>
    </motion.div>
  )
}

export default function About() {
  const { ref: leftRef, inView: leftIn } = useScrollAnimation()
  const { ref: rightRef, inView: rightIn } = useScrollAnimation()

  const info = [
    { icon: Mail, label: 'Email', value: personalInfo.email },
    { icon: MapPin, label: 'Location', value: personalInfo.location },
    { icon: GraduationCap, label: 'Degree', value: personalInfo.education.degree },
    { icon: Calendar, label: 'Period', value: personalInfo.education.period },
  ]

  return (
    <section id="about" className="bg-white dark:bg-dark-surface">
      <div className="section-container">
        <SectionTitle
          tag="About Me"
          title="Who I Am"
          subtitle="A passionate developer turning ideas into elegant digital solutions."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Visual */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -40 }}
            animate={leftIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Main card */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-500/10 to-purple-500/10 dark:from-primary-500/20 dark:to-purple-500/20 border border-primary-500/20 p-8">
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-glow text-white text-3xl font-black flex-shrink-0">
                  {personalInfo.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">{personalInfo.name}</h3>
                  <p className="text-primary-500 text-sm font-medium">{personalInfo.title}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-500 text-xs">Available for work</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                {personalInfo.bioExtended}
              </p>

              {/* Education card */}
              <div className="bg-white/60 dark:bg-dark-card/60 rounded-2xl p-4 border border-slate-200/50 dark:border-dark-border">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <GraduationCap size={18} className="text-primary-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">
                      {personalInfo.education.degree}
                    </p>
                    <p className="text-primary-500 text-xs font-medium mt-0.5">
                      {personalInfo.education.school}
                    </p>
                    <p className="text-slate-400 text-xs mt-0.5">{personalInfo.education.period}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-500/10 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-purple-500/10 rounded-2xl -z-10" />
          </motion.div>

          {/* Right — Content */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 40 }}
            animate={rightIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">
              <Sparkles size={14} />
              My Story
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Passionate about building{' '}
              <span className="gradient-text">impactful technology</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              {personalInfo.bio}
            </p>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
              My journey in IT has taken me through web development, mobile apps, UI/UX design, and systems development. I thrive in fast-paced environments, love solving complex problems, and am always eager to learn new technologies.
            </p>

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {info.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-primary-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href={personalInfo.resume} download className="btn-primary">
              <GraduationCap size={16} />
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {personalInfo.stats.map(stat => (
            <div
              key={stat.label}
              className="card p-2 card-hover"
            >
              <StatCard value={stat.value} label={stat.label} suffix={stat.suffix} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
