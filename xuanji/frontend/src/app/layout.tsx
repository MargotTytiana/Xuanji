import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'


export const metadata: Metadata = {
  title: {
    default: '玄機 · AI塔罗八卦运势',
    template: '%s · 玄機',
  },
  description: '融合易经八卦与人工智能，为你解读命运密语，指引前行方向。',
  keywords: ['塔罗', '八卦', '占卜', 'AI运势', '易经', '紫微斗数'],
  authors: [{ name: '玄機' }],
  openGraph: {
    title: '玄機 · AI塔罗八卦运势',
    description: '融合易经八卦与人工智能，洞悉天机。',
    type: 'website',
    locale: 'zh_CN',
  },
}

export const viewport: Viewport = {
  themeColor: '#0e0e0e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" data-theme="dark" suppressHydrationWarning>
    </html>
  )
}
