'use client'

import { notFound } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useCallback } from 'react'
import { getProject } from '@/lib/projects'
import type { ProjectMedia } from '@/lib/projects'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const CATEGORY_ICONS: Record<string, string> = {
  web:    '◈',
  mobile: '◉',
  game:   '◆',
}

/* ══════════════════════════════════════════════════════════════════════
   MediaCarousel (self-contained, reused on detail page)
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
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid var(--color-border)' }}
      onKeyDown={handleKey}
      tabIndex={0}
      aria-label="Project media"
    >
      {/* Main viewport */}
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
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.src}
                alt={item.caption ?? `Screenshot ${current + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Type badge */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-md text-xs"
          style={{
            fontFamily: 'var(--font-mono)',
            backgroundColor: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(8px)',
            color: item.type === 'video' ? accent : '#fff',
            letterSpacing: '0.06em',
          }}
        >
          {item.type === 'video' ? '▶ Video' : '◻ Image'}
        </div>

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
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(6px)',
                color: '#fff',
                cursor: 'pointer',
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = `${accent}CC`)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)')}
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next"
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(6px)',
                color: '#fff',
                cursor: 'pointer',
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = `${accent}CC`)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)')}
            >
              ›
            </button>

            {/* Counter */}
            <div
              className="absolute bottom-3 right-3 text-xs"
              style={{
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(6px)',
                color: '#fff',
                padding: '2px 8px',
                borderRadius: 4,
                letterSpacing: '0.06em',
              }}
            >
              {current + 1} / {media.length}
            </div>
          </>
        )}
      </div>

      {/* Caption */}
      {item.caption && (
        <div
          className="px-4 py-2.5 text-xs"
          style={{
            fontFamily: 'var(--font-mono)',
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
          style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-alt)' }}
        >
          {media.map((m, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                flexShrink: 0,
                width: 64,
                height: 40,
                borderRadius: 6,
                overflow: 'hidden',
                border: `2px solid ${i === current ? accent : 'transparent'}`,
                cursor: 'pointer',
                background: '#111',
                padding: 0,
                transition: 'border-color 0.2s',
              }}
            >
              {m.type === 'video' ? (
                m.poster ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.poster} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: i === current ? accent : '#666' }}>▶</div>
                )
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}


/* ══════════════════════════════════════════════════════════════════════
   Project Page
   ══════════════════════════════════════════════════════════════════════ */
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug)
  if (!project) notFound()

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'var(--color-bg)' }}>
        <article className="max-w-4xl mx-auto px-6 pt-40 pb-24">

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm transition-colors duration-200"
              style={{
                color: 'var(--color-ink-faint)',
                fontFamily: 'var(--font-mono)',
                textDecoration: 'none',
              }}
            >
              ← Back to projects
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase mb-4"
              style={{ color: project.accent, fontFamily: 'var(--font-mono)' }}
            >
              {CATEGORY_ICONS[project.category]} {project.categoryLabel} · {project.year}
            </span>

            <h1
              className="font-display font-bold mb-4"
              style={{
                color: 'var(--color-ink)',
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              {project.title}
            </h1>

            <p
              className="text-xl leading-relaxed mb-8"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              {project.subtitle}
            </p>

            {/* Links */}
            <div className="flex flex-wrap gap-4 mb-12">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border transition-all duration-300"
                  style={{
                    borderColor: 'var(--color-border-strong)',
                    color: 'var(--color-ink)',
                    textDecoration: 'none',
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white transition-all duration-300"
                  style={{ backgroundColor: project.accent, textDecoration: 'none' }}
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </motion.div>

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-12"
          >
            <h2
              className="text-xs font-medium tracking-widest uppercase mb-4"
              style={{ color: 'var(--color-ink-faint)', fontFamily: 'var(--font-mono)' }}
            >
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
          </motion.div>

          {/* ── Media carousel ── */}
          {project.media && project.media.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h2
                className="text-xs font-medium tracking-widest uppercase mb-4"
                style={{ color: 'var(--color-ink-faint)', fontFamily: 'var(--font-mono)' }}
              >
                Media
              </h2>
              <MediaCarousel media={project.media} accent={project.accent} />
            </motion.div>
          )}

          {/* Long description */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-12"
          >
            <h2
              className="font-display font-semibold text-2xl mb-6"
              style={{ color: 'var(--color-ink)', letterSpacing: '-0.02em' }}
            >
              Overview
            </h2>
            <div
              className="space-y-4 text-base leading-relaxed"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              {project.longDescription.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2
              className="font-display font-semibold text-2xl mb-6"
              style={{ color: 'var(--color-ink)', letterSpacing: '-0.02em' }}
            >
              Key Highlights
            </h2>
            <ul className="space-y-4">
              {project.highlights.map((highlight, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.05, duration: 0.4 }}
                  className="flex items-start gap-4 p-4 rounded-xl border"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-bg-alt)',
                  }}
                >
                  <span
                    className="text-sm font-mono mt-0.5"
                    style={{ color: project.accent, flexShrink: 0 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    {highlight}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </article>
      </main>
      <Footer />
    </>
  )
}