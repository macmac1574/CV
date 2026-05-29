import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import {
  Home, User, Zap, FolderOpen, Briefcase, Award, Wrench, MessageCircle,
  type LucideIcon,
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useNavRobot } from '../../context/NavRobotContext'

interface NavInfo {
  icon: LucideIcon
  title: string
  desc: string
  color: string
}

const NAV_INFO: Record<string, NavInfo> = {
  home:         { icon: Home,          title: 'Home',         color: '#818cf8', desc: 'Welcome — intro, background & portfolio highlights.'          },
  about:        { icon: User,          title: 'About',        color: '#a78bfa', desc: 'Who is Mark? Personal story, education & core values.'        },
  skills:       { icon: Zap,           title: 'Skills',       color: '#60a5fa', desc: 'Full-stack expertise — web, mobile, backend & design tools.'  },
  projects:     { icon: FolderOpen,    title: 'Projects',     color: '#34d399', desc: '24+ real-world builds spanning web & mobile platforms.'        },
  experience:   { icon: Briefcase,     title: 'Experience',   color: '#fbbf24', desc: 'Professional history, internships & key contributions.'        },
  certificates: { icon: Award,         title: 'Certificates', color: '#f472b6', desc: 'Industry certifications & verified completed courses.'          },
  services:     { icon: Wrench,        title: 'Services',     color: '#fb923c', desc: 'Custom solutions Mark can build for you & your team.'           },
  contact:      { icon: MessageCircle, title: 'Contact',      color: '#2dd4bf', desc: "Open to freelance & full-time — let's build something great."  },
}

const PANEL_W = 228

// ─── Compact robot SVG for navbar ───────────────────────────────────────────
function NavRobotSVG({ isDark, color }: { isDark: boolean; color: string }) {
  const bg   = isDark ? '#1e1b4b' : '#eef2ff'
  const str  = isDark ? '#4338ca' : '#818cf8'
  const gl   = isDark ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)'
  const thr  = isDark ? '#5b21b6' : '#a5b4fc'

  return (
    <svg
      width="44" height="60" viewBox="0 0 44 60" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 0 10px ${color}99) drop-shadow(0 2px 6px rgba(0,0,0,0.5))` }}
    >
      <defs>
        <radialGradient id="nbg" cx="50%" cy="30%" r="70%">
          <stop offset="0%"   stopColor={isDark ? '#312e81' : '#e0e7ff'} />
          <stop offset="100%" stopColor={isDark ? '#1e1b4b' : '#c7d2fe'} />
        </radialGradient>
      </defs>

      {/* Antennae */}
      <line x1="16" y1="7" x2="12" y2="1" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="12" cy="1" r="2" fill={color} style={{ animation: 'robotGlow 2s ease-in-out infinite' }} />
      <line x1="28" y1="7" x2="32" y2="1" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="32" cy="1" r="2" fill={color} style={{ animation: 'robotGlow 2s ease-in-out infinite 0.7s' }} />

      {/* Head */}
      <rect x="8" y="7" width="28" height="22" rx="8" fill="url(#nbg)" stroke={str} strokeWidth="0.8" />
      <rect x="10" y="9" width="24" height="6" rx="4" fill={gl} />

      {/* Eyes */}
      <circle cx="17" cy="19" r="4.5" fill={isDark ? '#0d0d1e' : '#c7d2fe'} stroke={color} strokeWidth="0.8" />
      <circle cx="17" cy="19" r="2.2" fill={color} style={{ animation: 'robotBlink 4s ease-in-out infinite' }} />
      <circle cx="15.7" cy="17.7" r="0.75" fill="white" opacity={0.7} />

      <circle cx="27" cy="19" r="4.5" fill={isDark ? '#0d0d1e' : '#c7d2fe'} stroke={color} strokeWidth="0.8" />
      <circle cx="27" cy="19" r="2.2" fill={color} style={{ animation: 'robotBlink 4s ease-in-out infinite 0.45s' }} />
      <circle cx="25.7" cy="17.7" r="0.75" fill="white" opacity={0.7} />

      {/* Neck */}
      <rect x="18" y="29" width="8" height="4" rx="2" fill={bg} stroke={str} strokeWidth="0.5" />

      {/* Body */}
      <rect x="5" y="33" width="34" height="22" rx="8" fill="url(#nbg)" stroke={str} strokeWidth="0.8" />
      <rect x="7" y="35" width="30" height="7" rx="4" fill={gl} />

      {/* Chest light */}
      <circle cx="22" cy="46" r="4.5" fill={color} opacity={0.88}
        style={{ animation: 'robotGlow 1.8s ease-in-out infinite' }} />
      <circle cx="22" cy="46" r="2" fill="white" opacity={0.55} />

      {/* Side accents */}
      <rect x="7"  y="48" width="5" height="2.5" rx="1.2" fill={color} opacity={0.4} />
      <rect x="32" y="48" width="5" height="2.5" rx="1.2" fill={color} opacity={0.4} />

      {/* Thrusters */}
      <ellipse cx="13" cy="56" rx="6.5" ry="3"   fill={thr} opacity={0.85}
        style={{ animation: 'robotThruster 1.2s ease-in-out infinite' }} />
      <ellipse cx="13" cy="56" rx="3.2" ry="1.5" fill="white" opacity={0.28} />
      <ellipse cx="31" cy="56" rx="6.5" ry="3"   fill={thr} opacity={0.85}
        style={{ animation: 'robotThruster 1.2s ease-in-out infinite 0.5s' }} />
      <ellipse cx="31" cy="56" rx="3.2" ry="1.5" fill="white" opacity={0.28} />

      {/* Flames */}
      <ellipse cx="13" cy="60" rx="3.5" ry="5" fill={color} opacity={0.4}
        style={{ animation: 'robotThruster 0.9s ease-in-out infinite' }} />
      <ellipse cx="31" cy="60" rx="3.5" ry="5" fill={color} opacity={0.4}
        style={{ animation: 'robotThruster 0.9s ease-in-out infinite 0.4s' }} />
    </svg>
  )
}

// ─── Holographic panel ───────────────────────────────────────────────────────
function HoloPanel({
  info,
  navId,
  panelLeft,
  tailOffset,
  isDark,
}: {
  info: NavInfo
  navId: string
  panelLeft: number
  tailOffset: number
  isDark: boolean
}) {
  const { color } = info
  const Icon = info.icon

  const brackets = [
    { top: 3, left: 3 },
    { top: 3, right: 3 },
    { bottom: 3, left: 3 },
    { bottom: 3, right: 3 },
  ]

  return (
    <motion.div
      key={navId}
      initial={{ opacity: 0, scaleY: 0, y: -6 }}
      animate={{ opacity: 1, scaleY: 1, y: 0 }}
      exit={{ opacity: 0, scaleY: 0, y: -6 }}
      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
      style={{
        position: 'fixed',
        top: 68,
        left: panelLeft,
        width: PANEL_W,
        zIndex: 48,
        transformOrigin: 'top center',
        pointerEvents: 'none',
      }}
    >
      {/* Pointer tail */}
      <div
        style={{
          position: 'absolute',
          top: -7,
          left: tailOffset,
          width: 0,
          height: 0,
          borderLeft: '7px solid transparent',
          borderRight: '7px solid transparent',
          borderBottom: `7px solid ${color}55`,
        }}
      />

      {/* Glass panel body */}
      <div
        style={{
          background: isDark ? 'rgba(5,5,18,0.96)' : 'rgba(238,242,255,0.97)',
          border: `1px solid ${color}44`,
          borderRadius: 10,
          padding: '11px 13px 10px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: [
            `0 0 0 1px ${color}18`,
            `0 0 28px ${color}18`,
            `0 16px 48px rgba(0,0,0,0.5)`,
            `inset 0 1px 0 ${color}18`,
          ].join(', '),
        }}
      >
        {/* CRT scanlines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(99,102,241,0.025) 2px,rgba(99,102,241,0.025) 4px)',
            borderRadius: 10,
            zIndex: 0,
          }}
        />

        {/* Scanning beam */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            height: 1,
            background: `linear-gradient(90deg,transparent,${color}66,transparent)`,
            animation: 'holoScan 2.2s linear infinite',
            zIndex: 1,
          }}
        />

        {/* Corner brackets */}
        {brackets.map((pos, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              ...(pos.top    !== undefined && { top:    pos.top    }),
              ...(pos.bottom !== undefined && { bottom: pos.bottom }),
              ...(pos.left   !== undefined && { left:   pos.left   }),
              ...(pos.right  !== undefined && { right:  pos.right  }),
              width: 10,
              height: 10,
              borderTop:    i < 2  ? `1.5px solid ${color}` : undefined,
              borderBottom: i >= 2 ? `1.5px solid ${color}` : undefined,
              borderLeft:   i % 2 === 0 ? `1.5px solid ${color}` : undefined,
              borderRight:  i % 2 === 1 ? `1.5px solid ${color}` : undefined,
            }}
          />
        ))}

        {/* Header row */}
        <div className="relative flex items-center gap-2 mb-2" style={{ zIndex: 2 }}>
          <div
            style={{
              background: `${color}18`,
              border: `1px solid ${color}40`,
              borderRadius: 6,
              padding: '4px 5px',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <Icon size={12} style={{ color }} />
          </div>
          <motion.span
            key={navId + '-t'}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase' as const,
              color,
              animation: 'holoGlitch 5s ease-in-out infinite',
            }}
          >
            {info.title}
          </motion.span>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: `linear-gradient(90deg,${color}55,${color}18,transparent)`,
            marginBottom: 8,
            position: 'relative',
            zIndex: 2,
          }}
        />

        {/* Description */}
        <motion.p
          key={navId + '-d'}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.07, duration: 0.18 }}
          style={{
            fontSize: 11,
            lineHeight: 1.58,
            color: isDark ? '#94a3b8' : '#475569',
            fontFamily: 'Inter, sans-serif',
            margin: 0,
            position: 'relative',
            zIndex: 2,
          }}
        >
          {info.desc}
        </motion.p>

        {/* Status bar */}
        <div
          className="flex items-center gap-1.5 mt-2.5"
          style={{ position: 'relative', zIndex: 2 }}
        >
          <div
            style={{
              width: 5, height: 5, borderRadius: '50%',
              background: color,
              animation: 'robotGlow 1.6s ease-in-out infinite',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 9,
              color,
              fontFamily: '"JetBrains Mono", monospace',
              opacity: 0.6,
              letterSpacing: '0.09em',
              textTransform: 'uppercase' as const,
            }}
          >
            BYTE.NAV / {info.title.toUpperCase()}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function NavRobotAssistant() {
  const { hoveredNav } = useNavRobot()
  const { isDark } = useTheme()

  const [panelLeft, setPanelLeft]   = useState(0)
  const [tailOffset, setTailOffset] = useState(PANEL_W / 2 - 7)
  const [activeInfo, setActiveInfo] = useState<NavInfo | null>(null)
  const wasVisible = useRef(false)

  // Only render on desktop (lg = 1024px+) — on mobile the nav collapses
  const [isDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  )

  const robotXSrc   = useMotionValue(typeof window !== 'undefined' ? window.innerWidth + 60 : 900)
  const opacitySrc  = useMotionValue(0)
  const springX     = useSpring(robotXSrc,  { stiffness: 300, damping: 28, mass: 0.55 })
  const opacity     = useSpring(opacitySrc, { stiffness: 220, damping: 24 })

  useEffect(() => {
    if (!hoveredNav) {
      opacitySrc.set(0)
      wasVisible.current = false
      return
    }

    const info = NAV_INFO[hoveredNav]
    if (!info) return
    setActiveInfo(info)

    const el = document.querySelector<HTMLElement>(`[data-nav-id="${hoveredNav}"]`)
    if (!el) return

    const rect = el.getBoundingClientRect()
    const cx   = rect.left + rect.width / 2

    // Clamp panel so it never overflows the viewport
    const newPanelLeft = Math.max(8, Math.min(cx - PANEL_W / 2, window.innerWidth - PANEL_W - 8))
    const newTail      = Math.max(14, Math.min(cx - newPanelLeft - 7, PANEL_W - 28))

    robotXSrc.set(cx - 22)
    setPanelLeft(newPanelLeft)
    setTailOffset(newTail)
    opacitySrc.set(1)
    wasVisible.current = true
  }, [hoveredNav, robotXSrc, opacitySrc])

  if (!isDesktop) return null

  const color = activeInfo?.color ?? '#818cf8'

  return (
    <>
      {/* Floating robot */}
      <motion.div
        style={{
          x: springX,
          opacity,
          position: 'fixed',
          top: 2,
          left: 0,
          zIndex: 51,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      >
        <NavRobotSVG isDark={isDark} color={color} />
      </motion.div>

      {/* Holographic info panel */}
      <AnimatePresence>
        {hoveredNav && activeInfo && (
          <HoloPanel
            info={activeInfo}
            navId={hoveredNav}
            panelLeft={panelLeft}
            tailOffset={tailOffset}
            isDark={isDark}
          />
        )}
      </AnimatePresence>
    </>
  )
}
