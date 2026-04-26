import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '玄機 · AI塔罗八卦运势',
  description: '融合易经八卦与人工智能，为你解读命运密语，指引前行方向。',
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  // No extra padding — hero section handles its own full-viewport layout
  return <>{children}</>
}