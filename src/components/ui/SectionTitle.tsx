import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

interface SectionTitleProps {
  tag: string
  title: string
  subtitle?: string
  center?: boolean
}

export default function SectionTitle({ tag, title, subtitle, center = true }: SectionTitleProps) {
  const { ref, inView } = useScrollAnimation()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`mb-14 ${center ? 'text-center' : ''}`}
    >
      <span className="section-tag">
        <span className="w-8 h-px bg-primary-500" />
        {tag}
        <span className="w-8 h-px bg-primary-500" />
      </span>
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p className={`section-subtitle ${center ? 'mx-auto' : ''}`}>{subtitle}</p>
      )}
    </motion.div>
  )
}
