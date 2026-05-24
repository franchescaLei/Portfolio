'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Mode = 'professional' | 'playful'

interface ModeContextValue {
  mode: Mode
  cycleMode: () => void
  isPlayful: boolean
}

const ModeContext = createContext<ModeContextValue>({
  mode: 'professional',
  cycleMode: () => {},
  isPlayful: false,
})

const CYCLE: Mode[] = ['professional', 'playful']

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('professional')

  const cycleMode = () => {
    setMode(prev => {
      const idx = CYCLE.indexOf(prev)
      return CYCLE[(idx + 1) % CYCLE.length]
    })
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode)
  }, [mode])

  return (
    <ModeContext.Provider
      value={{
        mode,
        cycleMode,
        isPlayful: mode === 'playful',
      }}
    >
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  return useContext(ModeContext)
}