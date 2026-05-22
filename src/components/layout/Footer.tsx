import { Github, Linkedin, Instagram, Facebook, Mail, Heart, Code2, ArrowRight } from 'lucide-react'
import { personalInfo, navLinks } from '../../data/portfolioData'

const socials = [
  { icon: Github, href: personalInfo.github, label: 'GitHub' },
  { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: Instagram, href: personalInfo.instagram, label: 'Instagram' },
  { icon: Facebook, href: personalInfo.facebook, label: 'Facebook' },
]

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.getElementById(href.slice(1))
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-slate-900 dark:bg-dark-surface border-t border-slate-800 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                <Code2 size={18} className="text-white" />
              </div>
              <span className="text-white font-bold">{personalInfo.name}</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-xs">
              Passionate IT student & developer crafting elegant digital experiences.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 dark:bg-dark-card text-slate-400 hover:text-white hover:bg-primary-500 flex items-center justify-center transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.slice(0, 6).map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="flex items-center gap-2 text-slate-400 hover:text-primary-400 text-sm transition-colors duration-200 group"
                  >
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 text-slate-400 hover:text-primary-400 text-sm transition-colors duration-200"
              >
                <Mail size={15} />
                {personalInfo.email}
              </a>
              <p className="text-slate-400 text-sm">{personalInfo.location}</p>
              {personalInfo.available && (
                <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg px-3 py-1.5 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Available for opportunities
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-1.5">
            Crafted with <Heart size={13} className="text-red-400 fill-red-400" /> using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}
