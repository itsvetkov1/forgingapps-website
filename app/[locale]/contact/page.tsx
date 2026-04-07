import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ContactContent from '@/app/contact/ContactContent'
import { translations } from '@/lib/i18n/translations'
import { buildLocaleAlternates, buildOg } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const data = translations[locale].contact
  const title = `${data.heading} | ForgingApps`
  const description = data.subheading
  return { title, description, alternates: buildLocaleAlternates(locale, '/contact'), openGraph: buildOg(`/${locale}/contact`, title, description) }
}

export default async function LocaleContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <ContactContent />
}
