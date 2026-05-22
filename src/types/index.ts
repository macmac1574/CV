export interface Skill {
  name: string
  level: number
  icon?: string
  category: string
}

export interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string
  category: string
  featured?: boolean
}

export interface Experience {
  id: number
  role: string
  company: string
  period: string
  description: string[]
  type: 'internship' | 'freelance' | 'organization' | 'academic'
  current?: boolean
}

export interface Certificate {
  id: number
  title: string
  issuer: string
  date: string
  image: string
  credentialUrl?: string
}

export interface Service {
  id: number
  title: string
  description: string
  icon: string
  features: string[]
}

export interface Testimonial {
  id: number
  name: string
  role: string
  avatar: string
  content: string
  rating: number
}

export interface NavLink {
  label: string
  href: string
}

export type Theme = 'dark' | 'light'
export type ProjectCategory = 'All' | 'Web' | 'Mobile' | 'UI/UX' | 'Systems' | 'Research'
