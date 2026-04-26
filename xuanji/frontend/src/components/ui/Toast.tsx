'use client'

interface ToastProps {
  message: string
  visible: boolean
}

export function Toast({ message, visible }: ToastProps) {
  return (
    <div style={{
      position: 'fixed', bottom: '5rem', right: '2rem', zIndex: 200,
      background: 'var(--surface)', border: '1px solid var(--accent2)',
      padding: '1rem 1.5rem', borderRadius: 'var(--radius-sm)',
      fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--accent)',
      whiteSpace: 'pre-line', pointerEvents: 'none',
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      opacity: visible ? 1 : 0,
      transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
    }}>
      {message}
    </div>
  )
}