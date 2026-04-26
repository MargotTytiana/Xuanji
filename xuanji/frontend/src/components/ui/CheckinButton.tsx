'use client'
import { useCheckin } from '@/hooks/useCheckin'
import { Toast } from './Toast'

export default function CheckinButton() {
  const { checkedIn, streak, handleCheckin, toast } = useCheckin()

  return (
    <>
      <button onClick={handleCheckin} style={{
        background: checkedIn ? 'var(--accent-glow)' : 'none',
        border: `1px solid ${checkedIn ? 'var(--accent)' : 'var(--border)'}`,
        color: checkedIn ? 'var(--accent)' : 'var(--text-dim)',
        cursor: 'pointer', fontFamily: 'inherit',
        fontSize: '0.72rem', letterSpacing: '0.1em',
        padding: '0.4rem 0.85rem', borderRadius: '2px',
        display: 'flex', alignItems: 'center', gap: '0.4rem',
        transition: 'all var(--transition)',
      }}>
        📅
        <span>{checkedIn ? `已签到 · ${streak}天` : '签到'}</span>
      </button>

      <Toast message={toast} visible={!!toast} />
    </>
  )
}