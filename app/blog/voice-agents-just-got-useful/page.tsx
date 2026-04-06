import { Metadata } from 'next'
import BlogPostContent from '@/app/blog/BlogPostContent'

export const metadata: Metadata = {
  title: 'Voice Agents Just Got a Lot More Useful. Here\'s What That Means for Businesses. | ForgingApps Blog',
  description: 'The latest audio model push is not just a demo upgrade. It changes what voice agents can realistically do for support, sales, and operations.',
  alternates: { canonical: 'https://forgingapps.com/blog/voice-agents-just-got-useful' },
  openGraph: {
    title: 'Voice Agents Just Got a Lot More Useful. Here\'s What That Means for Businesses. | ForgingApps Blog',
    description: 'The latest audio model push is not just a demo upgrade. It changes what voice agents can realistically do for support, sales, and operations.',
    url: 'https://forgingapps.com/blog/voice-agents-just-got-useful',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Voice Agents Just Got a Lot More Useful.' }],
  },
}

export default function Page() {
  return <BlogPostContent slug="voice-agents-just-got-useful" />
}
