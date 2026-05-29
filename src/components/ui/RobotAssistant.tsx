import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { useRobotBehavior } from '../../hooks/useRobotBehavior'

const SECTION_MESSAGES: Record<string, string> = {
  home: "Hi! I'm Byte, Mark's AI companion 👋",
  about: 'Want to know more about Mark? 🤔',
  skills: 'Check out these impressive skills! 💡',
  projects: 'Some amazing projects here! 🚀',
  experience: 'Real-world experience matters! 💼',
  certificates: 'Certified and growing! 🏆',
  services: 'Need help? Mark can do that! ✨',
  contact: "Let's connect! Mark is open to work 📬",
}

function RobotSVG({
  eyeOffsetX,
  eyeOffsetY,
  isSleeping,
  isDark,
  isHovered,
}: {
  eyeOffsetX: number
  eyeOffsetY: number
  isSleeping: boolean
  isDark: boolean
  isHovered: boolean
}) {
  const accent = isDark ? '#818cf8' : '#6366f1'
  const glow = isDark ? '#a78bfa' : '#6366f1'
  const body = isDark ? '#1e1b4b' : '#eef2ff'
  const bodyStroke = isDark ? '#4338ca' : '#6366f1'
  const glass = isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.10)'
  const thrusterColor = isDark ? '#7c3aed' : '#818cf8'

  return (
    <svg
      width="72"
      height="96"
      viewBox="0 0 72 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 0 ${isHovered ? 14 : 6}px ${glow}88)` }}
    >
      <defs>
        <radialGradient id="bodyGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor={isDark ? '#312e81' : '#e0e7ff'} />
          <stop offset="100%" stopColor={isDark ? '#1e1b4b' : '#c7d2fe'} />
        </radialGradient>
        <radialGradient id="headGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={isDark ? '#3730a3' : '#e0e7ff'} />
          <stop offset="100%" stopColor={isDark ? '#312e81' : '#c7d2fe'} />
        </radialGradient>
        <filter id="glassSheen">
          <feGaussianBlur stdDeviation="1" />
        </filter>
      </defs>

      {/* Antenna */}
      <line x1="28" y1="10" x2="24" y2="2" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="24" cy="2" r="2" fill={accent} style={{ animation: 'robotGlow 2s ease-in-out infinite' }} />
      <line x1="44" y1="10" x2="48" y2="2" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="48" cy="2" r="2" fill={accent} style={{ animation: 'robotGlow 2s ease-in-out infinite 0.5s' }} />

      {/* Head */}
      <rect x="16" y="10" width="40" height="30" rx="10" fill="url(#headGrad)" stroke={bodyStroke} strokeWidth="1" />
      {/* Glass sheen on head */}
      <rect x="18" y="12" width="36" height="8" rx="5" fill={glass} />

      {/* Eyes */}
      {isSleeping ? (
        <>
          <line x1="23" y1="26" x2="31" y2="26" stroke={accent} strokeWidth="2" strokeLinecap="round" />
          <line x1="41" y1="26" x2="49" y2="26" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* Left eye */}
          <circle cx="27" cy="26" r="5" fill={isDark ? '#1e1b4b' : '#c7d2fe'} stroke={accent} strokeWidth="1" />
          <circle
            cx={27 + eyeOffsetX}
            cy={26 + eyeOffsetY}
            r="2.5"
            fill={accent}
            style={{ animation: 'robotBlink 4s ease-in-out infinite' }}
          />
          <circle cx={27 + eyeOffsetX - 0.8} cy={26 + eyeOffsetY - 0.8} r="0.8" fill="white" opacity={0.7} />
          {/* Right eye */}
          <circle cx="45" cy="26" r="5" fill={isDark ? '#1e1b4b' : '#c7d2fe'} stroke={accent} strokeWidth="1" />
          <circle
            cx={45 + eyeOffsetX}
            cy={26 + eyeOffsetY}
            r="2.5"
            fill={accent}
            style={{ animation: 'robotBlink 4s ease-in-out infinite 0.3s' }}
          />
          <circle cx={45 + eyeOffsetX - 0.8} cy={26 + eyeOffsetY - 0.8} r="0.8" fill="white" opacity={0.7} />
        </>
      )}

      {/* Mouth */}
      <rect x="28" y="34" width="16" height="3" rx="1.5" fill={isDark ? '#312e81' : '#a5b4fc'} />
      {isHovered && (
        <rect x="30" y="35" width="4" height="1.5" rx="0.75" fill={accent} opacity={0.8} />
      )}

      {/* Neck */}
      <rect x="30" y="40" width="12" height="5" rx="3" fill={body} stroke={bodyStroke} strokeWidth="0.5" />

      {/* Body */}
      <rect x="12" y="45" width="48" height="36" rx="12" fill="url(#bodyGrad)" stroke={bodyStroke} strokeWidth="1" />
      {/* Glass sheen on body */}
      <rect x="14" y="47" width="44" height="10" rx="7" fill={glass} />

      {/* Chest light */}
      <circle
        cx="36"
        cy="63"
        r="5"
        fill={accent}
        opacity={isSleeping ? 0.3 : 0.9}
        style={{ animation: isSleeping ? 'none' : 'robotGlow 1.8s ease-in-out infinite' }}
      />
      <circle cx="36" cy="63" r="2.5" fill="white" opacity={0.6} />

      {/* Side details */}
      <rect x="14" y="55" width="6" height="3" rx="1.5" fill={accent} opacity={0.5} />
      <rect x="52" y="55" width="6" height="3" rx="1.5" fill={accent} opacity={0.5} />
      <rect x="14" y="61" width="6" height="3" rx="1.5" fill={accent} opacity={0.3} />
      <rect x="52" y="61" width="6" height="3" rx="1.5" fill={accent} opacity={0.3} />

      {/* Arms */}
      <rect x="2" y="48" width="10" height="22" rx="5" fill={body} stroke={bodyStroke} strokeWidth="0.8" />
      <circle cx="7" cy="71" r="4" fill={body} stroke={bodyStroke} strokeWidth="0.8" />
      <rect x="60" y="48" width="10" height="22" rx="5" fill={body} stroke={bodyStroke} strokeWidth="0.8" />
      <circle cx="65" cy="71" r="4" fill={body} stroke={bodyStroke} strokeWidth="0.8" />

      {/* Thrusters */}
      <ellipse
        cx="22"
        cy="83"
        rx="8"
        ry="4"
        fill={thrusterColor}
        opacity={isSleeping ? 0.2 : 0.8}
        style={{ animation: isSleeping ? 'none' : 'robotThruster 1.2s ease-in-out infinite' }}
      />
      <ellipse
        cx="22"
        cy="83"
        rx="4"
        ry="2"
        fill="white"
        opacity={isSleeping ? 0.05 : 0.4}
      />
      <ellipse
        cx="50"
        cy="83"
        rx="8"
        ry="4"
        fill={thrusterColor}
        opacity={isSleeping ? 0.2 : 0.8}
        style={{ animation: isSleeping ? 'none' : 'robotThruster 1.2s ease-in-out infinite 0.4s' }}
      />
      <ellipse
        cx="50"
        cy="83"
        rx="4"
        ry="2"
        fill="white"
        opacity={isSleeping ? 0.05 : 0.4}
      />

      {/* Thruster flames */}
      {!isSleeping && (
        <>
          <ellipse cx="22" cy="89" rx="4" ry="6" fill={isDark ? '#7c3aed' : '#818cf8'} opacity={0.5}
            style={{ animation: 'robotThruster 0.8s ease-in-out infinite' }} />
          <ellipse cx="22" cy="89" rx="2" ry="4" fill={isDark ? '#c4b5fd' : '#6366f1'} opacity={0.4}
            style={{ animation: 'robotThruster 0.8s ease-in-out infinite 0.2s' }} />
          <ellipse cx="50" cy="89" rx="4" ry="6" fill={isDark ? '#7c3aed' : '#818cf8'} opacity={0.5}
            style={{ animation: 'robotThruster 0.8s ease-in-out infinite 0.3s' }} />
          <ellipse cx="50" cy="89" rx="2" ry="4" fill={isDark ? '#c4b5fd' : '#6366f1'} opacity={0.4}
            style={{ animation: 'robotThruster 0.8s ease-in-out infinite 0.5s' }} />
        </>
      )}
    </svg>
  )
}

export default function RobotAssistant() {
  const { isDark } = useTheme()
  const { mouseX, mouseY, scrollDir, activeSection, isIdle, isSleeping, isTabActive } = useRobotBehavior()

  const [isHovered, setIsHovered] = useState(false)
  const [bubble, setBubble] = useState<string | null>(null)
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const prevSection = useRef<string | null>(null)
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // Motion values
  const robotX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth - 120 : 800)
  const robotY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight * 0.4 : 300)

  const x = useSpring(robotX, { stiffness: 55, damping: 18, mass: 1.3 })
  const y = useSpring(robotY, { stiffness: 55, damping: 18, mass: 1.3 })
  const rotate = useSpring(0, { stiffness: 70, damping: 22 })

  // Cursor follow
  useEffect(() => {
    if (isMobile || !isTabActive) return

    const margin = 100
    const offsetX = 130
    const targetX = Math.min(Math.max(mouseX - offsetX, margin), window.innerWidth - margin)
    const targetY = Math.min(Math.max(mouseY - 48, margin), window.innerHeight - margin)

    robotX.set(targetX)
    robotY.set(targetY)

    // Lean toward cursor
    const dx = mouseX - x.get()
    rotate.set(Math.max(-18, Math.min(18, dx * 0.035)))

    // Eye tracking — relative to robot position
    const relX = mouseX - x.get() - 36
    const relY = mouseY - y.get() - 26
    const dist = Math.sqrt(relX * relX + relY * relY) || 1
    setEyeOffset({
      x: Math.min(2.5, Math.abs(relX / dist) * 3) * Math.sign(relX),
      y: Math.min(2.5, Math.abs(relY / dist) * 3) * Math.sign(relY),
    })
  }, [mouseX, mouseY, isTabActive, isMobile, robotX, robotY, x, y, rotate])

  // Scroll drift
  useEffect(() => {
    if (!isTabActive) return
    if (scrollDir === 'down') {
      robotY.set(Math.min(robotY.get() + 55, window.innerHeight - 120))
      rotate.set(12)
    } else if (scrollDir === 'up') {
      robotY.set(Math.max(robotY.get() - 55, 80))
      rotate.set(-12)
    }
  }, [scrollDir, isTabActive, robotY, rotate])

  // Section messages
  useEffect(() => {
    if (!activeSection || activeSection === prevSection.current) return
    prevSection.current = activeSection

    const msg = SECTION_MESSAGES[activeSection]
    if (!msg) return

    if (bubbleTimer.current) clearTimeout(bubbleTimer.current)
    setBubble(msg)
    bubbleTimer.current = setTimeout(() => setBubble(null), 3500)
  }, [activeSection])

  // Sleep bubble
  useEffect(() => {
    if (isSleeping) {
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current)
      setBubble(null)
    }
  }, [isSleeping])

  const handleClick = () => {
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current)
    setBubble('Beep boop! 🤖')
    bubbleTimer.current = setTimeout(() => setBubble(null), 2500)
    rotate.set(rotate.get() + 360)
  }

  // Mobile: fixed float in bottom-right
  if (isMobile) {
    return (
      <div className="fixed bottom-6 right-4 z-50 pointer-events-none select-none">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <RobotSVG eyeOffsetX={0} eyeOffsetY={0} isSleeping={isSleeping} isDark={isDark} isHovered={false} />
        </motion.div>
        <AnimatePresence>
          {bubble && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 8 }}
              className="absolute bottom-full right-0 mb-2 w-44 text-xs px-3 py-2 rounded-2xl rounded-br-none shadow-lg"
              style={{
                background: isDark ? 'rgba(30,27,75,0.92)' : 'rgba(238,242,255,0.95)',
                border: `1px solid ${isDark ? '#4338ca' : '#818cf8'}`,
                color: isDark ? '#c7d2fe' : '#3730a3',
              }}
            >
              {bubble}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <motion.div
      style={{ x, y, rotate, position: 'fixed', top: 0, left: 0, zIndex: 50, willChange: 'transform' }}
      className="select-none"
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {bubble && (
          <motion.div
            key={bubble}
            initial={{ opacity: 0, scale: 0.75, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 text-xs px-3 py-2 rounded-2xl shadow-xl whitespace-nowrap"
            style={{
              background: isDark ? 'rgba(30,27,75,0.92)' : 'rgba(238,242,255,0.95)',
              border: `1px solid ${isDark ? '#4338ca' : '#818cf8'}`,
              color: isDark ? '#c7d2fe' : '#3730a3',
              backdropFilter: 'blur(8px)',
              maxWidth: '200px',
              whiteSpace: 'normal',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            {bubble}
            {/* Tail */}
            <span
              className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0"
              style={{
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: `8px solid ${isDark ? '#4338ca' : '#818cf8'}`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ZZZ when sleeping */}
      <AnimatePresence>
        {isSleeping && (
          <motion.div
            key="zzz"
            className="absolute -top-8 right-0 text-xs font-bold pointer-events-none"
            style={{ color: isDark ? '#818cf8' : '#6366f1' }}
          >
            {['Z', 'z', 'z'].map((z, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 0, scale: 0.6 }}
                animate={{ opacity: [0, 1, 0], y: -20, scale: 1 }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }}
                style={{ display: 'inline-block', marginLeft: i * 2 }}
              >
                {z}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot body — idle float when not actively following */}
      <motion.div
        animate={isIdle && !isSleeping ? { y: [0, -8, 0] } : {}}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        onClick={handleClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{ cursor: 'pointer', pointerEvents: 'auto' }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        <RobotSVG
          eyeOffsetX={eyeOffset.x}
          eyeOffsetY={eyeOffset.y}
          isSleeping={isSleeping}
          isDark={isDark}
          isHovered={isHovered}
        />
      </motion.div>
    </motion.div>
  )
}
