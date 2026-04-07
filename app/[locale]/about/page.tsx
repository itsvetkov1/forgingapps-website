import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AboutContent from '@/app/about/AboutContent'
import { translations } from '@/lib/i18n/translations'
import { buildLocaleAlternates, buildOg } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const data = translations[locale].about
  const title = `${data.whyHeading} | ForgingApps`
  const description = data.whyP1
  return { title, description, alternates: buildLocaleAlternates(locale, '/about'), openGraph: buildOg(`/${locale}/about`, title, description) }
}

export default async function LocaleAboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <AboutContent />
}
