'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useMode } from '@/components/ui/ModeProvider'

const SKILLS = {
  'Languages': ['TypeScript', 'C#', 'Kotlin', 'Python', 'SQL'],
  'Web & API': ['React', 'Next.js', 'ASP.NET Core', 'REST', 'SignalR'],
  'Mobile': ['Android (Native)', 'Kotlin', 'Firebase', 'Jetpack'],
  'Game Dev': ['Unity', 'C#', 'ScriptableObjects', 'Unity Physics'],
  'Data': ['SQL Server', 'Entity Framework', 'Firestore', 'PostgreSQL'],
  'Tools': ['Git', 'Vercel', 'Render', 'Figma', 'Postman'],
}

export default function About() {
  const { isPlayful } = useMode()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section
      id="about"
      ref={ref}
      className="section"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
              <span
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
              >
                About
              </span>
            </div>
            <h2
              className="font-display font-bold"
              style={{
                color: 'var(--color-ink)',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              Building across
              <br />
              <em style={{ color: 'var(--color-accent)' }}>the whole stack.</em>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_1fr] gap-16">
            {/* Text */}
            <motion.div variants={itemVariants} className="space-y-5">
              <p
                className="text-lg leading-relaxed"
                style={{ color: 'var(--color-ink)' }}
              >
                I'm a software developer who builds things end to end — from 
                production backend APIs to native mobile apps to 3D game worlds. 
                Not because I'm trying to do everything, but because I genuinely 
                find all of it interesting.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--color-ink-muted)' }}
              >
                I care equally about engineering quality and user experience. 
                A well-architected system that's painful to use is only halfway 
                done. I think about both sides — the code structure and the 
                person sitting in front of it.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--color-ink-muted)' }}
              >
                My work spans real-time collaboration platforms, mobile social 
                apps, and systems-driven game design. Each domain teaches 
                something the others don't — games taught me to think about 
                feedback loops; mobile taught me to respect constraints; 
                backend work taught me that correctness and performance 
                aren't optional.
              </p>

              {/* Stats row */}
              <div className="flex gap-8 pt-4">
                {[
                  { value: '3+', label: 'Years building' },
                  { value: '3', label: 'Domains' },
                  { value: '∞', label: 'Curiosity' },
                ].map(stat => (
                  <div key={stat.label}>
                    <p
                      className="font-display text-4xl font-bold"
                      style={{ color: 'var(--color-ink)', letterSpacing: '-0.03em' }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-xs uppercase tracking-widest mt-1"
                      style={{ color: 'var(--color-ink-faint)', fontFamily: 'var(--font-mono)' }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills grid */}
            <motion.div variants={itemVariants}>
              <h3
                className="text-xs font-medium tracking-widest uppercase mb-6"
                style={{ color: 'var(--color-ink-faint)', fontFamily: 'var(--font-mono)' }}
              >
                Tech I work with
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                {Object.entries(SKILLS).map(([category, items]) => (
                  <div key={category}>
                    <p
                      className="text-xs font-medium mb-3 pb-2 border-b"
                      style={{
                        color: 'var(--color-accent)',
                        fontFamily: 'var(--font-mono)',
                        borderColor: 'var(--color-border)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {category}
                    </p>
                    <ul className="space-y-1.5">
                      {items.map(skill => (
                        <li
                          key={skill}
                          className="text-sm"
                          style={{ color: 'var(--color-ink-muted)' }}
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
