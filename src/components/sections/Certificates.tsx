import { motion } from 'framer-motion'
import { Award, ExternalLink, Calendar } from 'lucide-react'
import { certificates } from '../../data/portfolioData'
import SectionTitle from '../ui/SectionTitle'

const gradients = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-orange-500 to-red-500',
  'from-green-500 to-teal-500',
  'from-indigo-500 to-blue-600',
  'from-rose-500 to-orange-500',
  'from-violet-500 to-purple-600',
  'from-teal-500 to-green-600',
]

const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-slate-200 dark:bg-dark-secondary rounded w-3/4 mb-2" />
    <div className="h-3 bg-slate-200 dark:bg-dark-secondary rounded w-1/2 mb-2" />
    <div className="h-3 bg-slate-200 dark:bg-dark-secondary rounded w-2/3" />
  </div>
)

export default function Certificates() {
  return (
    <section id="certificates" className="bg-white dark:bg-dark-surface">
      <div className="section-container">
        <SectionTitle
          tag="Certificates"
          title="Achievements & Credentials"
          subtitle="Certifications, courses, and training that have shaped my expertise."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="relative"
            >
              {/* Coming Soon Badge */}
              {cert.skeleton && (
                <div className="absolute -top-3 -right-3 z-10">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Coming Soon
                  </div>
                </div>
              )}

              <div className={`card ${cert.skeleton ? 'opacity-75 hover:opacity-100' : 'card-hover'} group overflow-hidden transition-opacity`}>
                {/* Header */}
                <div className={`h-28 bg-gradient-to-br ${gradients[i % gradients.length]} relative flex items-center justify-center`}>
                  {cert.skeleton ? (
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border-2 border-white/20">
                      <Award size={28} className="text-white/40" />
                    </div>
                  ) : cert.image ? (
                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                      <Award size={28} className="text-white" />
                    </div>
                  )}
                  <div className={`absolute inset-0 ${cert.skeleton ? 'bg-black/20' : 'bg-black/10 opacity-0 group-hover:opacity-100'} transition-opacity`} />
                </div>

                {/* Content */}
                <div className="p-4">
                  {cert.skeleton ? (
                    <SkeletonLoader />
                  ) : (
                    <>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug mb-1 group-hover:text-primary-500 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-primary-500 text-xs font-semibold mb-2">{cert.issuer}</p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-slate-400 text-xs">
                          <Calendar size={10} />
                          {cert.date}
                        </span>
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-500 hover:text-primary-600 transition-colors"
                            aria-label="View credential"
                          >
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
