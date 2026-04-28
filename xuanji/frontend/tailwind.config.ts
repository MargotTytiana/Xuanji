// ============================================================
//  frontend/tailwind.config.ts
// ============================================================
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif:   ['var(--font-noto)', 'var(--font-cormorant)', 'serif'],
        display: ['var(--font-cinzel)', 'serif'],
      },
      colors: {
        accent:  'var(--accent)',
        accent2: 'var(--accent2)',
        surface: 'var(--surface)',
      },
      animation: {
        'spin-slow':   'spin-slow 40s linear infinite',
        'pulse-glow':  'pulse-glow 4s ease-in-out infinite',
        'fade-up':     'fade-up 0.7s ease both',
      },
      keyframes: {
        'spin-slow':  { to: { transform: 'rotate(360deg)' } },
        'pulse-glow': { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
        'fade-up':    { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}

export default config
 