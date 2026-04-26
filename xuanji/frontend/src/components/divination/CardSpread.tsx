'use client'
import { useState } from 'react'
import TarotCard from '@/components/ui/TarotCard'
import type { TarotCard as TarotCardType } from '@/types'

const POSITIONS = ['过去', '现在', '未来'] as const

export default function CardSpread() {
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false])
  const [cards]   = useState<Partial<TarotCardType>[]>([
    { zh: '命运之轮', en: 'Wheel of Fortune' },
    { zh: '星星',     en: 'The Star'         },
    { zh: '月亮',     en: 'The Moon'         },
  ])

  const flip = (i: number) =>
    setRevealed(prev => prev.map((v, idx) => (idx === i ? !v : v)))

  return (
    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
      {POSITIONS.map((pos, i) => (
        <div key={pos} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <TarotCard
            {...cards[i]}
            revealed={revealed[i]}
            onClick={() => flip(i)}
          />
          <span style={{
            fontSize: '0.65rem', letterSpacing: '0.3em',
            color: 'var(--text-faint)', fontFamily: 'var(--font-display)',
          }}>
            {pos}
          </span>
        </div>
      ))}
    </div>
  )
}