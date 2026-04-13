import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServicesContent from '@/app/services/ServicesContent'
import { translations } from '@/lib/i18n/translations'
import { buildLocaleAlternates, buildOg, buildTwitterCard } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const data = translations[locale].services
  const title = `${data.heading} | ForgingApps`
  const description = data.subheading
  return { title, description, alternates: buildLocaleAlternates(locale, '/services'), openGraph: buildOg(`/${locale}/services`, title, description), twitter: buildTwitterCard(title, description) }
}

export default async function LocaleServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const data = translations[locale].services
  const servicesSchema = [
    { slug: 'spark', pkg: data.spark },
    { slug: 'ember', pkg: data.ember },
    { slug: 'anvil', pkg: data.anvil },
    { slug: 'forge', pkg: data.forge },
    { slug: 'oracle', pkg: data.oracle },
    { slug: 'hearthstone', pkg: data.hearthstone },
  ].map(({ slug, pkg }) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${pkg.subtitle} (${pkg.name})`,
    serviceType: pkg.subtitle,
    description: pkg.description,
    provider: {
      '@type': 'Organization',
      name: 'ForgingApps',
      url: 'https://forgingapps.com',
    },
    areaServed: [
      { '@type': 'Country', name: 'Bulgaria' },
      { '@type': 'Continent', name: 'Europe' },
    ],
    url: `https://forgingapps.com/${locale}/services#${slug}`,
    offers: pkg.launchPrice
      ? {
          '@type': 'Offer',
          priceCurrency: 'EUR',
          description: pkg.launchPrice,
        }
      : undefined,
  }))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
      <ServicesContent />
    </>
  )
}
