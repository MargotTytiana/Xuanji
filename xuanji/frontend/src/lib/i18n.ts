import { getRequestConfig } from 'next-intl/server'
import type { Lang } from '@/types'

const SUPPORTED: Lang[] = ['zh', 'en', 'ja']
const DEFAULT:   Lang   = 'zh'

export default getRequestConfig(async ({ locale }) => {
  const lang = SUPPORTED.includes(locale as Lang) ? (locale as Lang) : DEFAULT

  return {
    locale:   lang,
    messages: (await import(`@/i18n/${lang}.json`)).default,
  }
})