import type { Metadata } from 'next'
import { localePath, type Locale } from '@/lib/i18n/routing'

export function buildLocaleAlternates(locale: Locale, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: {
      en: localePath('en', path),
      bg: localePath('bg', path),
      'x-default': localePath('en', path),
    },
  }
}

export function buildOg(urlPath: string, title: string, description: string): Metadata['openGraph'] {
  return {
    title,
    description,
    url: `https://forgingapps.com${urlPath}`,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
  }
}