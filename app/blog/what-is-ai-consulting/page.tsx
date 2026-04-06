import { Metadata } from 'next'
import BlogPostContent from '@/app/blog/BlogPostContent'

export const metadata: Metadata = {
  title: 'What Is AI Consulting? (And What It Isn\'t) | ForgingApps Blog',
  description: 'Most people hear AI consulting and picture overpriced slide decks or a chatbot with a logo on it. The reality is more useful than either.',
  alternates: { canonical: 'https://forgingapps.com/blog/what-is-ai-consulting' },
  openGraph: {
    title: 'What Is AI Consulting? (And What It Isn\'t) | ForgingApps Blog',
    description: 'Most people hear AI consulting and picture overpriced slide decks or a chatbot with a logo on it. The reality is more useful than either.',
    url: 'https://forgingapps.com/blog/what-is-ai-consulting',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'What Is AI Consulting?' }],
  },
}

export default function Page() {
  return <BlogPostContent slug="what-is-ai-consulting" />
}
