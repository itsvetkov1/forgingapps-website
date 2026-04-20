import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AboutContent from '@/app/about/AboutContent'
import { translations } from '@/lib/i18n/translations'
import { buildLocaleAlternates, buildOg, buildTwitterCard } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const data = translations[locale].about
  const title = `${data.whyHeading} | ForgingApps`
  const description =
    locale === 'bg'
      ? 'ForgingApps създава персонализиран софтуер и AI решения за растящи бизнеси — директно с основателите и с корпоративен стандарт на изпълнение.'
      : 'ForgingApps builds custom software and AI systems for growing businesses — founder-led delivery, enterprise-grade standards, and direct collaboration.'
  return { title, description, alternates: buildLocaleAlternates(locale, '/about'), openGraph: buildOg(`/${locale}/about`, title, description), twitter: buildTwitterCard(title, description) }
}

export default async function LocaleAboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <AboutContent />
}
