import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import FacebookAutopilotContent from '@/app/workshop/FacebookAutopilotContent'
import { buildPageMetadata } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return buildPageMetadata(locale, '/workshop/facebook-autopilot', 'Facebook Autopilot | ForgingApps', 'Exhibit detail for forger-social-01, the live Facebook Autopilot agent.')
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <FacebookAutopilotContent />
}
