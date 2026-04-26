// ── lib/constants.ts ─────────────────────────────────────────
export const SUPPORTED_LANGUAGES = ['zh', 'en', 'ja'] as const
export type Lang = typeof SUPPORTED_LANGUAGES[number]
 
export const DIVINATION_TYPES = ['tarot', 'bagua', 'personality'] as const
export type DivinationType = typeof DIVINATION_TYPES[number]
 
export const BAGUA_ARCHETYPES = ['乾', '坤', '坎', '离', '震', '巽', '艮', '兑'] as const
export type BaguaType = typeof BAGUA_ARCHETYPES[number]
 
export const NAV_LINKS = [
  { href: '/tarot',     zh: '塔罗', en: 'Tarot'     },
  { href: '/bagua',     zh: '八卦', en: 'I-Ching'   },
  { href: '/horoscope', zh: '运势', en: 'Fortune'   },
  { href: '/profile',   zh: '人格', en: 'Archetype' },
] as const
 