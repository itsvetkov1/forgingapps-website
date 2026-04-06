import { Metadata } from 'next'
import BlogPostContent from '@/app/blog/BlogPostContent'

export const metadata: Metadata = {
  title: 'Why ForgingApps for AI Consulting | ForgingApps Blog',
  description: 'Who we are, how we work, what we actually build, and why clients choose a small senior team over bloated process and vague AI promises.',
  alternates: { canonical: 'https://forgingapps.com/blog/why-forgingapps-ai' },
  openGraph: {
    title: 'Why ForgingApps for AI Consulting | ForgingApps Blog',
    description: 'Who we are, how we work, what we actually build, and why clients choose a small senior team over bloated process and vague AI promises.',
    url: 'https://forgingapps.com/blog/why-forgingapps-ai',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Why ForgingApps for AI Consulting' }],
  },
}

export default function Page() {
  return <BlogPostContent slug="why-forgingapps-ai" />
}
