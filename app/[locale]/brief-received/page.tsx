import type { Metadata } from 'next'
import { Suspense } from 'react'
import BriefReceivedClient from '@/components/brief-received/BriefReceivedClient'
import { translations } from '@/lib/i18n/translations'
import { buildLocaleAlternates, buildOg, buildTwitterCard } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const data = translations[locale].briefReceived.meta
  const title = `${data.title} | ForgingApps`
  const description = data.description

  return {
    title,
    description,
    alternates: buildLocaleAlternates(locale, '/brief-received'),
    openGraph: buildOg(`/${locale}/brief-received`, title, description),
    twitter: buildTwitterCard(title, description),
  }
}

export default async function BriefReceivedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) {
    return null
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f4ede3]" />}>
      <BriefReceivedClient locale={locale} />
    </Suspense>
  )
}
