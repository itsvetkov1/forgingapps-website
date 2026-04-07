import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import TermsContent from '@/app/terms/TermsContent'
import { translations } from '@/lib/i18n/translations'
import { buildLocaleAlternates, buildOg } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const data = translations[locale].terms
  return { title: `${data.title} | ForgingApps`, description: data.intro, alternates: buildLocaleAlternates(locale, '/terms'), openGraph: buildOg(`/${locale}/terms`, `${data.title} | ForgingApps`, data.intro) }
}

export default async function LocaleTermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <TermsContent />
}
