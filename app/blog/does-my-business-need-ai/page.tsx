import { Metadata } from 'next'
import BlogPostContent from '@/app/blog/BlogPostContent'

export const metadata: Metadata = {
  title: 'Does My Business Need AI? An Honest Checklist | ForgingApps Blog',
  description: 'Not every business needs AI. Some need a better process. Some need a spreadsheet. Some are leaving serious leverage on the table.',
  alternates: { canonical: 'https://forgingapps.com/blog/does-my-business-need-ai' },
  openGraph: {
    title: 'Does My Business Need AI? An Honest Checklist | ForgingApps Blog',
    description: 'Not every business needs AI. Some need a better process. Some need a spreadsheet. Some are leaving serious leverage on the table.',
    url: 'https://forgingapps.com/blog/does-my-business-need-ai',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Does My Business Need AI?' }],
  },
}

export default function Page() {
  return <BlogPostContent slug="does-my-business-need-ai" />
}
