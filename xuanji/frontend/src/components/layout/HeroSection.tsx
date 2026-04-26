import BaguaWheel from '@/components/ui/BaguaWheel'

export default function HeroSection() {
  return (
    <section style={{
      position: 'relative', zIndex: 1,
      minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Left: Bagua */}
      <div style={{
        width: '50%', height: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, position: 'relative',
      }}>
        <span style={{
          position: 'absolute', left: '1.5rem', top: '50%',
          transform: 'translateY(-50%) rotate(-90deg)',
          fontFamily: 'var(--font-display)',
          fontSize: '0.6rem', letterSpacing: '0.5em',
          color: 'var(--text-faint)', textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>
          Cosmos · 天地 · Divination
        </span>
        <BaguaWheel size={480} />
      </div>

      {/* Right: Content */}
      <div style={{
        flex: 1, padding: '0 4rem 0 2rem',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <p className="animate-fade-up" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.7rem', letterSpacing: '0.5em',
          color: 'var(--accent)', textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}>
          AI · 玄學 · Fortune · 命理
        </p>

        <h1 className="animate-fade-up" style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(3rem, 5vw, 5.5rem)',
          fontWeight: 300, lineHeight: 1.1,
          letterSpacing: '0.15em',
          marginBottom: '0.3rem',
          animationDelay: '0.15s',
        }}>
          洞悉
          <span style={{ display: 'block', fontWeight: 600, color: 'var(--accent)', fontSize: 'clamp(2rem, 3.5vw, 3.8rem)' }}>
            天機
          </span>
        </h1>

        <p className="animate-fade-up" style={{
          fontFamily: 'var(--font-display)', fontStyle: 'italic',
          fontSize: 'clamp(0.9rem, 1.4vw, 1.2rem)',
          color: 'var(--text-dim)', letterSpacing: '0.15em',
          marginBottom: '2rem', animationDelay: '0.3s',
        }}>
          Illuminate the Unseen · AI Tarot & I-Ching
        </p>

        <div style={{
          width: 60, height: 1,
          background: 'linear-gradient(90deg, var(--accent), transparent)',
          marginBottom: '2rem',
        }} />

        <p className="animate-fade-up" style={{
          fontSize: '0.88rem', lineHeight: 2,
          color: 'var(--text-dim)', letterSpacing: '0.05em',
          maxWidth: 340, marginBottom: '3rem',
          whiteSpace: 'pre-line', animationDelay: '0.45s',
        }}>
          {'融合古代易经八卦与现代人工智能，\n为您解读命运的密语，\n指引前行的方向。'}
        </p>

        <EnterButton />

        {/* Feature chips */}
        <div className="animate-fade-up" style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.6rem',
          marginTop: '2.5rem', animationDelay: '0.75s',
        }}>
          {['AI 塔罗', '八卦占卜', '流年运势', '命盘解析', '每日卦象'].map(chip => (
            <span key={chip} style={{
              fontSize: '0.68rem', letterSpacing: '0.12em',
              color: 'var(--text-faint)', border: '1px solid var(--border)',
              padding: '0.3rem 0.85rem', borderRadius: '1px',
              fontFamily: 'var(--font-display)', textTransform: 'uppercase',
            }}>
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        zIndex: 2,
      }}>
        <div style={{
          width: 1, height: 40,
          background: 'linear-gradient(180deg, var(--accent2), transparent)',
        }} />
        <span style={{
          fontSize: '0.6rem', letterSpacing: '0.4em',
          color: 'var(--text-faint)',
          fontFamily: 'var(--font-display)', textTransform: 'uppercase',
        }}>
          Scroll
        </span>
      </div>
    </section>
  )
}

function EnterButton() {
  return (
    <a href="/tarot" className="animate-fade-up" style={{
      display: 'inline-flex', alignItems: 'center', gap: '1rem',
      textDecoration: 'none', cursor: 'pointer',
      animationDelay: '0.6s', width: 'fit-content',
      transition: 'transform var(--transition)',
    }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateX(6px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateX(0)')}
    >
      <div style={{
        width: 52, height: 52, borderRadius: '50%',
        border: '1px solid var(--text-faint)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--accent)', fontSize: '1.2rem',
      }}>
        →
      </div>
      <div>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '0.85rem', letterSpacing: '0.3em',
          color: 'var(--text-dim)',
        }}>
          进入玄机
        </div>
        <div style={{
          fontSize: '0.65rem', letterSpacing: '0.4em',
          color: 'var(--text-faint)',
          fontFamily: 'var(--font-display)',
          marginTop: '0.2rem',
        }}>
          Enter the Oracle
        </div>
      </div>
    </a>
  )
}