import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Download, Mail, Eye, Github, Linkedin, MapPin, ArrowDown } from 'lucide-react'
import { personalInfo } from '../../data/portfolioData'
import ParticleBackground from '../ui/ParticleBackground'
import { useTheme } from '../../context/ThemeContext'

const socials = [
  { icon: Github, href: personalInfo.github, label: 'GitHub' },
  { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
]

const roleSequence = personalInfo.roles.flatMap(r => [r, 2000])

export default function Hero() {
  const { isDark } = useTheme()
  const bgColor = isDark ? '#080810' : '#f8fafc'

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-50 dark:bg-dark-bg"
    >
      {/* Particles */}
      <ParticleBackground />

      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/20 dark:bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 section-container w-full pt-24 pb-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[600px] lg:min-h-auto">
          {/* Left — Text */}
          <div className="pb-16 lg:pb-0">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 rounded-full px-4 py-1.5 text-xs font-semibold mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Open to Work · Available for Projects
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl xl:text-7xl font-black text-slate-900 dark:text-white mb-3 leading-tight"
            >
              Hi, I'm{' '}
              <span className="gradient-text block">{personalInfo.name}</span>
            </motion.h1>

            {/* Typing animation */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium mb-6 h-8"
            >
              <TypeAnimation
                sequence={roleSequence as (string | number)[]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-primary-500 dark:text-primary-400 font-semibold"
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-slate-500 dark:text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-lg"
            >
              {personalInfo.bio}
            </motion.p>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-8"
            >
              <MapPin size={14} className="text-primary-500" />
              {personalInfo.location}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <a href={personalInfo.resume} download className="btn-primary">
                <Download size={16} />
                Download CV
              </a>
              <button onClick={() => scrollTo('projects')} className="btn-outline">
                <Eye size={16} />
                View Projects
              </button>
              <button onClick={() => scrollTo('contact')} className="btn-ghost">
                <Mail size={16} />
                Contact Me
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4"
            >
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg border border-slate-200 dark:border-dark-border text-slate-500 dark:text-slate-400 hover:text-primary-500 hover:border-primary-500 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Icon size={17} />
                </a>
              ))}
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="text-slate-500 dark:text-slate-400 text-sm">
                {personalInfo.stats[0].value}+ Projects
              </span>
            </motion.div>
          </div>

          {/* Right — Avatar Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
            className="hidden lg:flex items-center justify-center relative"
          >
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
              
              {/* Avatar container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-center"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, transparent 0%, ${bgColor}30 100%)` }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => scrollTo('about')}
        >
          <span className="text-slate-400 text-xs tracking-widest uppercase">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={16} className="text-primary-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
