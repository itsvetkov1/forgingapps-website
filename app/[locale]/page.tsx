import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HomeContent from '@/app/HomeContent'
import { translations } from '@/lib/i18n/translations'
import { buildLocaleAlternates, buildOg } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const data = translations[locale]
  const title = locale === 'bg'
    ? 'ForgingApps | Разработка на приложения и AI консултиране | София, България'
    : 'ForgingApps | Custom App Development & AI Consulting | Sofia, Bulgaria'
  const description = data.home.subheadline

  return {
    title,
    description,
    alternates: buildLocaleAlternates(locale, '/'),
    openGraph: buildOg(`/${locale}`, title, description),
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] },
  }
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ForgingApps',
    url: `https://forgingapps.com/${locale}`,
    logo: 'https://forgingapps.com/logo.svg',
    description:
      locale === 'bg'
        ? 'Студио за персонализиран софтуер и AI консултиране'
        : 'Custom software development and AI consulting studio',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sofia',
      addressCountry: 'BG',
    },
    founders: [
      { '@type': 'Person', name: 'Ivaylo Tsvetkov', jobTitle: 'Founder, AI & Ops' },
      { '@type': 'Person', name: 'Radoslav Lambrev', jobTitle: 'Co-Founder & Lead Developer' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <HomeContent />
    </>
  )
}
