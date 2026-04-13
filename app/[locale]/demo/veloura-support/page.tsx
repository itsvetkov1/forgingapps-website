import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import VelouraSupportDemo from '@/app/demo/veloura-support/page'
import { buildPageMetadata } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const title = 'Veloura Support Live Demo | AI Customer Support Showcase | ForgingApps'
  const description = 'Embedded live demo of an AI customer support assistant for apparel brands. Test shipping, returns, sizing, and product guidance flows directly on the page.'

  return {
    title,
    description,
    ...buildPageMetadata(locale, '/demo/veloura-support', title, description),
  }
}

export default async function LocalizedVelouraSupportDemo({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <VelouraSupportDemo />
}
