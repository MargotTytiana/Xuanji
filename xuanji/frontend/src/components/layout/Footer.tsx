'use client'

const LINKS = [
  { label: '关于我们', href: '/about' },
  { label: '隐私政策', href: '/privacy' },
  { label: '联系我们', href: '/contact' },
]

const SOCIALS = [
  { label: '微', title: 'WeChat' },
  { label: '博', title: 'Weibo' },
  { label: '𝕏',  title: 'X / Twitter' },
]

export default function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 1,
      borderTop: '1px solid var(--border)',
      padding: '1.5rem 2.5rem',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '1rem',
    }}>
      <span style={{
        fontSize: '0.65rem', letterSpacing: '0.2em',
        color: 'var(--text-faint)',
        fontFamily: 'var(--font-display)',
      }}>
        © 2025 玄機 · XUAN JI · All Rights Reserved
      </span>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {LINKS.map(l => (
          <a key={l.href} href={l.href} style={{
            fontSize: '0.65rem', letterSpacing: '0.15em',
            color: 'var(--text-faint)',
            fontFamily: 'var(--font-display)',
            textTransform: 'uppercase',
            transition: 'color var(--transition)',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-faint)')}
          >
            {l.label}
          </a>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.6rem' }}>
        {SOCIALS.map(s => (
          <button key={s.title} title={s.title} style={{
            width: 30, height: 30,
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            background: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-faint)',
            fontSize: '0.75rem',
            transition: 'all var(--transition)',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent2)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-faint)'
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </footer>
  )
}