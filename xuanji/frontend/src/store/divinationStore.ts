
// ── store/divinationStore.ts ─────────────────────────────────
import { create } from 'zustand'
 
interface DivinationEntry {
  id: string
  type: 'tarot' | 'bagua' | 'personality'
  question: string
  result: string
  timestamp: number
}
 
interface DivinationStore {
  history: DivinationEntry[]
  addEntry: (entry: Omit<DivinationEntry, 'id' | 'timestamp'>) => void
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
          ].slice(0, 50),   // keep last 50 readings
        })),
      clearHistory: () => set({ history: [] }),
    }),
    { name: 'xuanji-divination' }
  )
)