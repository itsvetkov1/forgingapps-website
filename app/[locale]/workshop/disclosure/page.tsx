import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DisclosureContent from '@/app/workshop/DisclosureContent'
import { buildPageMetadata } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return buildPageMetadata(locale, '/workshop/disclosure', 'AI Operations Disclosure | ForgingApps', 'Disclosure for autonomous AI agents operating in the ForgingApps Workshop.')
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <DisclosureContent />
}
