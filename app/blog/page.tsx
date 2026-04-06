import { Metadata } from 'next'
import BlogContent from '@/app/blog/BlogContent'

export const metadata: Metadata = {
  title: 'From the Forge -- AI & App Development Blog | ForgingApps',
  description: 'Insights on AI for business, app development costs, and building products that last. By the team at ForgingApps.',
  alternates: {
    canonical: 'https://forgingapps.com/blog',
  },
  openGraph: {
    title: 'From the Forge -- AI & App Development Blog | ForgingApps',
    description: 'Insights on AI for business, app development costs, and building products that last.',
    url: 'https://forgingapps.com/blog',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'ForgingApps Blog' }],
  },
}

export default function Blog() {
  return <BlogContent />
}
