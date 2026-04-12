import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import VelouraSupportDemo from '@/app/demo/veloura-support/page'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  return {
    title: 'Veloura Support Demo | AI Customer Support Showcase | ForgingApps',
    description: 'Embedded demo of an AI customer support assistant for apparel brands. Test shipping, returns, sizing, and product guidance flows directly on the page.',
    alternates: { canonical: `https://forgingapps.com/${locale}/demo/veloura-support` },
    openGraph: {
      title: 'Veloura Support Demo | AI Customer Support Showcase | ForgingApps',
      description: 'Embedded demo of an AI customer support assistant for apparel brands.',
      url: `https://forgingapps.com/${locale}/demo/veloura-support`,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Veloura Support Demo' }],
    },
  }
}

export default async function LocalizedVelouraSupportDemo({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <VelouraSupportDemo />
}
