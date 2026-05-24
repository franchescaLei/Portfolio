'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMode, type Mode } from '@/components/ui/ModeProvider'
import { cn } from '@/lib/utils'

const MODE_NEXT_LABEL: Record<Mode, string> = {
  professional: '✦ Spice It Up',
  playful: '◈ Professional',
}

export default function Navbar() {
  const { mode, cycleMode } = useMode()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

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
        <a
          href="#"
          className="font-display text-lg font-semibold tracking-tight"
          style={{ color: 'var(--color-ink)' }}
        >
          <span style={{ color: 'var(--color-accent)' }}>Y</span>our Name
        </a>

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
                className={cn(
                  'block h-0.5 rounded-full transition-all duration-300',
                  menuOpen ? 'rotate-45 translate-y-1.5' : '',
                )}
                style={{ background: 'var(--color-ink)' }}
              />
              <span
                className={cn(
                  'block h-0.5 rounded-full transition-all duration-300',
                  menuOpen ? 'opacity-0 translate-x-2' : '',
                )}
                style={{ background: 'var(--color-ink)' }}
              />
              <span
                className={cn(
                  'block h-0.5 rounded-full transition-all duration-300',
                  menuOpen ? '-rotate-45 -translate-y-2.5' : '',
                )}
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
            style={{
              backgroundColor: 'var(--color-bg)',
              borderColor: 'var(--color-border)',
            }}
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
        'relative flex items-center gap-2 rounded-full border font-mono text-xs font-medium transition-all duration-300',
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