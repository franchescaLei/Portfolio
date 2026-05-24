'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer
      className="py-8 border-t"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p
          className="text-sm"
          style={{ color: 'var(--color-ink-faint)', fontFamily: 'var(--font-mono)' }}
        >
          © {new Date().getFullYear()} Your Name. Designed & built with care.
        </p>
        <div className="flex items-center gap-6">
          {[
            { label: 'GitHub', href: 'https://github.com/yourusername' },
            { label: 'Email', href: 'mailto:your@email.com' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors duration-200"
              style={{
                color: 'var(--color-ink-faint)',
                fontFamily: 'var(--font-mono)',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-ink-faint)')}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
