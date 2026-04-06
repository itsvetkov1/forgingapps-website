import { Metadata } from 'next'
import BlogPostContent from '@/app/blog/BlogPostContent'

export const metadata: Metadata = {
  title: 'Why We Started ForgingApps | ForgingApps Blog',
  description: "Two senior developers walk out of the enterprise forge. This is why -- and what we're building instead.",
  alternates: { canonical: 'https://forgingapps.com/blog/why-we-started-forgingapps' },
  openGraph: {
    title: 'Why We Started ForgingApps | ForgingApps Blog',
    description: "Two senior developers walk out of the enterprise forge. This is why -- and what we're building instead.",
    url: 'https://forgingapps.com/blog/why-we-started-forgingapps',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Why We Started ForgingApps' }],
  },
}

export default function Page() {
  return <BlogPostContent slug="why-we-started-forgingapps" />
}
