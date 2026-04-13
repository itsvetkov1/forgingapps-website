import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AIConsultingContent from '@/app/ai-consulting/AIConsultingContent'
import { translations } from '@/lib/i18n/translations'
import { buildLocaleAlternates, buildOg, buildTwitterCard } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const data = translations[locale].aiConsulting
  const title = `${data.heroHeadline} | ForgingApps`
  const description = data.heroSubheadline
  return { title, description, alternates: buildLocaleAlternates(locale, '/ai-consulting'), openGraph: buildOg(`/${locale}/ai-consulting`, title, description), twitter: buildTwitterCard(title, description) }
}

export default async function LocaleAIConsultingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const data = translations[locale].aiConsulting
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: locale === 'bg' ? 'ForgingApps AI консултиране' : 'ForgingApps AI Consulting',
    url: `https://forgingapps.com/${locale}/ai-consulting`,
    description: data.heroSubheadline,
    provider: {
      '@type': 'Organization',
      name: 'ForgingApps',
      url: 'https://forgingapps.com',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sofia',
      addressCountry: 'BG',
    },
    areaServed: [
      { '@type': 'Country', name: 'Bulgaria' },
      { '@type': 'Continent', name: 'Europe' },
    ],
    serviceType: locale === 'bg' ? 'AI консултиране и внедряване' : 'AI consulting and integration',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: data.servicesHeading,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: data.aiReadinessSprint.title,
            description: data.aiReadinessSprint.description,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: data.aiChatAssistant.title,
            description: data.aiChatAssistant.description,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: data.hourlyConsulting.title,
            description: data.hourlyConsulting.description,
          },
        },
      ],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }} />
      <AIConsultingContent />
    </>
  )
}
