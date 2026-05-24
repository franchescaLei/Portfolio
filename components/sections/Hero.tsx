'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMode } from '@/components/ui/ModeProvider'

const TITLES = ['Full-Stack Developer', 'Mobile App Developer', 'Game Developer']

export default function Hero() {
  const { isPlayful } = useMode()
  const [titleIndex, setTitleIndex] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex(prev => (prev + 1) % TITLES.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isPlayful) return
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [isPlayful])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {!isPlayful && (
        <motion.div
          className="absolute top-1/4 right-0 w-[40vw] h-[40vw] max-w-xl rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{ x: mousePos.x * 0.3, y: mousePos.y * 0.3 }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        />
      )}

      {isPlayful && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            opacity: 0.4,
          }}
        />
      )}

      <div className="max-w-6xl mx-auto px-6 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
              <span
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
              >
                Portfolio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold leading-none mb-4"
              style={{
                color: 'var(--color-ink)',
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Franchesca Lei
              <br />
              <span style={{ color: 'var(--color-accent)' }}>Demisana</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 h-10 flex items-center"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={titleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display italic font-normal"
                  style={{
                    color: 'var(--color-ink-muted)',
                    fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {TITLES[titleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl text-lg leading-relaxed mb-10"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              I build software across the full spectrum — production APIs,
              native mobile apps, and immersive games. Engineering quality
              and design craft, not either/or.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm transition-all duration-300 hover:gap-3"
                style={{
                  backgroundColor: 'var(--color-ink)',
                  color: 'var(--color-bg)',
                }}
              >
                View Projects
                <span>→</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm border transition-all duration-300"
                style={{
                  borderColor: 'var(--color-border-strong)',
                  color: 'var(--color-ink)',
                }}
              >
                Get in Touch
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-2 mt-10"
            >
              {[
                { label: 'Web', icon: '◈' },
                { label: 'Mobile', icon: '◉' },
                { label: 'Games', icon: '◆' },
                { label: 'Backend', icon: '◫' },
              ].map(item => (
                <span key={item.label} className="tech-tag">
                  {item.icon} {item.label}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, x: mousePos.x * 0.1, y: mousePos.y * 0.1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <PhotoFrame isPlayful={isPlayful} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: 'var(--color-ink-faint)', fontFamily: 'var(--font-mono)' }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10"
            style={{
              background: 'linear-gradient(to bottom, var(--color-accent), transparent)',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}

function PhotoFrame({ isPlayful }: { isPlayful: boolean }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative w-72 h-80">
      {/* Decorative frame */}
      <div
        className="absolute inset-0 rounded-2xl border-2 translate-x-3 translate-y-3"
        style={{ borderColor: 'var(--color-accent)', opacity: 0.4 }}
      />

      {/* Photo container */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden border-2"
        style={{ borderColor: 'var(--color-border-strong)' }}
        onMouseEnter={() => isPlayful && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Default image */}
        <img
          src="/images/profile.jpg"
          alt="Your Name"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            position: 'absolute',
            inset: 0,
            transition: 'opacity 0.35s ease',
            opacity: isHovered ? 0 : 1,
          }}
        />

        {/* Hover image — playful mode only */}
        {isPlayful && (
          <img
            src="/images/profile-hover.jpg"
            alt="alternate"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              position: 'absolute',
              inset: 0,
              transition: 'opacity 0.35s ease',
              opacity: isHovered ? 1 : 0,
            }}
          />
        )}

        {/* Scanline overlay — playful mode only */}
        {isPlayful && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(155, 74, 255, 0.05) 2px,
                rgba(155, 74, 255, 0.05) 4px
              )`,
              zIndex: 10,
            }}
          />
        )}

        {/* Hover label — playful mode only */}
        {isPlayful && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '8px 12px',
              background: 'rgba(155, 74, 255, 0.75)',
              backdropFilter: 'blur(4px)',
              transition: 'opacity 0.35s ease',
              opacity: isHovered ? 1 : 0,
              zIndex: 20,
              textAlign: 'center',
            }}
          >
            <span style={{
              color: '#fff',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              ✦ surprise
            </span>
          </div>
        )}
      </div>

      {/* Floating badge */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl border shadow-lg"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <p className="text-xs font-medium" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-mono)' }}>
          ✦ Available for work
        </p>
      </motion.div>
    </div>
  )
}