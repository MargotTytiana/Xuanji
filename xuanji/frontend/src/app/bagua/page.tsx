'use client'
import { useState } from 'react'
import { ResultDisplay } from '@/components/divination'
import { useDivination } from '@/hooks/useDivination'

const HEXAGRAMS = [
  { zh: '乾', en: 'Heaven',   lines: [true,  true,  true]  },
  { zh: '坤', en: 'Earth',    lines: [false, false, false] },
  { zh: '坎', en: 'Water',    lines: [false, true,  false] },
  { zh: '离', en: 'Fire',     lines: [true,  false, true]  },
  { zh: '震', en: 'Thunder',  lines: [false, false, true]  },
  { zh: '巽', en: 'Wind',     lines: [true,  false, false] },
  { zh: '艮', en: 'Mountain', lines: [true,  false, false] },
  { zh: '兑', en: 'Lake',     lines: [false, true,  true]  },
]

export default function BaguaPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [question, setQuestion] = useState('')
  const { content, loading, error, ask, reset } = useDivination('bagua')

  function handleAsk() {
    if (!selected || !question.trim()) return
    ask(question, { hexagram: selected })
  }

  return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '5rem 2rem' }}>

        <PageHeader
          eyebrow="I-CHING · 易経 · 八卦"
          title="六十四卦"
          subtitle="Select a Hexagram · 选择卦象"
        />

        {/* Hexagram grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px', background: 'var(--border)',
          border: '1px solid var(--border)', margin: '3rem 0',
        }}>
          {HEXAGRAMS.map(h => (
            <button key={h.zh} onClick={() => { setSelected(h.zh); reset() }} style={{
              background: selected === h.zh ? 'var(--surface)' : 'var(--bg)',
              border: 'none', cursor: 'pointer', padding: '1.5rem 1rem',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
              transition: 'background var(--transition)',
              borderBottom: selected === h.zh ? '2px solid var(--accent)' : '2px solid transparent',
            }}>
              {/* Mini trigram lines */}
              <svg viewBox="0 0 36 30" width="36" height="30">
                {h.lines.map((solid, i) => solid
                  ? <line key={i} x1="2" y1={5 + i * 10} x2="34" y2={5 + i * 10} stroke="var(--trigram,#d4c9b0)" strokeWidth="3" strokeLinecap="round"/>
                  : (<g key={i}>
                      <line x1="2" y1={5 + i * 10} x2="14" y2={5 + i * 10} stroke="var(--trigram,#d4c9b0)" strokeWidth="3" strokeLinecap="round"/>
                      <line x1="22" y1={5 + i * 10} x2="34" y2={5 + i * 10} stroke="var(--trigram,#d4c9b0)" strokeWidth="3" strokeLinecap="round"/>
                    </g>)
                )}
              </svg>
              <span style={{ fontSize: '1.1rem', color: 'var(--text)', letterSpacing: '0.1em' }}>{h.zh}</span>
              <span style={{ fontSize: '0.6rem', color: 'var(--text-faint)', fontFamily: 'var(--font-display)', letterSpacing: '0.2em' }}>
                {h.en}
              </span>
            </button>
          ))}
        </div>

        {/* Question */}
        <textarea
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="我想了解关于…"
          rows={3}
          style={{
            width: '100%', background: 'var(--surface)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
            color: 'var(--text)', fontFamily: 'var(--font-serif)',
            fontSize: '0.95rem', padding: '1rem 1.25rem',
            outline: 'none', resize: 'vertical',
            transition: 'border-color var(--transition)',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent2)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border)')}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
          {selected
            ? <span style={{ fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.2em' }}>已选：{selected}</span>
            : <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)', letterSpacing: '0.15em' }}>请先选择卦象</span>
          }
          <OracleButton onClick={handleAsk} disabled={loading || !selected || !question.trim()} />
        </div>

        {(content || loading || error) && (
          <div style={{ marginTop: '2rem' }}>
            <ResultDisplay content={error ?? content} loading={loading} />
          </div>
        )}
      </div>
    </div>
  )
}