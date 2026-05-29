import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import {
  personalInfo,
  skillCategories,
  projects,
  experiences,
  certificates,
  services,
} from '../../data/portfolioData'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string
  from: 'bot' | 'user'
  text: string
  chips?: string[]
  time: string
}

// ─── Response engine (data-driven) ───────────────────────────────────────────

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function reply(text: string, chips?: string[]): { text: string; chips?: string[] } {
  return { text, chips }
}

const TOP_CHIPS = ['About Mark', 'Skills', 'Projects', 'Experience', 'Certificates', 'Services', 'Contact', 'Available?']

function getBotReply(input: string): { text: string; chips?: string[] } {
  const q = input.toLowerCase()

  /* greeting */
  if (/^(hi|hello|hey|yo|howdy|sup|hiya|good\s*(morning|afternoon|evening))/i.test(q.trim()))
    return reply(
      "Hey there! 👋 I'm Byte, Mark's AI portfolio assistant.\n\nI can answer questions about his skills, projects, experience, and more. What would you like to know?",
      ['About Mark', 'Skills', 'Projects', 'Contact'],
    )

  /* who / about */
  if (/who|about|mark|background|story|person|himself|introduce/.test(q))
    return reply(
      `${personalInfo.name} is a passionate ${personalInfo.title} and aspiring full-stack developer from ${personalInfo.location} 🇵🇭.\n\n${personalInfo.bio}\n\n🎓 ${personalInfo.education.degree}\n🏫 ${personalInfo.education.school}\n📅 ${personalInfo.education.period}\n⭐ GPA: ${personalInfo.education.gpa}`,
      ['Skills', 'Projects', 'Experience', 'Contact'],
    )

  /* skills / tech */
  if (/skill|tech|stack|language|framework|tool|expertise|know|use|built with/.test(q)) {
    const lines = skillCategories
      .map(c => `${c.category}: ${c.skills.map(s => s.name).join(', ')}`)
      .join('\n')
    return reply(
      `Here's Mark's full tech stack across ${skillCategories.length} categories:\n\n${lines}\n\n${personalInfo.stats[1].value}+ technologies in total!`,
      ['Projects', 'Services', 'Experience', 'Contact'],
    )
  }

  /* projects */
  if (/project|build|app|website|made|created|portfolio|work/.test(q)) {
    const featured = projects.filter(p => p.featured)
    const list = featured
      .map(p => `🔹 ${p.title} — ${p.technologies.slice(0, 3).join(', ')}`)
      .join('\n')
    return reply(
      `Mark has shipped ${personalInfo.stats[0].value}+ real-world projects! Here are the featured ones:\n\n${list}\n\nPlus ${projects.length - featured.length} more — scroll to the Projects section to explore them all!`,
      ['Skills', 'Experience', 'Services', 'Contact'],
    )
  }

  /* experience */
  if (/experience|job|intern|professional|role|history|work history|career/.test(q)) {
    const list = experiences
      .map(e => `💼 ${e.role} @ ${e.company} (${e.period})${e.current ? ' ← current' : ''}`)
      .join('\n')
    return reply(
      `Mark has ${personalInfo.stats[3].value}+ years of hands-on experience:\n\n${list}\n\nHe combines academic excellence with real-world execution.`,
      ['Projects', 'Skills', 'Certificates', 'Contact'],
    )
  }

  /* certificates */
  if (/certif|course|award|achieve|credential|badge/.test(q)) {
    const list = certificates
      .slice(0, 5)
      .map(c => `🏅 ${c.title} — ${c.issuer} (${c.date})`)
      .join('\n')
    return reply(
      `Mark holds ${personalInfo.stats[2].value}+ industry certifications:\n\n${list}\n…and more! Check the Certificates section for the complete list.`,
      ['Skills', 'Projects', 'Contact'],
    )
  }

  /* services */
  if (/service|offer|freelanc|help|hire|build for|do for|provide/.test(q)) {
    const list = services.map(s => `⚡ ${s.title}`).join('\n')
    return reply(
      `Mark offers ${services.length} professional services:\n\n${list}\n\nReady to build something amazing together? Reach out!`,
      ['Contact', 'Projects', 'Available?'],
    )
  }

  /* contact */
  if (/contact|reach|email|message|connect|touch|find/.test(q))
    return reply(
      `Here's how to reach Mark:\n\n📧 ${personalInfo.email}\n📱 ${personalInfo.phone}\n🔗 LinkedIn: ${personalInfo.linkedin}\n🐙 GitHub: ${personalInfo.github}\n📍 ${personalInfo.location}\n\nOr scroll down to the Contact section and send a message directly — he responds fast! 📬`,
      ['About Mark', 'Services', 'Available?'],
    )

  /* availability */
  if (/availabl|open to work|open for|looking for|hire|opportunit|freelanc/.test(q))
    return reply(
      `${personalInfo.available ? '🟢 Yes! Mark is actively open to work.\n\nHe\'s available for:\n• Freelance & contract projects\n• Full-time positions\n• Remote collaborations worldwide\n\nDon\'t hesitate — reach out today!' : '🔴 Mark is currently not available for new projects. Check back soon!'}`,
      ['Contact', 'Services', 'Projects'],
    )

  /* location / remote */
  if (/location|where|country|based|remote|philippines|work from/.test(q))
    return reply(
      `Mark is based in the ${personalInfo.location} 🇵🇭 and is fully open to remote work across all time zones. International clients are very welcome!`,
      ['Contact', 'Available?', 'Services'],
    )

  /* education */
  if (/educat|school|college|degree|study|student|gpa|grade/.test(q))
    return reply(
      `🎓 ${personalInfo.education.degree}\n🏫 ${personalInfo.education.school}\n📅 ${personalInfo.education.period}\n⭐ GPA: ${personalInfo.education.gpa}\n\nMark graduated with honors, combining strong academic performance with hands-on project experience.`,
      ['Skills', 'Projects', 'Certificates'],
    )

  /* specific project lookups */
  if (/tlc|ereserve|reservation/.test(q)) {
    const p = projects[0]
    return reply(
      `📱 ${p.title}\n\n${p.description}\n\nTech: ${p.technologies.join(', ')}\nCategory: ${p.category}`,
      ['Projects', 'Experience', 'Contact'],
    )
  }
  if (/shopease|ecommerce|e-commerce|shop/.test(q)) {
    const p = projects[2]
    return reply(
      `🛍️ ${p.title}\n\n${p.description}\n\nTech: ${p.technologies.join(', ')}`,
      ['Projects', 'Skills', 'Contact'],
    )
  }

  /* thanks */
  if (/thank|thanks|appreciate|great|awesome|cool|nice/.test(q))
    return reply(
      "You're welcome! 😊 Feel free to ask anything else about Mark — I'm here to help!",
      ['About Mark', 'Projects', 'Contact'],
    )

  /* fallback */
  return reply(
    "Hmm, I'm not sure about that! 🤔 But I can tell you all about Mark's skills, projects, experience, certifications, and how to get in touch. What would you like to know?",
    ['About Mark', 'Skills', 'Projects', 'Contact'],
  )
}

// ─── Welcome message ──────────────────────────────────────────────────────────

const WELCOME: Message = {
  id: 'welcome',
  from: 'bot',
  text: `Hi! 👋 I'm Byte, Mark's AI portfolio assistant.\n\nAsk me anything about his skills, projects, experience, or how to get in touch!`,
  chips: TOP_CHIPS.slice(0, 5),
  time: now(),
}

// ─── Robot SVG ────────────────────────────────────────────────────────────────

function BotRobotSVG({
  isDark,
  isOpen,
}: {
  isDark: boolean
  isOpen: boolean
}) {
  const a  = isDark ? '#818cf8' : '#6366f1'
  const g  = isDark ? '#a78bfa' : '#818cf8'
  const bs = isDark ? '#4338ca' : '#6366f1'
  const gl = isDark ? 'rgba(99,102,241,0.13)' : 'rgba(99,102,241,0.07)'
  const th = isDark ? '#5b21b6' : '#a5b4fc'

  return (
    <svg
      width="62" height="82" viewBox="0 0 62 82" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 0 ${isOpen ? 16 : 9}px ${g}cc)` }}
    >
      <defs>
        <radialGradient id="cbg2" cx="50%" cy="30%" r="70%">
          <stop offset="0%"   stopColor={isDark ? '#312e81' : '#e0e7ff'} />
          <stop offset="100%" stopColor={isDark ? '#1e1b4b' : '#c7d2fe'} />
        </radialGradient>
      </defs>

      {/* Antennae */}
      <line x1="23" y1="8" x2="18" y2="2" stroke={a} strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="18" cy="2" r="2.2" fill={a} style={{animation:'robotGlow 2s ease-in-out infinite'}}/>
      <line x1="39" y1="8" x2="44" y2="2" stroke={a} strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="44" cy="2" r="2.2" fill={a} style={{animation:'robotGlow 2s ease-in-out infinite 0.6s'}}/>

      {/* Head */}
      <rect x="11" y="8" width="40" height="26" rx="10" fill="url(#cbg2)" stroke={bs} strokeWidth="0.9"/>
      <rect x="13" y="10" width="36" height="7" rx="4" fill={gl}/>

      {/* Eyes */}
      <circle cx="23" cy="22" r="5.5" fill={isDark?'#0c0c1e':'#c7d2fe'} stroke={a} strokeWidth="0.9"/>
      <circle cx={isOpen ? 24 : 23} cy={isOpen ? 21 : 22} r="2.7" fill={a}
        style={{animation:'robotBlink 4s ease-in-out infinite'}}/>
      <circle cx={isOpen ? 23 : 22} cy={isOpen ? 20 : 21} r="0.9" fill="white" opacity={0.7}/>

      <circle cx="39" cy="22" r="5.5" fill={isDark?'#0c0c1e':'#c7d2fe'} stroke={a} strokeWidth="0.9"/>
      <circle cx={isOpen ? 40 : 39} cy={isOpen ? 21 : 22} r="2.7" fill={a}
        style={{animation:'robotBlink 4s ease-in-out infinite 0.45s'}}/>
      <circle cx={isOpen ? 39 : 38} cy={isOpen ? 20 : 21} r="0.9" fill="white" opacity={0.7}/>

      {/* Mouth */}
      {isOpen
        ? <path d="M22 31 Q31 36 40 31" stroke={a} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
        : <rect x="23" y="30" width="16" height="2.5" rx="1.25" fill={isDark?'#312e81':'#a5b4fc'}/>
      }

      {/* Neck */}
      <rect x="25" y="34" width="12" height="5" rx="2.5" fill={isDark?'#1e1b4b':'#eef2ff'} stroke={bs} strokeWidth="0.5"/>

      {/* Body */}
      <rect x="9" y="39" width="44" height="32" rx="10" fill="url(#cbg2)" stroke={bs} strokeWidth="0.9"/>
      <rect x="11" y="41" width="40" height="9" rx="6" fill={gl}/>

      {/* Chest light */}
      <circle cx="31" cy="57" r="5.2" fill={a} opacity={0.9}
        style={{animation:'robotGlow 1.8s ease-in-out infinite'}}/>
      <circle cx="31" cy="57" r="2.3" fill="white" opacity={0.55}/>

      {/* Side accents */}
      <rect x="11" y="60" width="7" height="3" rx="1.5" fill={a} opacity={0.4}/>
      <rect x="44" y="60" width="7" height="3" rx="1.5" fill={a} opacity={0.4}/>

      {/* Thrusters */}
      <ellipse cx="19" cy="73" rx="8"   ry="3.5" fill={th} opacity={0.85}
        style={{animation:'robotThruster 1.2s ease-in-out infinite'}}/>
      <ellipse cx="19" cy="73" rx="4"   ry="1.7" fill="white" opacity={0.28}/>
      <ellipse cx="43" cy="73" rx="8"   ry="3.5" fill={th} opacity={0.85}
        style={{animation:'robotThruster 1.2s ease-in-out infinite 0.5s'}}/>
      <ellipse cx="43" cy="73" rx="4"   ry="1.7" fill="white" opacity={0.28}/>

      {/* Flames */}
      <ellipse cx="19" cy="80" rx="4.5" ry="6"   fill={a} opacity={0.38}
        style={{animation:'robotThruster 0.9s ease-in-out infinite'}}/>
      <ellipse cx="43" cy="80" rx="4.5" ry="6"   fill={a} opacity={0.38}
        style={{animation:'robotThruster 0.9s ease-in-out infinite 0.35s'}}/>
    </svg>
  )
}

// ─── Typing dots ──────────────────────────────────────────────────────────────

function TypingDots({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.14 }}
          className="w-2 h-2 rounded-full"
          style={{ background: isDark ? '#818cf8' : '#6366f1' }}
        />
      ))}
    </div>
  )
}

// ─── Message bubble ───────────────────────────────────────────────────────────

function Bubble({
  msg, isDark, onChip,
}: {
  msg: Message; isDark: boolean; onChip: (t: string) => void
}) {
  const isBot = msg.from === 'bot'
  const accent = isDark ? '#818cf8' : '#6366f1'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className={`flex mb-3 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div className="max-w-[86%]">
        {/* Text bubble */}
        <div
          style={{
            background: isBot
              ? isDark ? 'rgba(28,25,72,0.92)' : 'rgba(224,231,255,0.92)'
              : isDark ? 'rgba(99,102,241,0.88)' : 'rgba(79,70,229,0.88)',
            border: isBot
              ? `1px solid ${isDark ? 'rgba(99,102,241,0.28)' : 'rgba(99,102,241,0.2)'}`
              : 'none',
            borderRadius: isBot ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
            padding: '10px 13px',
            backdropFilter: 'blur(8px)',
          }}
        >
          <p
            style={{
              fontSize: 12.5,
              lineHeight: 1.65,
              margin: 0,
              whiteSpace: 'pre-line',
              fontFamily: 'Inter, sans-serif',
              color: isBot
                ? isDark ? '#dde4ff' : '#1e1b4b'
                : 'white',
            }}
          >
            {msg.text}
          </p>
        </div>

        {/* Timestamp */}
        <p style={{
          fontSize: 10, margin: '3px 4px 0',
          color: isDark ? '#475569' : '#94a3b8',
          textAlign: isBot ? 'left' : 'right',
          fontFamily: 'Inter, sans-serif',
        }}>
          {msg.time}
        </p>

        {/* Quick-reply chips */}
        {isBot && msg.chips && (
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {msg.chips.map(chip => (
              <button
                key={chip}
                onClick={() => onChip(chip)}
                style={{
                  fontSize: 11,
                  padding: '4px 11px',
                  borderRadius: 20,
                  border: `1px solid ${isDark ? 'rgba(99,102,241,0.4)' : 'rgba(99,102,241,0.3)'}`,
                  background: isDark ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.07)',
                  color: isDark ? '#a5b4fc' : '#4338ca',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: 1.4,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.background = isDark ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.16)'
                  el.style.borderColor = accent
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.background = isDark ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.07)'
                  el.style.borderColor = isDark ? 'rgba(99,102,241,0.4)' : 'rgba(99,102,241,0.3)'
                }}
              >
                {chip}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ChatbotAssistant() {
  const { isDark } = useTheme()
  const [isOpen, setIsOpen]       = useState(false)
  const [messages, setMessages]   = useState<Message[]>([WELCOME])
  const [input, setInput]         = useState('')
  const [isTyping, setIsTyping]   = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const [showTip, setShowTip]     = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  const accent = isDark ? '#818cf8' : '#6366f1'

  /* auto-scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  /* focus + clear badge on open */
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false)
      setTimeout(() => inputRef.current?.focus(), 320)
    }
  }, [isOpen])

  const send = useCallback((text: string) => {
    if (!text.trim() || isTyping) return
    const userMsg: Message = {
      id: `u-${Date.now()}`, from: 'user', text: text.trim(), time: now(),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const r = getBotReply(text)
      const botMsg: Message = {
        id: `b-${Date.now()}`, from: 'bot', ...r, time: now(),
      }
      setIsTyping(false)
      setMessages(prev => [...prev, botMsg])
    }, 700 + Math.random() * 500)
  }, [isTyping])

  return (
    <div className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3">

      {/* ── Chat panel ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 16 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            style={{
              width: 'min(348px, calc(100vw - 40px))',
              borderRadius: 18,
              overflow: 'hidden',
              background: isDark ? 'rgba(5,5,18,0.97)' : 'rgba(240,244,255,0.98)',
              border: `1px solid ${isDark ? 'rgba(99,102,241,0.28)' : 'rgba(99,102,241,0.2)'}`,
              boxShadow: [
                `0 0 0 1px ${accent}15`,
                `0 24px 60px rgba(0,0,0,0.55)`,
                `0 0 48px ${accent}12`,
              ].join(', '),
              backdropFilter: 'blur(28px)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '13px 15px',
              background: isDark
                ? 'linear-gradient(135deg,rgba(28,25,72,0.95),rgba(20,16,58,0.98))'
                : 'linear-gradient(135deg,rgba(238,242,255,0.98),rgba(224,231,255,0.99))',
              borderBottom: `1px solid ${isDark ? 'rgba(99,102,241,0.22)' : 'rgba(99,102,241,0.16)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div style={{
                  width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                  background: `linear-gradient(135deg,${accent},${isDark?'#7c3aed':'#4f46e5'})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 4px 14px ${accent}55`,
                }}>
                  <Sparkles size={18} color="white" />
                </div>
                <div>
                  <p style={{
                    margin: 0, fontSize: 13, fontWeight: 700,
                    color: isDark ? '#e0e7ff' : '#1e1b4b',
                    fontFamily: 'Inter, sans-serif',
                  }}>Byte AI</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: '#34d399',
                      animation: 'robotGlow 2s ease-in-out infinite',
                    }}/>
                    <p style={{
                      margin: 0, fontSize: 10,
                      color: isDark ? '#94a3b8' : '#64748b',
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      Mark's Portfolio Assistant · Online
                    </p>
                  </div>
                </div>
              </div>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  width: 30, height: 30, borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: isDark ? 'rgba(99,102,241,0.14)' : 'rgba(99,102,241,0.09)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isDark ? '#94a3b8' : '#64748b',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = isDark ? 'rgba(99,102,241,0.26)' : 'rgba(99,102,241,0.18)')}
                onMouseLeave={e => (e.currentTarget.style.background = isDark ? 'rgba(99,102,241,0.14)' : 'rgba(99,102,241,0.09)')}
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              height: 'min(310px,50vh)',
              overflowY: 'auto',
              padding: '14px 14px 6px',
              scrollbarWidth: 'thin',
              scrollbarColor: `${accent}33 transparent`,
            }}>
              {messages.map(m => (
                <Bubble key={m.id} msg={m} isDark={isDark} onChip={send} />
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="flex justify-start mb-3"
                  >
                    <div style={{
                      background: isDark ? 'rgba(28,25,72,0.92)' : 'rgba(224,231,255,0.92)',
                      border: `1px solid ${isDark ? 'rgba(99,102,241,0.28)' : 'rgba(99,102,241,0.2)'}`,
                      borderRadius: '4px 16px 16px 16px',
                    }}>
                      <TypingDots isDark={isDark} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div style={{
              padding: '10px 12px',
              borderTop: `1px solid ${isDark ? 'rgba(99,102,241,0.18)' : 'rgba(99,102,241,0.13)'}`,
              background: isDark ? 'rgba(12,10,34,0.7)' : 'rgba(248,250,255,0.85)',
              display: 'flex', gap: 8, alignItems: 'center',
            }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) send(input) }}
                placeholder="Ask me anything…"
                style={{
                  flex: 1,
                  background: isDark ? 'rgba(28,25,72,0.7)' : 'rgba(238,242,255,0.85)',
                  border: `1px solid ${isDark ? 'rgba(99,102,241,0.22)' : 'rgba(99,102,241,0.18)'}`,
                  borderRadius: 10, padding: '9px 12px',
                  fontSize: 12.5, outline: 'none',
                  color: isDark ? '#e2e8f0' : '#1e293b',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e  => (e.target.style.borderColor = accent)}
                onBlur={e   => (e.target.style.borderColor = isDark ? 'rgba(99,102,241,0.22)' : 'rgba(99,102,241,0.18)')}
              />
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => send(input)}
                disabled={!input.trim() || isTyping}
                style={{
                  width: 36, height: 36, borderRadius: 10, border: 'none', flexShrink: 0,
                  background: input.trim() && !isTyping
                    ? `linear-gradient(135deg,${accent},${isDark?'#7c3aed':'#4f46e5'})`
                    : isDark ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.09)',
                  cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: input.trim() && !isTyping ? `0 4px 12px ${accent}44` : 'none',
                  transition: 'all 0.2s',
                }}
              >
                <Send
                  size={14}
                  color={input.trim() && !isTyping ? 'white' : (isDark ? '#4338ca' : '#a5b4fc')}
                />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Robot button ────────────────────────────────────────── */}
      <div className="relative">

        {/* Tooltip */}
        <AnimatePresence>
          {showTip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 8, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'absolute',
                right: 'calc(100% + 12px)',
                top: '50%', transform: 'translateY(-50%)',
                background: isDark ? 'rgba(28,25,72,0.96)' : 'rgba(238,242,255,0.97)',
                border: `1px solid ${isDark ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.25)'}`,
                borderRadius: 9, padding: '7px 13px',
                whiteSpace: 'nowrap', backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              }}
            >
              <span style={{
                fontSize: 12, fontWeight: 500, fontFamily: 'Inter, sans-serif',
                color: isDark ? '#c7d2fe' : '#3730a3',
              }}>
                Ask Byte ✨
              </span>
              {/* Arrow */}
              <div style={{
                position: 'absolute', right: -5, top: '50%', transform: 'translateY(-50%)',
                borderTop: '5px solid transparent', borderBottom: '5px solid transparent',
                borderLeft: `5px solid ${isDark ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.25)'}`,
              }}/>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        <AnimatePresence>
          {hasUnread && !isOpen && (
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 z-10"
              style={{
                width: 18, height: 18, borderRadius: '50%',
                background: '#ef4444',
                border: `2px solid ${isDark ? '#080810' : '#f8fafc'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 9, color: 'white', fontWeight: 700, lineHeight: 1 }}>1</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring (idle) */}
        {!isOpen && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ animation: 'chatbotPulse 2.8s ease-in-out infinite' }}
          />
        )}

        {/* The robot */}
        <motion.button
          onClick={() => setIsOpen(v => !v)}
          onHoverStart={() => setShowTip(true)}
          onHoverEnd={() => setShowTip(false)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.93 }}
          style={{
            position: 'relative',
            background: isDark
              ? 'linear-gradient(145deg,rgba(28,25,72,0.92),rgba(18,14,52,0.96))'
              : 'linear-gradient(145deg,rgba(238,242,255,0.96),rgba(224,231,255,0.98))',
            border: `1.5px solid ${isDark ? 'rgba(99,102,241,0.42)' : 'rgba(99,102,241,0.3)'}`,
            borderRadius: 20, padding: '12px 14px 7px',
            cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            boxShadow: [
              `0 0 0 1px ${accent}18`,
              `0 8px 32px rgba(0,0,0,0.45)`,
              `0 0 24px ${accent}20`,
            ].join(', '),
            backdropFilter: 'blur(14px)',
            overflow: 'hidden',
          }}
        >
          {/* Glass sheen */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
            background: 'linear-gradient(180deg,rgba(255,255,255,0.07) 0%,transparent 100%)',
            borderRadius: '20px 20px 0 0', pointerEvents: 'none',
          }}/>

          <motion.div
            animate={!isOpen ? { y: [0, -5, 0] } : {}}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <BotRobotSVG isDark={isDark} isOpen={isOpen} />
          </motion.div>

          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
            color: accent, fontFamily: '"JetBrains Mono", monospace',
            textTransform: 'uppercase', userSelect: 'none',
          }}>
            {isOpen ? 'CLOSE' : 'BYTE AI'}
          </span>
        </motion.button>
      </div>
    </div>
  )
}
