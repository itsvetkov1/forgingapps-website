import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import DemoInfoPage from '../DemoInfoPage'
import { isLocale } from '@/lib/i18n/routing'

export const metadata: Metadata = {
  title: 'Care Instructions — Veloura',
  description: 'Veloura demo garment care guidance for premium everyday essentials.',
}

export default async function LocalizedCareInstructionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <DemoInfoPage
      eyebrow="Veloura help"
      title="Care Instructions"
      intro="Care guidance is a small detail that makes a demo storefront feel real. This page shows how a brand can present useful maintenance advice without breaking the premium visual tone of the shop."
      paragraphs={[
        'Veloura essentials are positioned as durable wardrobe staples, so the demo copy recommends cold washing, inside-out cycles, and low-heat drying whenever possible. Guidance like this supports product longevity and reinforces perceived quality.',
        'Structured pieces such as heavyweight hoodies and outerwear benefit from air drying between wears, while tees and basics can be refreshed with gentler wash cycles. In a production storefront, these notes could be generated per product from catalog attributes.',
        'We keep the language simple and practical so customers can find what they need quickly. The same content can also power contextual answers in the embedded support assistant when shoppers ask how to care for a specific item.',
      ]}
    />
  )
}
