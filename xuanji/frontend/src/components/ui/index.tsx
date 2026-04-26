'use client'
// ── ThemeToggle.tsx ──────────────────────────────────────────
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <NavBtn onClick={() => setDark(d => !d)}>
      {dark ? '🌙' : '☀️'} <span>{dark ? '暗色' : '亮色'}</span>
    </NavBtn>
  )
}

// ── LangSwitcher.tsx ─────────────────────────────────────────
const LANGS = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: '日本語' },
]

export function LangSwitcher() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState('zh')

  return (
    <div style={{ position: 'relative' }}>
      <NavBtn onClick={() => setOpen(o => !o)}>
        🌐 <span>{LANGS.find(l => l.code === current)?.label}</span>
      </NavBtn>

      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 98 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'absolute', top: 'calc(100% + 10px)', right: 0, zIndex: 99,
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', overflow: 'hidden', minWidth: 120,
          }}>
            {LANGS.map(l => (
              <button key={l.code} onClick={() => { setCurrent(l.code); setOpen(false) }} style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '0.6rem 1rem',
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: '1px solid var(--border)',
                fontSize: '0.75rem', letterSpacing: '0.15em',
                color: current === l.code ? 'var(--accent)' : 'var(--text-dim)',
                fontFamily: 'inherit',
                transition: 'all var(--transition)',
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

// ── SharePanel.tsx ───────────────────────────────────────────
interface ShareProps { open: boolean; onToggle: () => void }

export function SharePanel({ open, onToggle }: ShareProps) {
  const copy = () => { navigator.clipboard.writeText(window.location.href).catch(() => {}); onToggle() }

  return (
    <div style={{ position: 'relative' }}>
      <NavBtn onClick={onToggle}>
        ↗ <span>分享</span>
      </NavBtn>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 10px)', right: 0, zIndex: 99,
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)', padding: '1rem', width: 200,
        }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: 'var(--text-dim)', marginBottom: '0.8rem' }}>
            SHARE · 分享
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {[
              { label: '🔗 复制链接', action: copy },
              { label: '💬 微信',     action: () => {} },
              { label: '🐦 微博',     action: () => {} },
              { label: '✕ Twitter',  action: () => window.open(`https://twitter.com/intent/tweet?url=${location.href}`, '_blank') },
            ].map(item => (
              <button key={item.label} onClick={item.action} style={{
                flex: '1 1 80px',
                background: 'none', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', padding: '0.45rem 0.4rem',
                fontSize: '0.65rem', color: 'var(--text-dim)', cursor: 'pointer',
                fontFamily: 'inherit', transition: 'all var(--transition)',
              }}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── CheckinButton.tsx ────────────────────────────────────────
interface CheckinProps { checked: boolean; onClick: () => void }

export function CheckinButton({ checked, onClick }: CheckinProps) {
  return (
    <NavBtn onClick={onClick} active={checked}>
      📅 <span>{checked ? '已签到 ✓' : '签到'}</span>
    </NavBtn>
  )
}

// ── Toast.tsx ────────────────────────────────────────────────
interface ToastProps { message: string; visible: boolean }

export function Toast({ message, visible }: ToastProps) {
  return (
    <div style={{
      position: 'fixed', bottom: '5rem', right: '2rem', zIndex: 200,
      background: 'var(--surface)', border: '1px solid var(--accent2)',
      padding: '1rem 1.5rem', borderRadius: 'var(--radius-sm)',
      fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--accent)',
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      opacity: visible ? 1 : 0,
      transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      pointerEvents: 'none', whiteSpace: 'pre-line',
    }}>
      {message}
    </div>
  )
}

// ── Shared NavBtn ────────────────────────────────────────────
function NavBtn({ children, onClick, active }: {
  children: React.ReactNode; onClick?: () => void; active?: boolean
}) {
  return (
    <button onClick={onClick} style={{
      background: active ? 'var(--accent-glow)' : 'none',
      border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
      color: active ? 'var(--accent)' : 'var(--text-dim)',
      cursor: 'pointer', fontFamily: 'inherit',
      fontSize: '0.72rem', letterSpacing: '0.1em',
      padding: '0.4rem 0.85rem', borderRadius: '2px',
      display: 'flex', alignItems: 'center', gap: '0.4rem',
      whiteSpace: 'nowrap', transition: 'all var(--transition)',
    }}>
      {children}
    </button>
  )
}