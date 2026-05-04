import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PrivacyContent from '@/app/privacy/PrivacyContent'
import { translations } from '@/lib/i18n/translations'
import { buildLocaleAlternates, buildOg, buildTwitterCard } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const data = translations[locale].privacy
  const title = `${data.title} | ForgingApps`
  const description =
    locale === 'bg'
      ? 'Политика за поверителност на ForgingApps за уебсайта, контактните форми и Facebook страницата, включително AI модерация и заявки за изтриване.'
      : 'ForgingApps privacy policy for the website, contact forms, and Facebook Page, including AI moderation and data deletion requests.'
  return { title, description, alternates: buildLocaleAlternates(locale, '/legal/privacy'), openGraph: buildOg(`/${locale}/legal/privacy`, title, description), twitter: buildTwitterCard(title, description) }
}

export default async function LocaleLegalPrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <PrivacyContent />
}
