import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { personalInfo } from '../../data/portfolioData'
import SectionTitle from '../ui/SectionTitle'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

type Status = 'idle' | 'sending' | 'success' | 'error'

const contactItems = [
  { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
  { icon: MapPin, label: 'Location', value: personalInfo.location, href: '#' },
]

const socials = [
  { icon: Github, href: personalInfo.github, label: 'GitHub' },
  { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
]

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const formRef = useRef<HTMLFormElement>(null)

  const validate = () => {
    const e: Partial<FormState> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1500))
    // mailto fallback
    const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
    window.open(mailto)
    setStatus('success')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name as keyof FormState]) {
      setErrors(er => ({ ...er, [e.target.name]: undefined }))
    }
  }

  return (
    <section id="contact" className="bg-white dark:bg-dark-surface">
      <div className="section-container">
        <SectionTitle
          tag="Contact"
          title="Let's Work Together"
          subtitle="Have a project in mind? I'd love to hear from you. Let's build something amazing."
        />

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Get in Touch
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Whether you have a project, a question, or just want to say hi — my inbox is always open!
              </p>
            </div>

            {/* Contact items */}
            <div className="space-y-3">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 card card-hover group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500 transition-colors duration-300">
                    <Icon size={16} className="text-primary-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="text-sm text-slate-400 mb-3 uppercase tracking-widest">Follow me</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl border border-slate-200 dark:border-dark-border text-slate-500 dark:text-slate-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 flex items-center justify-center transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <div>
                <p className="text-green-600 dark:text-green-400 font-semibold text-sm">Available for Work</p>
                <p className="text-green-600/70 dark:text-green-400/70 text-xs">Open to full-time, part-time & freelance</p>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="card p-6 md:p-8">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4"
                  >
                    <CheckCircle2 size={32} className="text-green-500" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-400 text-sm">Your email client has been opened. I'll get back to you soon!</p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                      />
                      {errors.name && (
                        <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                          <AlertCircle size={10} /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                      />
                      {errors.email && (
                        <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                          <AlertCircle size={10} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                      className={`input-field ${errors.subject ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.subject && (
                      <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                        <AlertCircle size={10} /> {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell me about your project..."
                      className={`input-field resize-none ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.message && (
                      <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                        <AlertCircle size={10} /> {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
