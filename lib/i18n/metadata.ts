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

export function buildOg(
  urlPath: string,
  title: string,
  description: string,
  imageUrl = '/og-image.png',
  imageAlt = title,
): Metadata['openGraph'] {
  return {
    title,
    description,
    url: `https://forgingapps.com${urlPath}`,
    images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }],
  }
}

export function buildTwitterCard(title: string, description: string, imageUrl = '/og-image.png'): Metadata['twitter'] {
  return {
    card: 'summary_large_image',
    title,
    description,
    images: [imageUrl],
  }
}

export function buildPageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  imageUrl = '/og-image.png',
  imageAlt = title,
): Pick<Metadata, 'alternates' | 'openGraph' | 'twitter'> {
  return {
    alternates: buildLocaleAlternates(locale, path),
    openGraph: buildOg(`/${locale}${path}`, title, description, imageUrl, imageAlt),
    twitter: buildTwitterCard(title, description, imageUrl),
  }
}
