import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DivinationType } from '@/types'

interface DivinationEntry {
  id:        string
  type:      DivinationType
  question:  string
  result:    string
  timestamp: number
}

interface DivinationStore {
  history:      DivinationEntry[]
  addEntry:     (entry: Omit<DivinationEntry, 'id' | 'timestamp'>) => void
  clearHistory: () => void
}

export const useDivinationStore = create<DivinationStore>()(
  persist(
    (set) => ({
      history: [],
      addEntry: (entry) =>
        set((s) => ({
          history: [
            { ...entry, id: crypto.randomUUID(), timestamp: Date.now() },
            ...s.history,
          ].slice(0, 50),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    { name: 'xuanji-divination' }
  )
)