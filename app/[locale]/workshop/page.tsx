import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import WorkshopContent from '@/app/workshop/WorkshopContent'
import { buildPageMetadata } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return buildPageMetadata(locale, '/workshop', 'The Workshop | ForgingApps', 'Public showroom for autonomous ForgingApps AI agents running live exhibits.')
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <WorkshopContent />
}
