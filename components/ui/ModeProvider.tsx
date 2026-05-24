'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Mode = 'professional' | 'playful'

interface ModeContextValue {
  mode: Mode
  toggleMode: () => void
  isPlayful: boolean
}

const ModeContext = createContext<ModeContextValue>({
  mode: 'professional',
  toggleMode: () => {},
  isPlayful: false,
})

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('professional')

  const toggleMode = () => {
    setMode(prev => prev === 'professional' ? 'playful' : 'professional')
  }

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-mode',
      mode === 'playful' ? 'playful' : 'professional'
    )
  }, [mode])

  return (
    <ModeContext.Provider value={{ mode, toggleMode, isPlayful: mode === 'playful' }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  return useContext(ModeContext)
}
