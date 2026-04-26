// ── Primitives ───────────────────────────────────────────────
export type Lang             = 'zh' | 'en' | 'ja'
export type Theme            = 'dark' | 'light'
export type DivinationType   = 'tarot' | 'bagua' | 'personality'
export type BaguaArchetype   = '乾' | '坤' | '坎' | '离' | '震' | '巽' | '艮' | '兑'

// ── User ─────────────────────────────────────────────────────
export interface User {
  id:       number
  username: string
  language: Lang
}

export interface AuthResponse {
  access_token: string
  token_type:   string
}

// ── Tarot ─────────────────────────────────────────────────────
export interface TarotCard {
  id:       number
  zh:       string
  en:       string
  reversed: boolean
}

// ── Bagua ─────────────────────────────────────────────────────
export interface Hexagram {
  zh:     string
  en:     string
  number: number
}

// ── Divination ────────────────────────────────────────────────
export interface ReadingRequest {
  type:     DivinationType
  question: string
  context:  Record<string, unknown>
  language: Lang
}

export interface DivinationEntry {
  id:        string
  type:      DivinationType
  question:  string
  result:    string
  timestamp: number
}

// ── Personality ───────────────────────────────────────────────
export interface PersonalityResult {
  type:        BaguaArchetype
  title:       string
  description: string
  traits:      string[]
}

// ── Checkin ───────────────────────────────────────────────────
export interface CheckinStatus {
  checked_in: boolean
}

export interface CheckinResponse {
  date:    string
  message: string
  streak:  number
}