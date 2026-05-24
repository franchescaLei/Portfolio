'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useMode } from '@/components/ui/ModeProvider'

const SKILLS = {
  'Languages':  ['TypeScript', 'C#', 'Kotlin', 'Python', 'SQL'],
  'Web & API':  ['React', 'Next.js', 'Node.js', 'ASP.NET Core', 'REST', 'SignalR', 'Scalar'],
  'Mobile':     ['Android (Native)', 'Kotlin', 'Firebase', 'MVVM'],
  'Game Dev':   ['Unity', 'C#', 'ScriptableObjects', 'Unity Physics'],
  'Data':       ['SQL Server', 'Entity Framework', 'Firestore', 'PostgreSQL'],
  'Tools':      ['Git', 'Vercel', 'Render', 'Figma', 'Postman', 'Scalar'],
}

const STATS = [
  { value: '3+', label: 'Years building' },
  { value: '3',  label: 'Domains' },
  { value: '∞',  label: 'Curiosity' },
]

export default function About() {
  const { isPlayful, isMinimal } = useMode()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  }
  const itemVariants = {
    hidden:   { opacity: 0, y: 24 },
    visible:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }

  /* ─── Minimal layout ─────────────────────────────────────────────── */
  if (isMinimal) {
    return (
      <section
        id="about"
        ref={ref}
        className="section"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Header row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-baseline justify-between mb-12"
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--weight-display)' as any,
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
                lineHeight: 1,
              }}
            >
              About
            </h2>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-faint)',
              }}
            >
              §01
            </span>
          </motion.div>

          {/* Hairline */}
          <div style={{ height: '1px', background: 'var(--color-border-strong)', marginBottom: '48px' }} />

          {/* Two-col body */}
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16">
            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-5"
            >
              <p style={{ color: 'var(--color-ink)', lineHeight: 1.7 }}>
                I'm a software developer who builds things end to end — from production
                backend APIs to native mobile apps to 3D game worlds. Not because I'm
                trying to do everything, but because I genuinely find all of it interesting.
              </p>
              <p style={{ color: 'var(--color-ink-muted)', lineHeight: 1.7 }}>
                I care equally about engineering quality and user experience. A well-architected
                system that's painful to use is only halfway done.
              </p>
              <p style={{ color: 'var(--color-ink-muted)', lineHeight: 1.7 }}>
                My work spans real-time collaboration platforms, mobile social apps, and
                systems-driven game design. Each domain teaches something the others don't.
              </p>

              {/* Stats: horizontal rule style */}
              <div className="flex gap-10 pt-8" style={{ borderTop: '1px solid var(--color-border-strong)' }}>
                {STATS.map(stat => (
                  <div key={stat.label}>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '2.5rem',
                        letterSpacing: '-0.04em',
                        color: 'var(--color-ink)',
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--color-ink-faint)',
                        marginTop: '6px',
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: skills as rows */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ink-faint)',
                  marginBottom: '16px',
                }}
              >
                Tech I work with
              </p>
              <div>
                {Object.entries(SKILLS).map(([category, items], i) => (
                  <div
                    key={category}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '100px 1fr',
                      gap: '16px',
                      alignItems: 'start',
                      padding: '12px 0',
                      borderTop: '1px solid var(--color-border)',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--color-accent)',
                        paddingTop: '2px',
                      }}
                    >
                      {category}
                    </p>
                    <p style={{ color: 'var(--color-ink-muted)', fontSize: '13px', lineHeight: 1.8 }}>
                      {items.join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  /* ─── Default layout (professional + playful) ─────────────────────── */
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
              <p className="text-lg leading-relaxed" style={{ color: 'var(--color-ink)' }}>
                I'm a software developer who builds things end to end — from
                production backend APIs to native mobile apps to 3D game worlds.
                Not because I'm trying to do everything, but because I genuinely
                find all of it interesting.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                I care equally about engineering quality and user experience.
                A well-architected system that's painful to use is only halfway
                done. I think about both sides — the code structure and the
                person sitting in front of it.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                My work spans real-time collaboration platforms, mobile social
                apps, and systems-driven game design. Each domain teaches
                something the others don't.
              </p>

              {/* Stats row */}
              <div className="flex gap-8 pt-4">
                {STATS.map(stat => (
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
                        <li key={skill} className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
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