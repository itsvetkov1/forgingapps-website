'use client'

import { useLanguage as useLanguageContext } from '@/contexts/LanguageContext'
import { translations } from './translations'

// Resolves a language from the context, with SSR-safe fallback to 'en'.
// useLanguage() normally throws during SSR because the context is only available in the browser.
// This wrapper catches that and returns 'en' so that the static build does not crash.
function useLanguage(): { language: 'en' | 'bg' } {
  try {
    return useLanguageContext()
  } catch {
    return { language: 'en' }
  }
}

export { useLanguage }

export function useTranslation(namespace?: string) {
  const { language } = useLanguage()

  const t = (key: string, fallback?: string): string => {
    const lang = translations[language]
    if (!lang) return fallback || key

    const fullKey = namespace ? `${namespace}.${key}` : key
    const parts = fullKey.split('.')

    let value: any = lang
    for (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part]
      } else {
        return fallback || key
      }
    }

    return typeof value === 'string' ? value : fallback || key
  }

  return { t, language }
}
