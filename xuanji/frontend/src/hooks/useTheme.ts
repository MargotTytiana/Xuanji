'use client'
import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

const STORAGE_KEY = 'xuanji-theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark')

  // Read persisted preference on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    const preferred = stored ?? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    apply(preferred)
    setTheme(preferred)
  }, [])

  function apply(t: Theme) {
    document.documentElement.setAttribute('data-theme', t)
    localStorage.setItem(STORAGE_KEY, t)
  }

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    apply(next)
    setTheme(next)
  }

  return { theme, toggle, isDark: theme === 'dark' }
}