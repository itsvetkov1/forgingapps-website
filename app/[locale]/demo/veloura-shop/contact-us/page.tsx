import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import DemoInfoPage from '../DemoInfoPage'
import { isLocale } from '@/lib/i18n/routing'

export const metadata: Metadata = {
  title: 'Contact Us — Veloura',
  description: 'Veloura demo contact page showing how support and sales contact details can be presented.',
}

export default async function LocalizedContactUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <DemoInfoPage
      eyebrow="Veloura help"
      title="Contact Us"
      intro="This contact page shows the final layer of trust-building content in the Veloura storefront: a clear place to reach support, sales, or post-purchase help when self-service is not enough."
      paragraphs={[
        'For a live client storefront, we would place the brand’s preferred support channels here, such as email, response-hour expectations, and order-help guidance. The page can stay intentionally lean while still giving customers a reliable next step.',
        'This version focuses on structure and tone while showing how help content can fit naturally into the same premium storefront style as product and category pages.',
        'In a production build, this page would often connect directly to CRM forms, support routing, or a branded assistant handoff so the customer never feels dropped between browsing and service.',
      ]}
    />
  )
}
