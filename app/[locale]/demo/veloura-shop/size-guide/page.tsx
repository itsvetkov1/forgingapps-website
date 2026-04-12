import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import DemoInfoPage from '../DemoInfoPage'
import { isLocale } from '@/lib/i18n/routing'

export const metadata: Metadata = {
  title: 'Size Guide — Veloura',
  description: 'Veloura demo size guidance for tops, outerwear, and relaxed essentials.',
}

export default async function LocalizedSizeGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <DemoInfoPage
      eyebrow="Veloura help"
      title="Size Guide"
      intro="Veloura pieces are designed around relaxed everyday silhouettes, with enough structure to keep their shape through repeated wear. Use this guide as a demo example of how branded support content can live directly inside the storefront."
      paragraphs={[
        'Most customers choose their usual size for a clean relaxed fit. If you prefer a more oversized drape in hoodies or outerwear, size up once and compare chest width against a favorite piece you already own.',
        'Our heavyweight styles are cut roomier through the shoulders, while tees and lightweight layers sit slightly closer to the body. Each product page can surface exact measurements, recommended fits, and sizing nudges for different preferences.',
        'For a real client build, we would tailor this section to the brand’s production measurements, returns policy, and region-specific conversion notes so customers can self-serve confidently before checkout.',
      ]}
    />
  )
}
