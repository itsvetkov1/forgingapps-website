import { Metadata } from 'next'
import DemoContent from '@/app/demo/DemoContent'

export const metadata: Metadata = {
  title: 'Live Demos — See What We Build | ForgingApps',
  description:
    'Explore live demos of our work: a full e-commerce storefront and an AI-powered customer support assistant, both built for the fictional brand Veloura.',
  alternates: { canonical: 'https://forgingapps.com/demo' },
  openGraph: {
    title: 'Live Demos — See What We Build | ForgingApps',
    description:
      'Explore live demos: a full e-commerce storefront and an AI customer support assistant.',
    url: 'https://forgingapps.com/demo',
  },
}

export default function DemoPage() {
  return <DemoContent />
}
