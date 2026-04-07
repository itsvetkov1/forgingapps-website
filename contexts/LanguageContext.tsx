'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'
import { localePath, type Locale } from '@/lib/i18n/routing'

interface LanguageContextType {
  language: Locale
  localePath: (path: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <LanguageContext.Provider
      value={{
        language: locale,
        localePath: (path: string) => localePath(locale, path),
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
