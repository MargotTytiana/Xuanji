'use client'
import { useState } from 'react'
import { ResultDisplay } from '@/components/divination'
import { OracleButton, PageHeader } from '@/components/ui/page-primitives'
import { useDivination } from '@/hooks/useDivination'

const PERIODS = ['今日', '本周', '本月', '流年'] as const
type Period = typeof PERIODS[number]

export default function HoroscopePage() {
  const [period, setPeriod] = useState<Period>('今日')
  const [birthdate, setBirthdate] = useState('')
  const { content, loading, error, ask, reset } = useDivination('bagua')

  function handleAsk() {
    if (!birthdate) return
    reset()
    ask(`请为我解读${period}运势`, { birthdate, period })
  }

  return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '5rem 2rem' }}>

        <PageHeader
          eyebrow="FORTUNE · 运势 · 流年"
          title="流年运势"
          subtitle="Annual & Daily Fortune Reading"
        />

        {/* Period selector */}
        <div style={{ display: 'flex', gap: '1px', background: 'var(--border)', margin: '3rem 0 2rem', border: '1px solid var(--border)' }}>
          {PERIODS.map(p => (
            <button key={p} onClick={() => { setPeriod(p); reset() }} style={{
              flex: 1, padding: '0.85rem',
              background: period === p ? 'var(--surface)' : 'var(--bg)',
              border: 'none', cursor: 'pointer',
              color: period === p ? 'var(--accent)' : 'var(--text-dim)',
              fontFamily: 'var(--font-serif)', fontSize: '0.9rem',
              letterSpacing: '0.15em',
              borderBottom: period === p ? '2px solid var(--accent)' : '2px solid transparent',
              transition: 'all var(--transition)',
            }}>
              {p}
            </button>
          ))}
        </div>

        {/* Birth date */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block', fontSize: '0.7rem',
            letterSpacing: '0.3em', color: 'var(--text-faint)',
            fontFamily: 'var(--font-display)', marginBottom: '0.6rem',
          }}>
            出生日期 · BIRTH DATE
          </label>
          <input
            type="date"
            value={birthdate}
            onChange={e => setBirthdate(e.target.value)}
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', color: 'var(--text)',
              fontFamily: 'var(--font-serif)', fontSize: '0.9rem',
              padding: '0.7rem 1rem', outline: 'none', width: 220,
              transition: 'border-color var(--transition)',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--accent2)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>

        <OracleButton onClick={handleAsk} disabled={loading || !birthdate} label={`解读${period}运势`} />

        {(content || loading || error) && (
          <div style={{ marginTop: '2.5rem' }}>
            <ResultDisplay content={error ?? content} loading={loading} />
          </div>
        )}
      </div>
    </div>
  )
}