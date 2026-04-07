import { notFound } from 'next/navigation'
import ConditionalShell from '@/components/ConditionalShell'
import EmberChatWidget from '@/components/ember/EmberChatWidget'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { isLocale, locales } from '@/lib/i18n/routing'

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <LanguageProvider locale={locale}>
      <ConditionalShell>{children}</ConditionalShell>
      <EmberChatWidget />
    </LanguageProvider>
  )
}
