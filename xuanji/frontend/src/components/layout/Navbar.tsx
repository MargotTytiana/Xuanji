'use client'
import { useState } from 'react'
import { useCheckin } from '@/hooks/useCheckin'
import ThemeToggle from '@/components/ui/ThemeToggle'
import LangSwitcher from '@/components/ui/LangSwitcher'
import SharePanel from '@/components/ui/SharePanel'
import CheckinButton from '@/components/ui/CheckinButton'

export default function Navbar() {
  const [shareOpen, setShareOpen] = useState(false)
  const { checkedIn, handleCheckin } = useCheckin()

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 'var(--nav-height)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(14,14,14,0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'background 0.4s',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.85rem',
          letterSpacing: '0.3em',
          color: 'var(--accent)',
        }}>
          玄機 · Xuan Ji
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <CheckinButton checked={checkedIn} onClick={handleCheckin} />
          <NavDivider />
          <SharePanel open={shareOpen} onToggle={() => setShareOpen(o => !o)} />
          <LangSwitcher />
          <NavDivider />
          <ThemeToggle />
        </div>
      </nav>

      {/* overlay to close share panel */}
      {shareOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 98 }}
          onClick={() => setShareOpen(false)}
        />
      )}
    </>
  )
}

function NavDivider() {
  return (
    <div style={{
      width: 1, height: 18,
      background: 'var(--border)',
      margin: '0 0.2rem',
    }} />
  )
}