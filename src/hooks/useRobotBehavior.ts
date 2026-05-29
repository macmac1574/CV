import { useEffect, useRef, useState, useCallback } from 'react'

export type ScrollDir = 'up' | 'down' | 'idle'
export type SectionId = 'home' | 'about' | 'skills' | 'projects' | 'experience' | 'certificates' | 'services' | 'contact' | null

const SECTION_IDS: SectionId[] = ['home', 'about', 'skills', 'projects', 'experience', 'certificates', 'services', 'contact']
const IDLE_DELAY = 3000
const SLEEP_DELAY = 8000

export function useRobotBehavior() {
  const [mouseX, setMouseX] = useState(() => (typeof window !== 'undefined' ? window.innerWidth * 0.82 : 800))
  const [mouseY, setMouseY] = useState(() => (typeof window !== 'undefined' ? window.innerHeight * 0.4 : 300))
  const [scrollDir, setScrollDir] = useState<ScrollDir>('idle')
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const [isIdle, setIsIdle] = useState(false)
  const [isSleeping, setIsSleeping] = useState(false)
  const [isTabActive, setIsTabActive] = useState(true)

  const rafRef = useRef<number | null>(null)
  const pendingMouse = useRef<{ x: number; y: number } | null>(null)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sleepTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastScrollY = useRef(0)
  const scrollIdleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const resetIdleTimers = useCallback(() => {
    setIsIdle(false)
    setIsSleeping(false)

    if (idleTimer.current) clearTimeout(idleTimer.current)
    if (sleepTimer.current) clearTimeout(sleepTimer.current)

    idleTimer.current = setTimeout(() => setIsIdle(true), IDLE_DELAY)
    sleepTimer.current = setTimeout(() => setIsSleeping(true), SLEEP_DELAY)
  }, [])

  // Mouse tracking — throttled via rAF
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pendingMouse.current = { x: e.clientX, y: e.clientY }
      resetIdleTimers()

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          if (pendingMouse.current) {
            setMouseX(pendingMouse.current.x)
            setMouseY(pendingMouse.current.y)
            pendingMouse.current = null
          }
          rafRef.current = null
        })
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    resetIdleTimers()

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (idleTimer.current) clearTimeout(idleTimer.current)
      if (sleepTimer.current) clearTimeout(sleepTimer.current)
    }
  }, [resetIdleTimers])

  // Scroll direction
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      const dir: ScrollDir = current > lastScrollY.current ? 'down' : 'up'
      lastScrollY.current = current
      setScrollDir(dir)
      resetIdleTimers()

      if (scrollIdleTimer.current) clearTimeout(scrollIdleTimer.current)
      scrollIdleTimer.current = setTimeout(() => setScrollDir('idle'), 300)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (scrollIdleTimer.current) clearTimeout(scrollIdleTimer.current)
    }
  }, [resetIdleTimers])

  // Section awareness via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach(id => {
      if (!id) return
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  // Tab visibility
  useEffect(() => {
    const onChange = () => setIsTabActive(!document.hidden)
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  return { mouseX, mouseY, scrollDir, activeSection, isIdle, isSleeping, isTabActive }
}
