export const locales = ['en', 'bg'] as const
export type Locale = (typeof locales)[number]

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function stripLocaleFromPath(pathname: string): string {
  if (!pathname) return '/'
  const clean = pathname.startsWith('/') ? pathname : `/${pathname}`
  if (clean === '/en' || clean === '/bg') return '/'
  if (clean.startsWith('/en/')) return clean.slice(3) || '/'
  if (clean.startsWith('/bg/')) return clean.slice(3) || '/'
  return clean
}

export function localePath(locale: Locale, path: string): string {
  if (!path) return `/${locale}`
  if (/^(https?:)?\/\//.test(path) || path.startsWith('mailto:') || path.startsWith('tel:')) return path
  if (path.startsWith('/demo/veloura-')) return path
  if (path.startsWith('#')) return path

  const match = path.match(/^([^?#]*)([?#].*)?$/)
  const pathname = match?.[1] || '/'
  const suffix = match?.[2] || ''
  const stripped = stripLocaleFromPath(pathname)

  if (stripped === '/') return `/${locale}${suffix}`
  return `/${locale}${stripped}${suffix}`
}

export function swapLocaleInPath(pathname: string, locale: Locale): string {
  if (pathname.startsWith('/demo/veloura-')) return pathname
  return localePath(locale, pathname)
}
