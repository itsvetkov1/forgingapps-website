import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AIConsultingContent from '@/app/ai-consulting/AIConsultingContent'
import { translations } from '@/lib/i18n/translations'
import { buildLocaleAlternates, buildOg, buildTwitterCard } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const data = translations[locale].aiConsulting
  const title = `${data.heroHeadline} | ForgingApps`
  const description = data.heroSubheadline
  return { title, description, alternates: buildLocaleAlternates(locale, '/ai-consulting'), openGraph: buildOg(`/${locale}/ai-consulting`, title, description), twitter: buildTwitterCard(title, description) }
}

export default async function LocaleAIConsultingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <AIConsultingContent />
}
