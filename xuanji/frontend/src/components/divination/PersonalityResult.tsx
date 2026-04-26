'use client'
import type { PersonalityResult as PersonalityResultType } from '@/types'

export default function PersonalityResult({ type, title, description, traits }: PersonalityResultType) {
  return (
    <div className="animate-fade-up" style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '2.5rem', textAlign: 'center',
    }}>
      <p style={{
        fontFamily: 'var(--font-display)', fontSize: '0.65rem',
        letterSpacing: '0.5em', color: 'var(--accent)',
        textTransform: 'uppercase', marginBottom: '1rem',
      }}>
        你的原型是
      </p>

      <h2 style={{ fontSize: '3.5rem', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
        {type}
      </h2>

      <p style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontSize: '0.9rem', color: 'var(--text-dim)',
        letterSpacing: '0.2em', marginBottom: '1.5rem',
      }}>
        {title}
      </p>

      <p style={{
        fontSize: '0.9rem', lineHeight: 2,
        color: 'var(--text-dim)', letterSpacing: '0.05em',
        maxWidth: 440, margin: '0 auto 1.5rem',
      }}>
        {description}
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        {traits.map(t => (
          <span key={t} style={{
            fontSize: '0.7rem', padding: '0.35rem 1rem',
            border: '1px solid var(--accent2)', borderRadius: 20,
            color: 'var(--accent)', letterSpacing: '0.1em',
          }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}