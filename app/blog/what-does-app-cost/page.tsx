import { Metadata } from 'next'
import BlogPostContent from '@/app/blog/BlogPostContent'

export const metadata: Metadata = {
  title: 'What Does an App Really Cost in 2026? | ForgingApps Blog',
  description: 'The real numbers. No fluff. A transparent breakdown of app development pricing in Bulgaria and beyond.',
  alternates: { canonical: 'https://forgingapps.com/blog/what-does-app-cost' },
  openGraph: {
    title: 'What Does an App Really Cost in 2026? | ForgingApps Blog',
    description: 'The real numbers. No fluff. A transparent breakdown of app development pricing in Bulgaria and beyond.',
    url: 'https://forgingapps.com/blog/what-does-app-cost',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'What Does an App Really Cost in 2026?' }],
  },
}

export default function Page() {
  return <BlogPostContent slug="what-does-app-cost" />
}
