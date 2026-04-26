// ============================================================
//  frontend/next.config.ts
// ============================================================
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/lib/i18n.ts')
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://backend:8000'

const config: NextConfig = {
  reactStrictMode: true,
  images: { domains: [] },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ]
  },
}

export default withNextIntl(config)
