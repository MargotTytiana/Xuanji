'use client'
import { useState } from 'react'
import { Toast } from './Toast'

export default function SharePanel() {
  const [open, setOpen]     = useState(false)
  const [toast, setToast]   = useState('')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const ITEMS = [
    { label: '🔗 复制链接', action: () => { navigator.clipboard.writeText(location.href).catch(() => {}); showToast('链接已复制'); setOpen(false) } },
    { label: '💬 微信',     action: () => { showToast('请截图分享至微信'); setOpen(false) } },
    { label: '🐦 微博',     action: () => { window.open(`https://service.weibo.com/share/share.php?url=${encodeURIComponent(location.href)}`, '_blank'); setOpen(false) } },
    { label: '✕ Twitter',  action: () => { window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(location.href)}`, '_blank'); setOpen(false) } },
  ]

  return (
    <>
      <div style={{ position: 'relative' }}>
        <button onClick={() => setOpen(o => !o)} style={{
          background: open ? 'var(--accent-glow)' : 'none',
          border: `1px solid ${open ? 'var(--accent)' : 'var(--border)'}`,
          color: open ? 'var(--accent)' : 'var(--text-dim)',
          cursor: 'pointer', fontFamily: 'inherit',
          fontSize: '0.72rem', letterSpacing: '0.1em',
          padding: '0.4rem 0.85rem', borderRadius: '2px',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          transition: 'all var(--transition)',
        }}>
          ↗ <span>分享</span>
        </button>

        {open && (
          <>
            <div style={{ position: 'fixed', inset: 0, zIndex: 98 }} onClick={() => setOpen(false)} />
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0, zIndex: 99,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', padding: '1rem', width: 200,
            }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: 'var(--text-faint)', marginBottom: '0.8rem' }}>
                SHARE · 分享
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {ITEMS.map(item => (
                  <button key={item.label} onClick={item.action} style={{
                    flex: '1 1 80px', background: 'none',
                    border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                    padding: '0.45rem 0.4rem', fontSize: '0.65rem',
                    color: 'var(--text-dim)', cursor: 'pointer',
                    fontFamily: 'inherit', transition: 'all var(--transition)',
                  }}>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <Toast message={toast} visible={!!toast} />
    </>
  )
}