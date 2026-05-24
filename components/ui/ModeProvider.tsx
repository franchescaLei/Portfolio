'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Mode = 'professional' | 'playful' | 'minimal'

interface ModeContextValue {
  mode: Mode
  cycleMode: () => void
  isPlayful: boolean
  isMinimal: boolean
}

const ModeContext = createContext<ModeContextValue>({
  mode: 'professional',
  cycleMode: () => {},
  isPlayful: false,
  isMinimal: false,
})

const CYCLE: Mode[] = ['professional', 'playful', 'minimal']

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('professional')

  const cycleMode = () => {
    setMode(prev => {
      const idx = CYCLE.indexOf(prev)
      return CYCLE[(idx + 1) % CYCLE.length]
    })
  }

  // Keep backward-compat: toggleMode === cycleMode
  const toggleMode = cycleMode

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode)
  }, [mode])

  return (
    <ModeContext.Provider
      value={{
        mode,
        cycleMode,
        isPlayful: mode === 'playful',
        isMinimal: mode === 'minimal',
      }}
    >
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  return useContext(ModeContext)
}