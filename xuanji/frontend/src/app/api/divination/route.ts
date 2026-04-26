import { NextRequest } from 'next/server'

const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

// POST /api/divination/stream  — proxies streaming response from FastAPI
export async function POST(req: NextRequest) {
  const body = await req.json()
  const isPersonality = req.nextUrl.searchParams.get('type') === 'personality'

  const endpoint = isPersonality
    ? `${BACKEND}/api/v1/divination/personality`
    : `${BACKEND}/api/v1/divination/stream`

  const upstream = await fetch(endpoint, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  })

  if (!upstream.ok) {
    return new Response(JSON.stringify({ error: '占卜失败，请重试' }), {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Stream passthrough
  return new Response(upstream.body, {
    headers: {
      'Content-Type':      upstream.headers.get('Content-Type') ?? 'text/plain',
      'Transfer-Encoding': 'chunked',
      'Cache-Control':     'no-cache',
    },
  })
}