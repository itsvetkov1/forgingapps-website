import { Metadata } from 'next'
import HomeContent from '@/app/HomeContent'

export const metadata: Metadata = {
  title: 'ForgingApps -- Custom App Development & AI Consulting | Sofia, Bulgaria',
  description: 'Custom mobile and web applications built by senior developers. AI consulting, cross-platform apps, and startup-friendly pricing. Based in Sofia, serving Europe.',
  alternates: { canonical: 'https://forgingapps.com' },
  openGraph: {
    title: 'ForgingApps -- Custom App Development & AI Consulting',
    description: 'Apps built to last. Senior developers, AI-powered delivery, startup-friendly pricing.',
    url: 'https://forgingapps.com',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'ForgingApps' }],
  },
}

export default function Home() {
  return <HomeContent />
}
