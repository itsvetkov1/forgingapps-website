import { Metadata } from 'next'
import BlogPostContent from '@/app/blog/BlogPostContent'

export const metadata: Metadata = {
  title: 'AI for Small Business: Where to Start in 2026 | ForgingApps Blog',
  description: "You've heard the hype. Here's what AI actually does for businesses your size -- and what to try first.",
  alternates: { canonical: 'https://forgingapps.com/blog/ai-for-small-business' },
  openGraph: {
    title: 'AI for Small Business: Where to Start in 2026 | ForgingApps Blog',
    description: "You've heard the hype. Here's what AI actually does for businesses your size -- and what to try first.",
    url: 'https://forgingapps.com/blog/ai-for-small-business',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'AI for Small Business' }],
  },
}

export default function Page() {
  return <BlogPostContent slug="ai-for-small-business" />
}
