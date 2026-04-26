// ============================================================
//  frontend/next.config.ts
// ============================================================
import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  images: { domains: [] },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ]
  },
}

export default config

import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin('./src/lib/i18n.ts')
export default withNextIntl(config)