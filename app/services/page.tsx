import { Metadata } from 'next'
import ServicesContent from '@/app/services/ServicesContent'

export const metadata: Metadata = {
  title: 'Service Packages -- App Development Pricing | ForgingApps',
  description: 'From €300 landing pages to €20K full MVPs. Transparent pricing with a 25% launch discount. Flutter, Kotlin, React, AI integration.',
  alternates: {
    canonical: 'https://forgingapps.com/services',
  },
  openGraph: {
    title: 'Service Packages -- App Development Pricing | ForgingApps',
    description: 'From €300 landing pages to €20K full MVPs. Transparent pricing with a 25% launch discount.',
    url: 'https://forgingapps.com/services',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'ForgingApps Service Packages' }],
  },
}

export default function ServicesPage() {
  return <ServicesContent />
}
