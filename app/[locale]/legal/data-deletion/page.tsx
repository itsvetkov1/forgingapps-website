import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DataDeletionContent from '@/app/legal/DataDeletionContent'
import { translations } from '@/lib/i18n/translations'
import { buildLocaleAlternates, buildOg, buildTwitterCard } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const data = translations[locale].dataDeletion
  const title = `${data.title} | ForgingApps`
  const description =
    locale === 'bg'
      ? 'Как да поискате изтриване на данни, свързани с ForgingApps, контактни форми и взаимодействия във Facebook страницата.'
      : 'How to request deletion of data associated with ForgingApps, contact forms, and Facebook Page interactions.'
  return { title, description, alternates: buildLocaleAlternates(locale, '/legal/data-deletion'), openGraph: buildOg(`/${locale}/legal/data-deletion`, title, description), twitter: buildTwitterCard(title, description) }
}

export default async function LocaleDataDeletionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <DataDeletionContent />
}
