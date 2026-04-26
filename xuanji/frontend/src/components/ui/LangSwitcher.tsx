'use client'
import { useState } from 'react'
import type { Lang } from '@/types'

const LANGS: { code: Lang; label: string }[] = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'EN'  },
  { code: 'ja', label: '日本語' },
]

export default function LangSwitcher() {
  const [open, setOpen]       = useState(false)
  const [current, setCurrent] = useState<Lang>('zh')

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        background: 'none', border: '1px solid var(--border)',
        color: 'var(--text-dim)', cursor: 'pointer', fontFamily: 'inherit',
        fontSize: '0.72rem', letterSpacing: '0.1em',
        padding: '0.4rem 0.85rem', borderRadius: '2px',
        display: 'flex', alignItems: 'center', gap: '0.4rem',
        transition: 'all var(--transition)',
      }}>
        🌐 <span>{LANGS.find(l => l.code === current)?.label}</span>
      </button>

      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 98 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'absolute', top: 'calc(100% + 8px)', right: 0, zIndex: 99,
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', overflow: 'hidden', minWidth: 120,
          }}>
            {LANGS.map(l => (
              <button key={l.code} onClick={() => { setCurrent(l.code); setOpen(false) }} style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '0.6rem 1rem', background: 'none',
                border: 'none', borderBottom: '1px solid var(--border)',
                cursor: 'pointer', fontSize: '0.75rem', letterSpacing: '0.15em',
                color: current === l.code ? 'var(--accent)' : 'var(--text-dim)',
                fontFamily: 'inherit', transition: 'all var(--transition)',
              }}>
                {l.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}