// ── lib/utils.ts ─────────────────────────────────────────────
export function todayStr(): string {
  return new Date().toISOString().slice(0, 10)
}
 
export function formatDate(iso: string, locale = 'zh-CN'): string {
  return new Date(iso).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })
}
 
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
 
export function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}