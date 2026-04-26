'use client'
import { useState } from 'react'
import { PersonalityResult } from '@/components/divination'

const QUESTIONS = [
  {
    q: '面对未知的挑战，你的第一反应是？',
    options: ['直接冲上去', '先观察形势', '寻求团队支持', '静待时机'],
  },
  {
    q: '在人群中，你通常扮演什么角色？',
    options: ['自然成为焦点', '默默支撑他人', '穿针引线的桥梁', '独立观察者'],
  },
  {
    q: '你最看重的核心价值是？',
    options: ['成就与荣耀', '稳定与安全', '自由与创新', '智慧与深度'],
  },
  {
    q: '当事情偏离计划时，你会？',
    options: ['强势纠正回轨', '灵活随机应变', '等待自然解决', '重新分析局势'],
  },
]

interface Result { type: string; title: string; description: string; traits: string[] }

export default function ProfilePage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)

  const isLast = step === QUESTIONS.length - 1
  const isDone = step >= QUESTIONS.length

  async function choose(option: string) {
    const next = [...answers, option]
    setAnswers(next)

    if (isLast) {
      setStep(QUESTIONS.length)
      await fetchResult(next)
    } else {
      setStep(s => s + 1)
    }
  }

  async function fetchResult(ans: string[]) {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/divination/personality`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: ans, language: 'zh' }),
      })
      const data = await res.json()
      setResult(data)
    } catch {
      // Fallback for development
      setResult({
        type: '离',
        title: 'The Visionary · 灼热先知',
        description: '你天生对美与真理有超凡感知，创造力燃烧不息，是黑暗中点亮众人的那束火焰。',
        traits: ['创造力爆发', '魅力十足', '直觉敏锐', '热情洋溢', '追求光明'],
      })
    } finally {
      setLoading(false)
    }
  }

  function restart() {
    setStep(0)
    setAnswers([])
    setResult(null)
  }

  return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '5rem 2rem' }}>

        <PageHeader
          eyebrow="ARCHETYPE · 原型 · 命格"
          title="八卦人格"
          subtitle="Discover Your Cosmic Archetype"
        />

        {/* Progress bar */}
        {!isDone && (
          <div style={{
            height: 2, background: 'var(--border)',
            borderRadius: 1, margin: '3rem 0 2.5rem', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', background: 'var(--accent)',
              width: `${(step / QUESTIONS.length) * 100}%`,
              transition: 'width 0.4s var(--transition)',
            }} />
          </div>
        )}

        {/* Question */}
        {!isDone && (
          <div className="animate-fade-up">
            <p style={{
              fontSize: '0.65rem', letterSpacing: '0.4em',
              color: 'var(--text-faint)', fontFamily: 'var(--font-display)',
              marginBottom: '1.5rem',
            }}>
              {step + 1} / {QUESTIONS.length}
            </p>

            <h2 style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              fontWeight: 400, letterSpacing: '0.08em', lineHeight: 1.6,
              marginBottom: '2.5rem',
            }}>
              {QUESTIONS[step].q}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {QUESTIONS[step].options.map(opt => (
                <button key={opt} onClick={() => choose(opt)} style={{
                  background: 'none', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)', padding: '1rem 1.5rem',
                  color: 'var(--text-dim)', fontFamily: 'var(--font-serif)',
                  fontSize: '0.95rem', letterSpacing: '0.05em',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all var(--transition)',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.color = 'var(--text)'
                    e.currentTarget.style.background = 'var(--accent-glow)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-dim)'
                    e.currentTarget.style.background = 'none'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {isDone && loading && (
          <div style={{
            textAlign: 'center', padding: '4rem',
            color: 'var(--text-dim)', fontSize: '0.9rem', letterSpacing: '0.3em',
          }}>
            <div style={{ fontSize: '2.5rem', animation: 'spin-slow 3s linear infinite', display: 'inline-block', marginBottom: '1.5rem' }}>
              ☯
            </div>
            <p>天机演算中…</p>
          </div>
        )}

        {/* Result */}
        {result && !loading && (
          <>
            <PersonalityResult {...result} />
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button onClick={restart} style={{
                background: 'none', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', padding: '0.6rem 2rem',
                color: 'var(--text-dim)', fontFamily: 'var(--font-display)',
                fontSize: '0.7rem', letterSpacing: '0.3em', cursor: 'pointer',
                transition: 'all var(--transition)',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent2)'; e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-dim)' }}
              >
                重新测试 · Retake
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}