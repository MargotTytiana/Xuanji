'use client'
import { useState, useRef } from 'react'

type DivinationType = 'tarot' | 'bagua' | 'personality'

interface ReadingState {
  content: string
  loading: boolean
  error: string | null
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export function useDivination(type: DivinationType) {
  const [state, setState] = useState<ReadingState>({
    content: '',
    loading: false,
    error: null,
  })
  const abortRef = useRef<AbortController | null>(null)

  async function ask(question: string, context: Record<string, unknown> = {}, language = 'zh') {
    // Cancel any in-flight request
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    setState({ content: '', loading: true, error: null })

    try {
      const res = await fetch(`${API_BASE}/api/v1/divination/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, question, context, language }),
        signal: abortRef.current.signal,
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      if (!res.body) throw new Error('No response body')

      // Stream text chunks into content
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setState({ content: accumulated, loading: true, error: null })
      }

      setState({ content: accumulated, loading: false, error: null })
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      setState({ content: '', loading: false, error: '占卜失败，请重试' })
    }
  }

  function reset() {
    abortRef.current?.abort()
    setState({ content: '', loading: false, error: null })
  }

  return { ...state, ask, reset }
}