import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HomeContent from '@/app/HomeContent'
import { translations } from '@/lib/i18n/translations'
import { buildLocaleAlternates, buildOg } from '@/lib/i18n/metadata'
import { isLocale, type Locale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const data = translations[locale]
  const title = locale === 'bg'
    ? 'ForgingApps -- Разработка на приложения и AI консултиране | София, България'
    : 'ForgingApps -- Custom App Development & AI Consulting | Sofia, Bulgaria'
  const description = data.home.subheadline

  return {
    title,
    description,
    alternates: buildLocaleAlternates(locale, '/'),
    openGraph: buildOg(`/${locale}`, title, description),
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.svg'] },
  }
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <HomeContent />
}
