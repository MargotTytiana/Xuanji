import type { Metadata, Viewport } from 'next'
import { Noto_Serif_SC, Cinzel, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-noto',
  display: 'swap',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cinzel',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

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
    <html
      lang="zh-CN"
      data-theme="dark"
      className={`${notoSerifSC.variable} ${cinzel.variable} ${cormorant.variable}`}
      suppressHydrationWarning  // allows client-side theme injection without mismatch
    >
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}