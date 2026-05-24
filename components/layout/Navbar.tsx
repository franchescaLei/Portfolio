'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMode, type Mode } from '@/components/ui/ModeProvider'
import { cn } from '@/lib/utils'

const MODE_NEXT_LABEL: Record<Mode, string> = {
  professional: '✦ Spice It Up',
  playful:      '◻ Go Minimal',
  minimal:      '◈ Professional',
}

export default function Navbar() {
  const { mode, cycleMode, isMinimal } = useMode()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'About',    href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact',  href: '#contact' },
  ]

  /* ── Minimal navbar: stark top bar with full-width border ── */
  if (isMinimal) {
    return (
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: 'var(--color-bg)',
          borderBottom: scrolled ? '1px solid var(--color-border-strong)' : '1px solid transparent',
          transition: 'border-color 0.3s ease',
        }}
      >
        <div
          className="max-w-6xl mx-auto px-6 flex items-center justify-between"
          style={{ height: '52px' }}
        >
          {/* Logo: mono, all-caps, minimal */}
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-ink)',
              textDecoration: 'none',
            }}
          >
            YN<span style={{ color: 'var(--color-accent)' }}>.</span>
          </a>

          {/* Desktop nav: all caps, tracked, hairline */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ink-faint)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-ink)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-ink-faint)')}
              >
                {link.label}
              </a>
            ))}
            <MinimalModeButton label={MODE_NEXT_LABEL[mode]} onClick={cycleMode} />
          </nav>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <MinimalModeButton label={MODE_NEXT_LABEL[mode]} onClick={cycleMode} compact />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: 'var(--color-ink)', background: 'none', border: 'none', cursor: 'pointer' }}
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span
                  className={cn('block h-px transition-all duration-300', menuOpen ? 'rotate-45 translate-y-2' : '')}
                  style={{ background: 'var(--color-ink)' }}
                />
                <span
                  className={cn('block h-px transition-all duration-300', menuOpen ? 'opacity-0' : '')}
                  style={{ background: 'var(--color-ink)' }}
                />
                <span
                  className={cn('block h-px transition-all duration-300', menuOpen ? '-rotate-45 -translate-y-2' : '')}
                  style={{ background: 'var(--color-ink)' }}
                />
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                overflow: 'hidden',
                borderTop: '1px solid var(--color-border-strong)',
                backgroundColor: 'var(--color-bg)',
              }}
            >
              <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--color-ink-muted)',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    )
  }

  /* ── Default navbar (professional + playful) ── */
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'py-3 backdrop-blur-xl border-b' : 'py-6',
      )}
      style={{
        backgroundColor: scrolled
          ? 'color-mix(in srgb, var(--color-bg) 85%, transparent)'
          : 'transparent',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-display text-lg font-semibold tracking-tight"
          style={{ color: 'var(--color-ink)' }}
        >
          <span style={{ color: 'var(--color-accent)' }}>Y</span>our Name
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors duration-200 hover:opacity-70"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-ink-muted)' }}
            >
              {link.label}
            </a>
          ))}
          <ModeToggleButton label={MODE_NEXT_LABEL[mode]} onToggle={cycleMode} />
        </nav>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <ModeToggleButton label={MODE_NEXT_LABEL[mode]} onToggle={cycleMode} compact />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg transition-colors"
            style={{ color: 'var(--color-ink)' }}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={cn('block h-0.5 rounded-full transition-all duration-300', menuOpen ? 'rotate-45 translate-y-1.5' : '')}
                style={{ background: 'var(--color-ink)' }}
              />
              <span
                className={cn('block h-0.5 rounded-full transition-all duration-300', menuOpen ? 'opacity-0 translate-x-2' : '')}
                style={{ background: 'var(--color-ink)' }}
              />
              <span
                className={cn('block h-0.5 rounded-full transition-all duration-300', menuOpen ? '-rotate-45 -translate-y-2.5' : '')}
                style={{ background: 'var(--color-ink)' }}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t"
            style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
          >
            <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium py-1"
                  style={{ color: 'var(--color-ink-muted)' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

/* ── Default mode toggle button ── */
function ModeToggleButton({
  label,
  onToggle,
  compact = false,
}: {
  label: string
  onToggle: () => void
  compact?: boolean
}) {
  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'relative flex items-center gap-2 rounded-full border font-mono text-xs font-medium',
        'transition-all duration-300',
        compact ? 'px-3 py-1.5' : 'px-4 py-2',
      )}
      style={{
        borderColor: 'var(--color-accent)',
        color: 'var(--color-accent)',
        background: 'transparent',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {label}
    </motion.button>
  )
}

/* ── Minimal mode toggle button: square, no radius ── */
function MinimalModeButton({
  label,
  onClick,
  compact = false,
}: {
  label: string
  onClick: () => void
  compact?: boolean
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '9px',
        fontWeight: 500,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--color-ink-faint)',
        border: '1px solid var(--color-border-strong)',
        background: 'none',
        padding: compact ? '4px 8px' : '5px 12px',
        cursor: 'pointer',
        borderRadius: 0,
        transition: 'color 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = 'var(--color-accent)'
        e.currentTarget.style.borderColor = 'var(--color-accent)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'var(--color-ink-faint)'
        e.currentTarget.style.borderColor = 'var(--color-border-strong)'
      }}
    >
      {label}
    </button>
  )
}