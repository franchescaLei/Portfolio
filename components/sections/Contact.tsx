'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useMode } from '@/components/ui/ModeProvider'

// EDIT: Update all href, label, and sublabel values to your own links
const CONTACT_LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    sublabel: '@franchescaLei',
    href: 'https://github.com/franchescaLei',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    accent: '#333',
  },
  {
    id: 'onlinejobs',
    label: 'OnlineJobs.ph',
    sublabel: 'View my profile',
    href: 'https://www.onlinejobs.ph/jobseekers/info/4981002',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    accent: '#2563EB',
  },
  {
    id: 'email',
    label: 'Email',
    sublabel: 'franchescademisana@gmail.com',
    href: 'mailto:franchescademisana@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    accent: '#D4583A',
  },
  {
    id: 'phone',
    label: 'Phone',
    sublabel: '+63 995 729 2810',
    href: 'tel:+639 995 729 2810',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.77-1.77a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    accent: '#D4583A',
  },
]

export default function Contact() {
  const { isPlayful } = useMode()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section
      id="contact"
      ref={ref}
      className="section"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
            >
              Contact
            </span>
          </div>
          {/* EDIT: Update heading to your own voice if you like */}
          <h2
            className="font-display font-bold"
            style={{
              color: 'var(--color-ink)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            Let's build
            <br />
            <em style={{ color: 'var(--color-accent)' }}>something.</em>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* EDIT: Update this copy to describe your availability/situation */}
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              Whether you're looking for a developer who can own a project
              end to end, contribute to a team, or build something new —
              I'm open to hearing about it.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--color-ink-faint)' }}
            >
              Based in the Philippines. Open to remote opportunities.
            </p>

            <div
              className="flex items-center gap-3 mt-8 px-5 py-3 rounded-xl border w-fit"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-bg-alt)',
              }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              {/* EDIT: Change or remove this if you're not available */}
              <span
                className="text-sm font-medium"
                style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-mono)' }}
              >
                Available for new projects
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 gap-4"
          >
            {CONTACT_LINKS.map((link, i) => (
              <motion.a
                key={link.id}
                href={link.href}
                target={link.id !== 'email' && link.id !== 'phone' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredId(link.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="flex items-center gap-5 p-5 rounded-xl border transition-all duration-300"
                style={{
                  borderColor: hoveredId === link.id ? `${link.accent}60` : 'var(--color-border)',
                  backgroundColor: hoveredId === link.id ? `${link.accent}08` : 'var(--color-surface)',
                  textDecoration: 'none',
                }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor: hoveredId === link.id ? `${link.accent}20` : 'var(--color-bg-alt)',
                    color: hoveredId === link.id ? link.accent : 'var(--color-ink-muted)',
                  }}
                >
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-medium text-sm transition-colors duration-300"
                    style={{ color: hoveredId === link.id ? link.accent : 'var(--color-ink)' }}
                  >
                    {link.label}
                  </p>
                  <p
                    className="text-xs mt-0.5 truncate"
                    style={{ color: 'var(--color-ink-faint)', fontFamily: 'var(--font-mono)' }}
                  >
                    {link.sublabel}
                  </p>
                </div>
                <motion.span
                  animate={{ x: hoveredId === link.id ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm"
                  style={{ color: hoveredId === link.id ? link.accent : 'var(--color-ink-faint)' }}
                >
                  →
                </motion.span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}