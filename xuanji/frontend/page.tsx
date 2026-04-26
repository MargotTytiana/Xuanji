'use client'
import { useRouter, useParams } from 'next/navigation'
import { PageHeader } from '@/components/ui/page-primitives'

export default function BaguaResultPage() {
  const { type } = useParams<{ type: string }>()
  const router = useRouter()

  return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '5rem 2rem' }}>
        <PageHeader
          eyebrow="I-CHING · 易経 · 八卦"
          title="Hexagram Result"
          subtitle={type ? `Result for ${type}` : 'Unknown hexagram'}
        />

        <div style={{ marginTop: '2rem', color: 'var(--text)', lineHeight: 1.8 }}>
          <p>This page is reserved for hexagram result details.</p>
          <p>If you see this page, your selection was successfully routed.</p>
        </div>

        <button
          type="button"
          onClick={() => router.push('/bagua')}
          style={{
            marginTop: '2rem', padding: '0.85rem 1.5rem', borderRadius: '999px',
            border: '1px solid var(--border)', background: 'none', color: 'var(--text)',
            cursor: 'pointer', fontFamily: 'var(--font-display)', letterSpacing: '0.2em'
          }}
        >
          ← Back to Bagua
        </button>
      </div>
    </div>
  )
}
