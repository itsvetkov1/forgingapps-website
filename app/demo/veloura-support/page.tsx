import { Metadata } from 'next'
import VelouraSupportDemoClient from './VelouraSupportDemoClient'

export const metadata: Metadata = {
  title: 'Veloura Support Demo -- AI Customer Support Showcase | ForgingApps',
  description: 'Embedded demo of an AI customer support assistant for apparel brands. Test shipping, returns, sizing, and product guidance flows directly on the page.',
  alternates: {
    canonical: 'https://forgingapps.com/demo/veloura-support',
  },
  openGraph: {
    title: 'Veloura Support Demo -- AI Customer Support Showcase | ForgingApps',
    description: 'Embedded demo of an AI customer support assistant for apparel brands.',
    url: 'https://forgingapps.com/demo/veloura-support',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Veloura Support Demo' }],
  },
}

export default function VelouraSupportDemo() {
  return <VelouraSupportDemoClient />
}
