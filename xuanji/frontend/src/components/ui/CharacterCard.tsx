'use client'
import type { TarotCard as TarotCardType } from '@/types'

interface Props extends Partial<TarotCardType> {
  revealed?: boolean
  onClick?:  () => void
}

export default function TarotCard({ zh, en, reversed = false, revealed = false, onClick }: Props) {
  return (
    <div onClick={onClick} style={{
      width: 100, height: 160,
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      background: revealed ? 'var(--surface)' : 'var(--surface2)',
      cursor: onClick ? 'pointer' : 'default',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '0.5rem', padding: '0.75rem',
      transform: reversed ? 'rotate(180deg)' : undefined,
      transition: 'all var(--transition)',
      position: 'relative', overflow: 'hidden',
    }}>
      {!revealed && (
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.4,
          backgroundImage: 'repeating-linear-gradient(45deg, var(--border) 0, var(--border) 1px, transparent 0, transparent 50%)',
          backgroundSize: '8px 8px',
        }} />
      )}

      {revealed && (<>
        <span style={{ fontSize: '1.8rem' }}>☽</span>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-serif)', color: 'var(--text)', letterSpacing: '0.1em', textAlign: 'center' }}>
          {zh}
        </span>
        <span style={{ fontSize: '0.55rem', fontFamily: 'var(--font-display)', color: 'var(--text-faint)', letterSpacing: '0.15em', textAlign: 'center' }}>
          {en}
        </span>
      </>)}
    </div>
  )
}