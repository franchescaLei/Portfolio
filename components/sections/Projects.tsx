'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useMode } from '@/components/ui/ModeProvider'
import { projects } from '@/lib/projects'
import type { Project } from '@/lib/projects'

const CATEGORY_ICONS: Record<string, string> = {
  web: '◈',
  mobile: '◉',
  game: '◆',
}

export default function Projects() {
  const { isPlayful } = useMode()
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
        borderColor: isHovered
          ? `${project.accent}50`
          : 'var(--color-border)',
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
            {/* Index + category */}
            <div className="flex flex-col items-center gap-1 pt-1 min-w-[2.5rem]">
              <span
                className="text-3xl font-display font-bold"
                style={{ color: `${project.accent}60`, lineHeight: 1 }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <div>
              {/* Category pill */}
              <span
                className="inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase mb-2"
                style={{ color: project.accent, fontFamily: 'var(--font-mono)' }}
              >
                {CATEGORY_ICONS[project.category]} {project.categoryLabel}
              </span>
              <h3
                className="font-display font-bold text-2xl md:text-3xl"
                style={{
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
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
                className="flex items-center gap-2 text-xs px-4 py-2 rounded-full border transition-all duration-200 hover:border-current"
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
                style={{
                  backgroundColor: project.accent,
                  fontFamily: 'var(--font-mono)',
                }}
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
              style={{
                borderColor: isHovered ? `${project.accent}40` : undefined,
              }}
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
          {expanded ? 'Show less' : 'Key highlights'}
        </motion.button>

        {/* Expandable highlights */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <ul className="space-y-3">
                  {project.highlights.map((highlight, hi) => (
                    <motion.li
                      key={hi}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: hi * 0.05, duration: 0.4 }}
                      className="flex items-start gap-3 text-sm"
                      style={{ color: 'var(--color-ink-muted)' }}
                    >
                      <span style={{ color: project.accent, flexShrink: 0, marginTop: '2px' }}>
                        ›
                      </span>
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Playful mode: corner accent */}
      {isPlayful && (
        <div
          className="absolute top-4 right-4 w-2 h-2 rounded-full"
          style={{ backgroundColor: project.accent }}
        />
      )}
    </motion.article>
  )
}
