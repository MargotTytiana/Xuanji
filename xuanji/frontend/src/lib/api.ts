// ── lib/api.ts ───────────────────────────────────────────────
const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'
 
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json()
}
 
export const api = {
  tarot: {
    draw:  (count = 3)      => request<unknown[]>('/api/v1/tarot/draw', { method: 'POST', body: JSON.stringify({ count }) }),
    cards: ()               => request<unknown[]>('/api/v1/tarot/cards'),
  },
  bagua: {
    cast:       ()          => request<unknown>('/api/v1/bagua/cast'),
    hexagrams:  ()          => request<unknown[]>('/api/v1/bagua/hexagrams'),
  },
  user: {
    register: (u: string, p: string) => request<unknown>('/api/v1/user/register', { method: 'POST', body: JSON.stringify({ username: u, password: p }) }),
    login:    (u: string, p: string) => request<{ access_token: string }>('/api/v1/user/login', { method: 'POST', body: JSON.stringify({ username: u, password: p }) }),
  },
  checkin: {
    post:   (userId: string) => request<unknown>('/api/v1/checkin/',       { method: 'POST', headers: { 'x-user-id': userId, 'Content-Type': 'application/json' } }),
    status: (userId: string) => request<{ checked_in: boolean }>('/api/v1/checkin/status', { headers: { 'x-user-id': userId } }),
  },
}