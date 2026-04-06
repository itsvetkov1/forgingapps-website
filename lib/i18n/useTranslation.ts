'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from './translations'

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
