'use client'
import { useState } from 'react'
import { CardSpread, ResultDisplay } from '@/components/divination'
import { OracleButton, PageHeader } from '@/components/ui/page-primitives'
import { useDivination } from '@/hooks/useDivination'

export default function TarotPage() {
  const [question, setQuestion] = useState('')
  const { content, loading, error, ask, reset } = useDivination('tarot')

  function handleSubmit() {
    if (!question.trim()) return
    ask(question, { spread: 'three-card' })
  }

  return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '5rem 2rem' }}>

        {/* Header */}
        <PageHeader
          eyebrow="AI · TAROT · 塔罗"
          title="塔罗牌阵"
          subtitle="Three-Card Spread · 过去 · 现在 · 未来"
        />

        {/* Card spread */}
        <section style={{ margin: '3rem 0' }}>
          <CardSpread />
        </section>

        {/* Question input */}
        <section style={{ margin: '2.5rem 0' }}>
          <textarea
            value={question}
            onChange={e => { setQuestion(e.target.value); if (content) reset() }}
            placeholder="我想了解关于…"
            rows={3}
            style={{
              width: '100%', background: 'var(--surface)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
              color: 'var(--text)', fontFamily: 'var(--font-serif)',
              fontSize: '0.95rem', lineHeight: 1.8,
              padding: '1rem 1.25rem', resize: 'vertical',
              outline: 'none', letterSpacing: '0.05em',
              transition: 'border-color var(--transition)',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--accent2)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
            <OracleButton onClick={handleSubmit} disabled={loading || !question.trim()} />
          </div>
        </section>

        {/* Result */}
        {(content || loading || error) && (
          <ResultDisplay content={error ?? content} loading={loading} />
        )}
      </div>
    </div>
  )
}