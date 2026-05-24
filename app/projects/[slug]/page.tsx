'use client'

import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { getProject } from '@/lib/projects'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const CATEGORY_ICONS: Record<string, string> = {
  web: '◈',
  mobile: '◉',
  game: '◆',
}

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

          {/* Long description */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
