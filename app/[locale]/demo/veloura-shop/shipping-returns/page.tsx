import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import DemoInfoPage from '../DemoInfoPage'
import { isLocale } from '@/lib/i18n/routing'

export const metadata: Metadata = {
  title: 'Shipping & Returns — Veloura',
  description: 'Veloura demo policy page for shipping, delivery timing, and returns.',
}

export default async function LocalizedShippingReturnsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <DemoInfoPage
      eyebrow="Veloura help"
      title="Shipping & Returns"
      intro="This demo policy page shows how operational content can stay on-brand while giving shoppers fast answers about delivery expectations and post-purchase options."
      paragraphs={[
        'Standard delivery in the Veloura demo experience is framed around 3 to 5 business days, with an express option available for customers who need their order sooner. Messaging like this helps support both the storefront and the AI assistant with one consistent source of truth.',
        'Returns are presented as straightforward and customer-friendly: items should be unworn, unwashed, and sent back with original tags attached. A real implementation would connect these rules to country-specific return windows, labels, and refund timing.',
        'The goal is clarity, not legalese. We use lightweight policy pages like this to reduce friction, cut repetitive support questions, and make the overall storefront feel more complete during demo walkthroughs.',
      ]}
    />
  )
}
