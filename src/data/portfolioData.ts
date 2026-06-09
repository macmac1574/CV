import type { Project, Experience, Certificate, Service, Testimonial, NavLink } from '../types'

export const personalInfo = {
  name: 'Mark L. Sicad',
  title: 'Information Technology Student',
  roles: [
    'Full Stack Developer',
    'Mobile App Developer',
    'UI/UX Designer',
    'Software Engineer',
  ],
  bio: `I'm a passionate Information Technology and aspiring full-stack developer with a strong foundation in modern web and mobile technologies. I love crafting elegant, user-centric digital experiences that solve real-world problems.`,
  bioExtended: `With hands-on experience in building web and mobile applications, I bring together clean code, creative design thinking, and a drive for continuous learning. I'm committed to delivering high-quality software solutions that make an impact.`,
  email: 'marksicad8@gmail.com',
  phone: '+63 991 575 6024',
  location: 'Philippines',
  github: 'https://github.com/macmac1574',
  linkedin: 'https://www.linkedin.com/in/mark-sicad-509305410/',
  instagram: 'https://www.instagram.com/mc_lajada',
  facebook: 'https://www.facebook.com/mark.sicad.98',
  avatar: '/tp.png',
  resume: '/resume.pdf',
  available: true,
  stats: [
    { label: 'Projects Completed', value: 1, suffix: '+' },
    { label: 'Technologies', value: 12, suffix: '+' },
    { label: 'Certificates', value: 3, suffix: '' },
    { label: 'Years Learning', value: 4, suffix: '+' },
  ],
  education: {
    degree: 'Bachelor of Science in Information Technology',
    school: 'TLC College',
    period: 'Graduated June 5, 2026',
    gpa: '3.8 / 4.0',
  },
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export const skillCategories = [
  {
    category: 'Frontend',
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'HTML & CSS', level: 92 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 78 },
      { name: 'React.js', level: 82 },
      { name: 'Next.js', level: 72 },
      { name: 'Tailwind CSS', level: 88 },
    ],
  },
  {
    category: 'Backend',
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Node.js', level: 76 },
      { name: 'Express.js', level: 74 },
      { name: 'PHP', level: 68 },
      { name: 'Python', level: 70 },
      { name: 'REST APIs', level: 80 },
      { name: 'Firebase', level: 75 },
    ],
  },
  {
    category: 'Mobile',
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'React Native', level: 72 },
      { name: 'Android (Java)', level: 65 },
      { name: 'Flutter', level: 58 },
    ],
  },
  {
    category: 'Database & Cloud',
    color: 'from-orange-500 to-yellow-500',
    skills: [
      { name: 'MySQL', level: 80 },
      { name: 'Cloudinary', level: 72 },
      { name: 'Firebase/Firestore', level: 75 },
      { name: 'Supabase', level: 65 },
    ],
  },
  {
    category: 'Tools & Design',
    color: 'from-rose-500 to-red-500',
    skills: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'Figma', level: 78 },
      { name: 'VS Code', level: 90 },
      { name: 'Chatgpt', level: 80 },
      { name: 'Canva', level: 90 },
    ],
  },
  {
    category: 'Other',
    color: 'from-indigo-500 to-violet-500',
    skills: [
      { name: 'Cybersecurity Basics', level: 60 },
      { name: 'Networking (CCNA)', level: 58 },
      { name: 'UI/UX Design', level: 75 },
      { name: 'Agile / Scrum', level: 70 },
    ],
  },
]

export const projects: Project[] = [
  {
    id: 1,
    title: 'TLC E-ReServe',
    description: 'Mobile-based facility reservation system for TLC College. Features real-time booking, admin dashboard, conflict detection, and push notifications.',
    image: '',
    technologies: ['React Native', 'Firebase', 'Node.js', 'Expo'],
    github: 'https://github.com/marksicad/tlc-ereserve',
    demo: '#',
    category: 'Mobile',
    featured: true,
  },
  {
    id: 2,
    title: 'DevConnect Portfolio',
    description: 'A modern full-stack developer portfolio platform with CMS capabilities, real-time analytics, and dynamic project showcasing.',
    image: '',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    github: 'https://github.com/marksicad/devconnect',
    demo: '#',
    category: 'Web',
    featured: true,
  },
]

export const experiences: Experience[] = [
  {
    id: 1,
    role: 'IT Intern – Web Developer',
    company: 'TechVision Solutions Inc.',
    period: 'Jun 2024 – Aug 2024',
    description: [
      'Developed and maintained internal web applications using React and Node.js',
      'Collaborated with senior developers to build RESTful APIs integrated with MySQL',
      'Improved UI responsiveness, reducing page load time by 30%',
      'Participated in daily stand-ups and sprint reviews following Agile methodology',
    ],
    type: 'internship',
    current: false,
  },
  {
    id: 2,
    role: 'Freelance Full Stack Developer',
    company: 'Self-Employed',
    period: 'Jan 2023 – Present',
    description: [
      'Designed and built custom websites and web applications for local businesses',
      'Delivered 8+ client projects including e-commerce stores and service landing pages',
      'Managed end-to-end project lifecycle from requirements gathering to deployment',
      'Maintained a 5-star client satisfaction rating across all projects',
    ],
    type: 'freelance',
    current: true,
  },
  {
    id: 3,
    role: 'Technical Committee Head',
    company: 'ICTSO – TLC College',
    period: 'Aug 2023 – May 2024',
    description: [
      'Led a team of 10 students in planning and executing tech-focused events and seminars',
      'Managed the organization\'s website and social media technical infrastructure',
      'Organized a regional hackathon with 80+ participants from different schools',
    ],
    type: 'organization',
    current: false,
  },
  {
    id: 4,
    role: 'Capstone Project Lead',
    company: 'TLC College – BSIT Department',
    period: 'Aug 2023 – Apr 2024',
    description: [
      'Led development of TLC E-ReServe, a mobile-based facility reservation system',
      'Developed and deployed the project independently, managing all phases of the software development lifecycle using Git and Agile development practices.',
      'Presented the completed system to a panel of faculty and IT industry professionals',
      'Received highest commendation in the capstone defense',
    ],
    type: 'academic',
    current: false,
  },
]

export const certificates: Certificate[] = [
  {
    id: 1,
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: 'March 2024',
    image: '',
    credentialUrl: '#',
  },
  {
    id: 2,
    title: 'JavaScript Algorithms & Data Structures',
    issuer: 'freeCodeCamp',
    date: 'May 2024',
    image: '',
    credentialUrl: '#',
  },
  {
    id: 3,
    title: 'React – The Complete Guide',
    issuer: 'Udemy',
    date: 'July 2024',
    image: '',
    skeleton: true,
  },
  {
    id: 4,
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'Amazon Web Services',
    date: 'September 2024',
    image: '',
    skeleton: true,
  },
  {
    id: 5,
    title: 'Google IT Support Professional',
    issuer: 'Google / Coursera',
    date: 'November 2023',
    image: '',
    skeleton: true,
  },
  {
    id: 6,
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: 'February 2024',
    image: '',
    skeleton: true,
  },
  {
    id: 7,
    title: 'UI/UX Design Fundamentals',
    issuer: 'Google / Coursera',
    date: 'April 2024',
    image: '',
    skeleton: true,
  },
  {
    id: 8,
    title: 'Python for Everybody',
    issuer: 'University of Michigan / Coursera',
    date: 'January 2024',
    image: '',
    skeleton: true,
  },
]

export const services: Service[] = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Modern, responsive, and high-performance websites and web applications built with the latest technologies.',
    icon: 'Globe',
    features: ['Responsive Design', 'React / Next.js', 'REST API Integration', 'SEO Optimization'],
  },
  {
    id: 2,
    title: 'Mobile App Development',
    description: 'Cross-platform mobile applications for iOS and Android with smooth UX and native performance.',
    icon: 'Smartphone',
    features: ['React Native', 'Flutter', 'Firebase Backend', 'App Store Deployment'],
  },
  {
    id: 3,
    title: 'UI/UX Design',
    description: 'User-centered designs that combine aesthetics with functionality for delightful digital experiences.',
    icon: 'Palette',
    features: ['Figma Prototyping', 'Design Systems', 'User Research', 'Accessibility'],
  },
  {
    id: 4,
    title: 'Database Design',
    description: 'Efficient and scalable database architecture tailored to your application\'s needs.',
    icon: 'Database',
    features: ['MySQL', 'Schema Design', 'Query Optimization', 'Data Migration'],
  },
  {
    id: 5,
    title: 'Technical Support',
    description: 'Reliable IT support, system troubleshooting, network configuration, and hardware/software assistance.',
    icon: 'Wrench',
    features: ['System Troubleshooting', 'Network Setup', 'Software Installation', 'IT Consulting'],
  },
  {
    id: 6,
    title: 'System Development',
    description: 'End-to-end custom software systems designed to automate and streamline your business processes.',
    icon: 'Code2',
    features: ['Requirements Analysis', 'System Architecture', 'Testing & QA', 'Deployment'],
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Gil Jamisola jr.',
    role: 'IT Department Chair – TLC College',
    avatar: '',
    content: 'Mark consistently demonstrates exceptional technical skills and a strong drive for excellence. His capstone project was one of the most polished and well-executed systems I\'ve seen from an undergraduate student.',
    rating: 5,
  },
  {
    id: 2,
    name: 'James Reyes',
    role: 'Senior Developer – TechVision Solutions',
    avatar: '',
    content: 'Working with Mark during his internship was a pleasure. He picked up new technologies quickly, contributed meaningful features, and always delivered clean, readable code. A truly talented developer.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ana Cruz',
    role: 'Small Business Owner',
    avatar: '',
    content: 'Mark built my online store from scratch. The site looks amazing, works perfectly on mobile, and my customers love it. He was professional, communicative, and delivered on time. Highly recommend!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Lester Gomez',
    role: 'Team Lead – Hackathon 2024',
    avatar: '',
    content: 'Mark\'s leadership during our team\'s hackathon was outstanding. He kept us organized, solved critical bugs under pressure, and helped us deliver a complete, working product within 24 hours.',
    rating: 5,
  },
]
