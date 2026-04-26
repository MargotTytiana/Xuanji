'use client'

interface Props {
  content:  string
  loading?: boolean
}

export default function ResultDisplay({ content, loading = false }: Props) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '2rem', minHeight: 160,
    }}>
      {loading ? (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          color: 'var(--text-dim)', fontSize: '0.85rem', letterSpacing: '0.2em',
        }}>
          <span style={{ animation: 'spin-slow 2s linear infinite', display: 'inline-block' }}>
            ☯
          </span>
          天机演算中…
        </div>
      ) : (
        <p style={{
          fontSize: '0.95rem', lineHeight: 2.1,
          color: 'var(--text)', letterSpacing: '0.05em',
          whiteSpace: 'pre-wrap', fontFamily: 'var(--font-serif)',
        }}>
          {content}
        </p>
      )}
    </div>
  )
}