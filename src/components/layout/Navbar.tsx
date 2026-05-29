import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2 } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle'
import { navLinks, personalInfo } from '../../data/portfolioData'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = navLinks.map(l => l.href.slice(1))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl shadow-sm border-b border-slate-200/50 dark:border-dark-border/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => scrollTo('#home')} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300">
              <Code2 size={18} className="text-white" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              {personalInfo.name.split(' ')[0]}
              <span className="text-primary-500">.</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active === link.href.slice(1)
                    ? 'text-primary-500 bg-primary-500/10'
                    : 'text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-dark-surface'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => scrollTo('#contact')}
              className="hidden md:flex btn-primary text-sm py-2"
            >
              Hire Me
            </button>
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-surface transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-xl border-b border-slate-200 dark:border-dark-border lg:hidden overflow-hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    active === link.href.slice(1)
                      ? 'text-primary-500 bg-primary-500/10'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-card'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                onClick={() => scrollTo('#contact')}
                className="btn-primary mt-2 justify-center"
              >
                Hire Me
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
