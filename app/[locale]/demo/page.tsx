import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DemoContent from '@/app/demo/DemoContent'
import { translations } from '@/lib/i18n/translations'
import { buildLocaleAlternates, buildOg } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const data = translations[locale].demo.support
  const title = `${data.heading} | ForgingApps`
  const description = data.description
  return { title, description, alternates: buildLocaleAlternates(locale, '/demo'), openGraph: buildOg(`/${locale}/demo`, title, description) }
}

export default async function LocaleDemoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <DemoContent />
}
