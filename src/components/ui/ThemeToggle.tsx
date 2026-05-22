import { useTheme } from '../../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const { toggleTheme, isDark } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
      className="relative w-14 h-7 rounded-full bg-slate-200 dark:bg-dark-border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className={`absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-colors duration-300 ${
          isDark
            ? 'left-7 bg-primary-500'
            : 'left-0.5 bg-white'
        }`}
      >
        {isDark ? (
          <Moon size={12} className="text-white" />
        ) : (
          <Sun size={12} className="text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  )
}
