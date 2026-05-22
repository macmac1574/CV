import { motion } from 'framer-motion'
import { Download, Eye, FileText, CheckCircle2 } from 'lucide-react'
import { personalInfo } from '../../data/portfolioData'
import SectionTitle from '../ui/SectionTitle'

const highlights = [
  'BSIT Student with 3.8 GPA',
  'Full Stack Development expertise',
  '24+ completed projects',
  'Internship experience in web development',
  '12+ professional certificates',
  'Team leadership experience',
]

export default function Resume() {
  return (
    <section id="resume" className="bg-slate-50 dark:bg-dark-bg">
      <div className="section-container">
        <SectionTitle
          tag="Resume"
          title="My Resume / CV"
          subtitle="A snapshot of my education, skills, and professional experience."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Visual preview */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="card p-8 shadow-card-dark">
              {/* Resume preview mockup */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-dark-border">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-2xl font-black">
                  {personalInfo.name.charAt(0)}
                </div>
                <div>
                  <div className="h-4 bg-slate-200 dark:bg-dark-border rounded w-36 mb-2" />
                  <div className="h-3 bg-primary-500/30 rounded w-24 mb-1.5" />
                  <div className="h-2.5 bg-slate-100 dark:bg-dark-surface rounded w-32" />
                </div>
              </div>

              {['Experience', 'Education', 'Skills', 'Projects'].map(section => (
                <div key={section} className="mb-5">
                  <div className="h-3 bg-primary-500 rounded w-20 mb-2" />
                  <div className="space-y-1.5">
                    <div className="h-2.5 bg-slate-200 dark:bg-dark-border rounded w-full" />
                    <div className="h-2.5 bg-slate-200 dark:bg-dark-border rounded w-5/6" />
                    <div className="h-2.5 bg-slate-100 dark:bg-dark-surface rounded w-4/6" />
                  </div>
                </div>
              ))}

              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center">
                  <FileText size={15} className="text-primary-500" />
                </div>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary-500/10 rounded-2xl -z-10" />
          </motion.div>

          {/* Info + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to hire a{' '}
              <span className="gradient-text">passionate developer?</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              My resume details my technical skills, project experience, academic background, and professional achievements — all in one clean document.
            </p>

            {/* Highlights */}
            <ul className="space-y-3 mb-8">
              {highlights.map(item => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-primary-500 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <a href={personalInfo.resume} download className="btn-primary">
                <Download size={16} />
                Download PDF
              </a>
              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Eye size={16} />
                View Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
