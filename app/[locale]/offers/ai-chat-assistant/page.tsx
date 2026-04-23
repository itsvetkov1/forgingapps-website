import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AiChatAssistantContent from './AiChatAssistantContent'
import { translations } from '@/lib/i18n/translations'
import { buildLocaleAlternates, buildOg, buildTwitterCard } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = translations[locale]?.aiChatAssistantV2?.hero
  const title = t ? `${t.headline} | ForgingApps` : 'AI Chat Assistant | ForgingApps'
  const description = t?.subhead ?? ''
  return { title, description, alternates: buildLocaleAlternates(locale, '/offers/ai-chat-assistant'), openGraph: buildOg(`/${locale}/offers/ai-chat-assistant`, title, description), twitter: buildTwitterCard(title, description) }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const copy = translations[locale]?.aiChatAssistantV2
  return <AiChatAssistantContent locale={locale} copy={copy} />
}
