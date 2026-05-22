import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { testimonials } from '../../data/portfolioData'
import SectionTitle from '../ui/SectionTitle'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (d: 1 | -1) => {
    setDir(d)
    setIndex(i => (i + d + testimonials.length) % testimonials.length)
  }

  const t = testimonials[index]

  return (
    <section id="testimonials" className="bg-slate-50 dark:bg-dark-bg">
      <div className="section-container">
        <SectionTitle
          tag="Testimonials"
          title="What People Say"
          subtitle="Feedback from professors, colleagues, and clients I've worked with."
        />

        <div className="max-w-3xl mx-auto relative">
          {/* Main card */}
          <div className="relative overflow-hidden min-h-[280px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="card p-8 md:p-10"
              >
                {/* Quote icon */}
                <Quote size={36} className="text-primary-500/20 mb-4" />

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed italic mb-8">
                  "{t.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{t.name}</p>
                    <p className="text-primary-500 text-sm">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > index ? 1 : -1); setIndex(i) }}
                  className={`rounded-full transition-all duration-300 ${
                    i === index
                      ? 'w-6 h-2.5 bg-primary-500'
                      : 'w-2.5 h-2.5 bg-slate-300 dark:bg-dark-border hover:bg-primary-300'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                className="w-10 h-10 rounded-xl border border-slate-200 dark:border-dark-border text-slate-500 dark:text-slate-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 flex items-center justify-center transition-all duration-300"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => go(1)}
                className="w-10 h-10 rounded-xl border border-slate-200 dark:border-dark-border text-slate-500 dark:text-slate-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 flex items-center justify-center transition-all duration-300"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* All testimonials mini grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => { setDir(i > index ? 1 : -1); setIndex(i) }}
              className={`card p-4 text-left transition-all duration-300 ${
                i === index ? 'border-primary-500/50 bg-primary-500/5' : 'hover:border-primary-300 dark:hover:border-primary-700'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{t.name}</p>
                  <p className="text-xs text-primary-500 truncate">{t.role.split('–')[0].trim()}</p>
                </div>
              </div>
              <p className="text-slate-400 text-xs line-clamp-2">"{t.content}"</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
