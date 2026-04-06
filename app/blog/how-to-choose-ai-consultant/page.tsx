import { Metadata } from 'next'
import BlogPostContent from '@/app/blog/BlogPostContent'

export const metadata: Metadata = {
  title: 'How to Choose an AI Consulting Partner (Without Getting Burned) | ForgingApps Blog',
  description: 'The AI consulting market is full of noise. Here is how to separate people who build useful systems from people who just sell the idea of AI.',
  alternates: { canonical: 'https://forgingapps.com/blog/how-to-choose-ai-consultant' },
  openGraph: {
    title: 'How to Choose an AI Consulting Partner (Without Getting Burned) | ForgingApps Blog',
    description: 'The AI consulting market is full of noise. Here is how to separate people who build useful systems from people who just sell the idea of AI.',
    url: 'https://forgingapps.com/blog/how-to-choose-ai-consultant',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'How to Choose an AI Consulting Partner' }],
  },
}

export default function Page() {
  return <BlogPostContent slug="how-to-choose-ai-consultant" />
}
