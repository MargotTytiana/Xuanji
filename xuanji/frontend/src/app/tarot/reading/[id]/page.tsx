'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useDivinationStore } from '@/store/divinationStore'
import ResultDisplay from '@/components/divination/ResultDisplay'
import { PageHeader } from '@/components/ui/page-primitives'
import type { DivinationEntry } from '@/types'

export default function TarotReadingPage() {
  const { id }    = useParams<{ id: string }>()
  const router    = useRouter()
  const history   = useDivinationStore(s => s.history)
  const [entry, setEntry] = useState<DivinationEntry | null>(null)

  useEffect(() => {
    const found = history.find(e => e.id === id)
    if (found) setEntry(found)
  }, [id, history])

  if (!entry) return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.3em', color: 'var(--text-faint)', marginBottom: '1.5rem' }}>
          此卦象不在记录之中
        </p>
        <BackButton onClick={() => router.push('/tarot')} />
      </div>
    </div>
  )

  return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '5rem 2rem' }}>

        <PageHeader
          eyebrow="TAROT · 塔罗 · Reading"
          title="解读详情"
          subtitle={new Date(entry.timestamp).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
        />

        {/* Question */}
        <div style={{
          margin: '2.5rem 0 1.5rem',
          padding: '1.25rem 1.5rem',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
        }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.4em', color: 'var(--text-faint)', fontFamily: 'var(--font-display)', marginBottom: '0.6rem' }}>
            QUESTION · 问题
          </p>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--text)', letterSpacing: '0.05em' }}>
            {entry.question}
          </p>
        </div>

        {/* Result */}
        <ResultDisplay content={entry.result} />

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
          <BackButton onClick={() => router.push('/tarot')} />
          <BackButton onClick={() => router.push('/profile')} label="查看人格 →" />
        </div>

      </div>
    </div>
  )
}

function BackButton({ onClick, label = '← 返回塔罗' }: { onClick: () => void; label?: string }) {
  return (
    <button onClick={onClick} style={{
      background: 'none', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)', padding: '0.6rem 1.5rem',
      color: 'var(--text-dim)', fontFamily: 'var(--font-display)',
      fontSize: '0.7rem', letterSpacing: '0.3em', cursor: 'pointer',
      transition: 'all var(--transition)',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent2)'; e.currentTarget.style.color = 'var(--accent)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)';  e.currentTarget.style.color = 'var(--text-dim)' }}
    >
      {label}
    </button>
  )
}