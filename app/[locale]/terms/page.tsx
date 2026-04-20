import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import TermsContent from '@/app/terms/TermsContent'
import { translations } from '@/lib/i18n/translations'
import { buildLocaleAlternates, buildOg, buildTwitterCard } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const data = translations[locale].terms
  const title = `${data.title} | ForgingApps`
  const description =
    locale === 'bg'
      ? 'Прегледайте условията за ползване на сайта на ForgingApps и за работа с нас по софтуерна разработка, AI консултиране и поддръжка.'
      : 'Review the terms for using the ForgingApps website and engaging our software development, AI consulting, and support services.'
  return { title, description, alternates: buildLocaleAlternates(locale, '/terms'), openGraph: buildOg(`/${locale}/terms`, title, description), twitter: buildTwitterCard(title, description) }
}

export default async function LocaleTermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <TermsContent />
}
