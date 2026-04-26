// Shared presentational primitives used across page files.
// Import from '@/components/ui/page-primitives'

interface PageHeaderProps {
  eyebrow: string
  title: string
  subtitle: string
}

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <header style={{ marginBottom: '1rem' }}>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.65rem', letterSpacing: '0.55em',
        color: 'var(--accent)', textTransform: 'uppercase',
        marginBottom: '1.2rem',
      }}>
        {eyebrow}
      </p>
      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        fontWeight: 300, letterSpacing: '0.15em', lineHeight: 1.1,
        marginBottom: '0.5rem',
      }}>
        {title}
      </h1>
      <p style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontSize: '0.8rem', color: 'var(--text-faint)',
        letterSpacing: '0.2em',
      }}>
        {subtitle}
      </p>
      <div style={{
        width: 48, height: 1,
        background: 'linear-gradient(90deg, var(--accent), transparent)',
        marginTop: '1.5rem',
      }} />
    </header>
  )
}

interface OracleButtonProps {
  onClick: () => void
  disabled?: boolean
  label?: string
}

export function OracleButton({ onClick, disabled = false, label = '占卜' }: OracleButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? 'none' : 'var(--accent-glow)',
      border: `1px solid ${disabled ? 'var(--border)' : 'var(--accent2)'}`,
      borderRadius: 'var(--radius-sm)',
      color: disabled ? 'var(--text-faint)' : 'var(--accent)',
      fontFamily: 'var(--font-display)',
      fontSize: '0.72rem', letterSpacing: '0.3em',
      padding: '0.6rem 2rem', cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all var(--transition)',
    }}>
      {label}
    </button>
  )
}