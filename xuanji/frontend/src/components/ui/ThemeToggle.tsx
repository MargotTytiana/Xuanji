'use client'
import { useTheme } from '@/hooks/useTheme'

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme()

  return (
    <button onClick={toggle} style={{
      background: 'none', border: '1px solid var(--border)',
      color: 'var(--text-dim)', cursor: 'pointer',
      fontFamily: 'inherit', fontSize: '0.72rem', letterSpacing: '0.1em',
      padding: '0.4rem 0.85rem', borderRadius: '2px',
      display: 'flex', alignItems: 'center', gap: '0.4rem',
      transition: 'all var(--transition)',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-dim)' }}
    >
      {isDark ? '🌙' : '☀️'}
      <span>{isDark ? '暗色' : '亮色'}</span>
    </button>
  )
}