import { NextRequest } from 'next/server'

const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

// POST /api/checkin — proxy checkin to FastAPI
export async function POST(req: NextRequest) {
  const userId = req.headers.get('x-user-id') ?? 'anonymous'

  const upstream = await fetch(`${BACKEND}/api/v1/checkin/`, {
    method:  'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id':    userId,
    },
  })

  const data = await upstream.json()

  return new Response(JSON.stringify(data), {
    status:  upstream.status,
    headers: { 'Content-Type': 'application/json' },
  })
}

// GET /api/checkin — check today's status
export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id') ?? 'anonymous'

  const upstream = await fetch(`${BACKEND}/api/v1/checkin/status`, {
    headers: { 'x-user-id': userId },
  })

  const data = await upstream.json()

  return new Response(JSON.stringify(data), {
    status:  upstream.status,
    headers: { 'Content-Type': 'application/json' },
  })
}