import { Metadata } from 'next'
import BlogPostContent from '@/app/blog/BlogPostContent'

export const metadata: Metadata = {
  title: 'How We Won the umlaut Secure App Award -- Twice | ForgingApps Blog',
  description: "What it takes to pass umlaut's security certification, why most apps fail, and what it means when your developer has done it twice.",
  alternates: { canonical: 'https://forgingapps.com/blog/umlaut-secure-app-award' },
  openGraph: {
    title: 'How We Won the umlaut Secure App Award -- Twice | ForgingApps Blog',
    description: "What it takes to pass umlaut's security certification, why most apps fail, and what it means when your developer has done it twice.",
    url: 'https://forgingapps.com/blog/umlaut-secure-app-award',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'umlaut Secure App Award' }],
  },
}

export default function Page() {
  return <BlogPostContent slug="umlaut-secure-app-award" />
}
