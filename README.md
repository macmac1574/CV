# Mark L. Sicad — IT Portfolio

A modern, responsive, and high-performance Information Technology Portfolio Website built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- **React 18** + **Vite** + **TypeScript**
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — smooth animations
- **Lucide React** — clean icon set
- **react-type-animation** — typing effect
- **react-intersection-observer** — scroll-triggered animations

## Features

- Dark / Light mode with localStorage persistence
- Animated loading screen
- Canvas-based particle background
- Typing text animation (hero section)
- Scroll-reveal animations on every section
- Fully responsive (mobile-first)
- Filterable projects grid
- Animated skill progress bars
- Timeline experience section
- Testimonials carousel
- Contact form with validation + mailto fallback
- Back-to-top button
- Sticky navbar with active section detection

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Customization

All personal data lives in **`src/data/portfolioData.ts`** — update your name, bio, skills, projects, experience, certificates, and services there.

Update the `<title>` and meta tags in **`index.html`** with your name.

Replace `/public/resume.pdf` with your actual resume file.

To add a profile photo, place it in `public/images/` and update `personalInfo.avatar` in `portfolioData.ts`.

## Deployment

### Vercel
```bash
npm run build
# Push to GitHub and connect repo to Vercel
```

### Netlify
```bash
npm run build
# Drag-and-drop the dist/ folder to Netlify, or connect the repo
```
