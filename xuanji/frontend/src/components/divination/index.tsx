'use client'
import { useState } from 'react'

// ── TarotCard.tsx ────────────────────────────────────────────
interface TarotCardProps {
  name: string
  nameEn: string
  reversed?: boolean
  revealed?: boolean
  onClick?: () => void
}

export function TarotCard({ name, nameEn, reversed = false, revealed = false, onClick }: TarotCardProps) {
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
      {/* Card back pattern */}
      {!revealed && (
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(45deg, var(--border) 0, var(--border) 1px, transparent 0, transparent 50%)',
          backgroundSize: '8px 8px',
          opacity: 0.4,
        }} />
      )}

      {revealed && (<>
        <span style={{ fontSize: '1.8rem' }}>☽</span>
        <span style={{
          fontSize: '0.75rem', fontFamily: 'var(--font-serif)',
          color: 'var(--text)', letterSpacing: '0.1em', textAlign: 'center',
        }}>{name}</span>
        <span style={{
          fontSize: '0.55rem', fontFamily: 'var(--font-display)',
          color: 'var(--text-faint)', letterSpacing: '0.15em', textAlign: 'center',
        }}>{nameEn}</span>
      </>)}
    </div>
  )
}

// ── CharacterCard.tsx ────────────────────────────────────────
interface CharacterCardProps {
  zh: string
  en: string
  symbol: string
  element: string
  tag: string
  description: string
  traits: string[]
  active?: boolean
  onClick?: () => void
}

export function CharacterCard({ zh, en, symbol, element, tag, description, traits, active, onClick }: CharacterCardProps) {
  return (
    <div onClick={onClick} style={{
      background: 'var(--bg)',
      border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      cursor: 'pointer',
      transition: 'all var(--transition)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, var(--accent), transparent)',
        transform: active ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform var(--transition)',
      }} />

      <p style={{
        fontSize: '0.65rem', letterSpacing: '0.4em',
        color: 'var(--accent)', marginBottom: '0.5rem',
        fontFamily: 'var(--font-display)',
      }}>{symbol} · {element}</p>

      <h3 style={{ fontSize: '1.3rem', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>{zh}</h3>

      <p style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontSize: '0.75rem', color: 'var(--text-faint)',
        letterSpacing: '0.15em', marginBottom: '0.8rem',
      }}>{en} · {tag}</p>

      <p style={{ fontSize: '0.8rem', lineHeight: 1.9, color: 'var(--text-dim)' }}>{description}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1rem' }}>
        {traits.map(t => (
          <span key={t} style={{
            fontSize: '0.65rem', padding: '0.25rem 0.7rem',
            border: '1px solid var(--border)', borderRadius: 20,
            color: 'var(--text-dim)', letterSpacing: '0.06em',
          }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

// ── ResultDisplay.tsx ────────────────────────────────────────
interface ResultDisplayProps { content: string; loading?: boolean }

export function ResultDisplay({ content, loading = false }: ResultDisplayProps) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '2rem',
      minHeight: 160,
    }}>
      {loading ? (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          color: 'var(--text-dim)', fontSize: '0.85rem', letterSpacing: '0.2em',
        }}>
          <span style={{ animation: 'spin-slow 2s linear infinite', display: 'inline-block' }}>☯</span>
          天机演算中…
        </div>
      ) : (
        <p style={{
          fontSize: '0.95rem', lineHeight: 2.1,
          color: 'var(--text)', letterSpacing: '0.05em',
          whiteSpace: 'pre-wrap',
          fontFamily: 'var(--font-serif)',
        }}>{content}</p>
      )}
    </div>
  )
}

// ── CardSpread.tsx ───────────────────────────────────────────
const POSITIONS = ['过去', '现在', '未来']

export function CardSpread() {
  const [revealed, setReveal] = useState<boolean[]>([false, false, false])

  const flip = (i: number) =>
    setReveal(prev => prev.map((v, idx) => (idx === i ? !v : v)))

  return (
    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
      {POSITIONS.map((pos, i) => (
        <div key={pos} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <TarotCard
            name="命运之轮" nameEn="Wheel of Fortune"
            revealed={revealed[i]}
            onClick={() => flip(i)}
          />
          <span style={{
            fontSize: '0.65rem', letterSpacing: '0.3em',
            color: 'var(--text-faint)', fontFamily: 'var(--font-display)',
          }}>{pos}</span>
        </div>
      ))}
    </div>
  )
}

// ── PersonalityResult.tsx ────────────────────────────────────
interface PersonalityResultProps {
  type: string; title: string; description: string; traits: string[]
}

export function PersonalityResult({ type, title, description, traits }: PersonalityResultProps) {
  return (
    <div className="animate-fade-up surface" style={{ padding: '2.5rem', textAlign: 'center' }}>
      <p style={{
        fontFamily: 'var(--font-display)', fontSize: '0.65rem',
        letterSpacing: '0.5em', color: 'var(--accent)', marginBottom: '1rem',
      }}>
        你的原型是
      </p>
      <h2 style={{ fontSize: '3rem', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>{type}</h2>
      <p style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '1.5rem',
      }}>{title}</p>
      <p style={{ fontSize: '0.9rem', lineHeight: 2, color: 'var(--text-dim)', maxWidth: 440, margin: '0 auto 1.5rem' }}>
        {description}
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        {traits.map(t => (
          <span key={t} style={{
            fontSize: '0.7rem', padding: '0.35rem 1rem',
            border: '1px solid var(--accent2)', borderRadius: 20,
            color: 'var(--accent)', letterSpacing: '0.1em',
          }}>{t}</span>
        ))}
      </div>
    </div>
  )
}