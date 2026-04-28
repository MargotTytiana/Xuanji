'use client'
import ThemeToggle   from '@/components/ui/ThemeToggle'
import LangSwitcher  from '@/components/ui/LangSwitcher'
import SharePanel    from '@/components/ui/SharePanel'
import CheckinButton from '@/components/ui/CheckinButton'

export default function Navbar() {
  return (
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
        fontSize: '0.85rem', letterSpacing: '0.3em',
        color: 'var(--accent)',
      }}>
        玄機 · Xuan Ji
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <CheckinButton />
        <NavDivider />
        <SharePanel />
        <LangSwitcher />
        <NavDivider />
        <ThemeToggle />
      </div>
    </nav>
  )
}

function NavDivider() {
  return (
    <div style={{
      width: 1, height: 18,
      background: 'var(--border)', margin: '0 0.2rem',
    }} />
  )
}