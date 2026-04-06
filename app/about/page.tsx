import { Metadata } from 'next'
import AboutContent from '@/app/about/AboutContent'

export const metadata: Metadata = {
  title: 'About Us -- The Team Behind ForgingApps',
  description: 'Two senior developers building custom apps and AI solutions. Direct access, no middlemen, enterprise quality at startup prices.',
  alternates: {
    canonical: 'https://forgingapps.com/about',
  },
  openGraph: {
    title: 'About Us -- The Team Behind ForgingApps',
    description: 'Two senior developers building custom apps and AI solutions. Direct access, no middlemen, enterprise quality at startup prices.',
    url: 'https://forgingapps.com/about',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'About ForgingApps' }],
  },
}

export default function AboutPage() {
  return <AboutContent />
}
