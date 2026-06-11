'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useMode } from '@/components/ui/ModeProvider'
import { projects } from '@/lib/projects'
import type { Project, ProjectMedia } from '@/lib/projects'

const CATEGORY_ICONS: Record<string, string> = {
  web:    '◈',
  mobile: '◉',
  game:   '◆',
}

/* ══════════════════════════════════════════════════════════════════════
   MediaCarousel
   ══════════════════════════════════════════════════════════════════════ */
function MediaCarousel({ media, accent }: { media: ProjectMedia[]; accent: string }) {
  const [current, setCurrent] = useState(0)

  const prev = useCallback(() => setCurrent(i => (i - 1 + media.length) % media.length), [media.length])
  const next = useCallback(() => setCurrent(i => (i + 1) % media.length), [media.length])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  const item = media[current]

  return (
    /* Constrain carousel to ~70% of card width, centered */
    <div style={{ maxWidth: '72%', margin: '0 auto' }}>
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: `1px solid var(--color-border)` }}
        onKeyDown={handleKey}
        tabIndex={0}
        aria-label="Project media carousel"
      >
        {/* Main media area */}
        <div
          className="relative w-full"
          style={{ backgroundColor: '#000', aspectRatio: '16/9' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  poster={item.poster}
                  controls
                  playsInline
                  preload="metadata"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={item.src}
                  alt={item.caption ?? `Project screenshot ${current + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Type badge */}
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-mono"
            style={{
              backgroundColor: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(8px)',
              color: item.type === 'video' ? accent : '#fff',
              letterSpacing: '0.06em',
            }}
          >
            {item.type === 'video' ? '▶ Video' : '◻ Image'}
          </div>

          {/* Prev / Next arrows */}
          {media.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous"
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 34,
                  height: 34,
                  borderRadius: 6,
                  border: `1px solid rgba(255,255,255,0.18)`,
                  backgroundColor: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(8px)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: 0,
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = `${accent}CC`
                  e.currentTarget.style.borderColor = accent
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.55)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
                }}
              >
                ←
              </button>
              <button
                onClick={next}
                aria-label="Next"
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 34,
                  height: 34,
                  borderRadius: 6,
                  border: `1px solid rgba(255,255,255,0.18)`,
                  backgroundColor: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(8px)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: 0,
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = `${accent}CC`
                  e.currentTarget.style.borderColor = accent
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.55)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
                }}
              >
                →
              </button>
            </>
          )}

          {/* Counter */}
          {media.length > 1 && (
            <div
              className="absolute bottom-3 right-3 text-xs font-mono"
              style={{
                backgroundColor: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(6px)',
                color: '#fff',
                padding: '2px 8px',
                borderRadius: 4,
                letterSpacing: '0.06em',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {current + 1} / {media.length}
            </div>
          )}
        </div>

        {/* Caption */}
        {item.caption && (
          <div
            className="px-4 py-2.5 text-xs font-mono"
            style={{
              color: 'var(--color-ink-faint)',
              borderTop: '1px solid var(--color-border)',
              letterSpacing: '0.04em',
            }}
          >
            {item.caption}
          </div>
        )}

        {/* Thumbnail strip */}
        {media.length > 1 && (
          <div
            className="flex gap-2 px-4 py-3 overflow-x-auto"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            {media.map((m, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  flexShrink: 0,
                  width: 52,
                  height: 34,
                  borderRadius: 5,
                  overflow: 'hidden',
                  border: `2px solid ${i === current ? accent : 'transparent'}`,
                  cursor: 'pointer',
                  background: '#000',
                  padding: 0,
                  transition: 'border-color 0.2s',
                  opacity: i === current ? 1 : 0.55,
                }}
              >
                {m.type === 'video' ? (
                  m.poster ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={m.poster}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13,
                        color: i === current ? accent : '#666',
                      }}
                    >
                      ▶
                    </div>
                  )
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={m.src}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


/* ══════════════════════════════════════════════════════════════════════
   Projects (main section)
   ══════════════════════════════════════════════════════════════════════ */
export default function Projects() {
  const { isPlayful} = useMode()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      id="projects"
      ref={ref}
      className="section"
      style={{ backgroundColor: 'var(--color-bg-alt)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
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
              Projects
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="font-display font-bold"
              style={{
                color: 'var(--color-ink)',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              Featured
              <br />
              <em style={{ color: 'var(--color-accent)' }}>work.</em>
            </h2>
            <p
              className="max-w-xs text-sm leading-relaxed md:text-right"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              Three domains. Three real applications. Each one built to production standards.
            </p>
          </div>
        </motion.div>

        {/* Project cards */}
        <div className="space-y-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              inView={inView}
              isHovered={hoveredIndex === i}
              onHover={() => setHoveredIndex(i)}
              onLeave={() => setHoveredIndex(null)}
              isPlayful={isPlayful}
              dimmed={hoveredIndex !== null && hoveredIndex !== i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}


/* ══════════════════════════════════════════════════════════════════════
   MinimalProjectRow — editorial list-row layout
   ══════════════════════════════════════════════════════════════════════ */
function MinimalProjectRow({
  project,
  index,
  inView,
}: {
  project: Project
  index: number
  inView: boolean
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'grid',
          gridTemplateColumns: '40px 1fr auto',
          gap: '24px',
          alignItems: 'center',
          padding: '24px 0',
          borderBottom: '1px solid var(--color-border)',
          cursor: 'pointer',
        }}
        role="button"
        aria-expanded={expanded}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: 'var(--color-ink-faint)',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <div>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: 'var(--color-ink)',
              lineHeight: 1,
              marginBottom: '6px',
            }}
          >
            {project.title}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: project.accent,
              }}
            >
              {project.categoryLabel}
            </span>
            <span style={{ color: 'var(--color-border-strong)' }}>·</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-faint)',
              }}
            >
              {project.year}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-faint)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-ink-faint)')}
            >
              GH ↗
            </a>
          )}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              color: 'var(--color-ink-faint)',
              transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: 'transform 0.25s ease',
              display: 'inline-block',
            }}
          >
            +
          </span>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '32px 0 40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {project.media && project.media.length > 0 && (
                <MediaCarousel media={project.media} accent={project.accent} />
              )}

              <div className="grid lg:grid-cols-[1fr_1fr] gap-12">
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--color-ink-faint)',
                      marginBottom: '12px',
                    }}
                  >
                    Overview
                  </p>
                  <p style={{ color: 'var(--color-ink-muted)', lineHeight: 1.7, fontSize: '14px' }}>
                    {project.description}
                  </p>

                  <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {project.stack.map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--color-ink-faint)',
                      marginBottom: '12px',
                    }}
                  >
                    Key Highlights
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {project.highlights.map((h, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '16px 1fr',
                          gap: '10px',
                          fontSize: '13px',
                          color: 'var(--color-ink-muted)',
                          lineHeight: 1.6,
                          borderTop: i === 0 ? 'none' : '1px solid var(--color-border)',
                          paddingTop: i === 0 ? 0 : '10px',
                        }}
                      >
                        <span style={{ color: project.accent, fontFamily: 'var(--font-mono)', fontSize: '11px', marginTop: '2px' }}>›</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}


/* ══════════════════════════════════════════════════════════════════════
   ProjectCard — default (professional + playful) card layout
   ══════════════════════════════════════════════════════════════════════ */
function ProjectCard({
  project,
  index,
  inView,
  isHovered,
  onHover,
  onLeave,
  isPlayful,
  dimmed,
}: {
  project: Project
  index: number
  inView: boolean
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  isPlayful: boolean
  dimmed: boolean
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: dimmed ? 0.5 : 1, y: 0 } : { opacity: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.25 },
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group relative rounded-2xl border overflow-hidden cursor-pointer"
      style={{
        borderColor: isHovered ? `${project.accent}50` : 'var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        boxShadow: isHovered
          ? `0 20px 60px -10px ${project.accent}20`
          : '0 2px 12px rgba(0,0,0,0.04)',
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Top stripe accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: project.accent, transformOrigin: 'left' }}
      />

      <div className="p-8 md:p-10">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center gap-1 pt-1 min-w-[2.5rem]">
              <span
                className="text-3xl font-display font-bold"
                style={{ color: `${project.accent}60`, lineHeight: 1 }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <div>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase mb-2"
                style={{ color: project.accent, fontFamily: 'var(--font-mono)' }}
              >
                {CATEGORY_ICONS[project.category]} {project.categoryLabel}
              </span>
              <h3
                className="font-display font-bold text-2xl md:text-3xl"
                style={{ color: 'var(--color-ink)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
              >
                {project.title}
              </h3>
              <p
                className="text-sm mt-1"
                style={{ color: 'var(--color-ink-faint)', fontFamily: 'var(--font-mono)' }}
              >
                {project.year} · {project.status}
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 md:flex-shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-2 text-xs px-4 py-2 rounded-full border transition-all duration-200"
                style={{
                  borderColor: 'var(--color-border-strong)',
                  color: 'var(--color-ink-muted)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                GitHub ↗
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-2 text-xs px-4 py-2 rounded-full text-white transition-all duration-200"
                style={{ backgroundColor: project.accent, fontFamily: 'var(--font-mono)' }}
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p
          className="text-base leading-relaxed mb-6 max-w-3xl"
          style={{ color: 'var(--color-ink-muted)' }}
        >
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map(tech => (
            <span
              key={tech}
              className="tech-tag"
              style={{ borderColor: isHovered ? `${project.accent}40` : undefined }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Expand toggle */}
        <motion.button
          className="flex items-center gap-2 text-xs font-medium"
          style={{ color: project.accent, fontFamily: 'var(--font-mono)' }}
          onClick={e => { e.stopPropagation(); setExpanded(!expanded) }}
        >
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            ↓
          </motion.span>
          {expanded ? 'Show less' : 'Media & highlights'}
        </motion.button>

        {/* Expandable section */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t space-y-6" style={{ borderColor: 'var(--color-border)' }}>

                {/* ── Media carousel ── */}
                {project.media && project.media.length > 0 && (
                  <div onClick={e => e.stopPropagation()}>
                    <p
                      className="text-xs font-mono mb-3"
                      style={{ color: 'var(--color-ink-faint)', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                    >
                      Media
                    </p>
                    <MediaCarousel media={project.media} accent={project.accent} />
                  </div>
                )}

                {/* ── Highlights ── */}
                <div>
                  <p
                    className="text-xs font-mono mb-3"
                    style={{ color: 'var(--color-ink-faint)', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                  >
                    Key Highlights
                  </p>
                  <ul className="space-y-3">
                    {project.highlights.map((highlight, hi) => (
                      <motion.li
                        key={hi}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: hi * 0.04, duration: 0.35 }}
                        className="flex items-start gap-3 text-sm"
                        style={{ color: 'var(--color-ink-muted)' }}
                      >
                        <span style={{ color: project.accent, flexShrink: 0, marginTop: '2px' }}>›</span>
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Playful: corner dot */}
      {isPlayful && (
        <div
          className="absolute top-4 right-4 w-2 h-2 rounded-full"
          style={{ backgroundColor: project.accent }}
        />
      )}
    </motion.article>
  )
}