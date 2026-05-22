import { motion } from 'framer-motion'
import {
  Globe, Smartphone, Palette, Database, Wrench, Code2,
} from 'lucide-react'
import { services } from '../../data/portfolioData'
import SectionTitle from '../ui/SectionTitle'

const iconMap: Record<string, React.ElementType> = {
  Globe, Smartphone, Palette, Database, Wrench, Code2,
}

const gradients = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-violet-500',
  'from-pink-500 to-rose-500',
  'from-orange-500 to-amber-500',
  'from-green-500 to-teal-500',
  'from-indigo-500 to-blue-500',
]

export default function Services() {
  return (
    <section id="services" className="bg-white dark:bg-dark-surface">
      <div className="section-container">
        <SectionTitle
          tag="Services"
          title="What I Offer"
          subtitle="Professional IT services tailored to bring your digital vision to life."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Code2
            const grad = gradients[i % gradients.length]

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="card p-6 md:p-7 group cursor-default"
              >
                {/* Icon */}
                <div className={`w-13 h-13 w-12 h-12 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center mb-5 shadow-md group-hover:shadow-glow transition-shadow duration-300`}>
                  <Icon size={22} className="text-white" />
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2 group-hover:text-primary-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-1.5">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-xs">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${grad} flex-shrink-0`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
