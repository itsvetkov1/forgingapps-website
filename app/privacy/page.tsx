import { Metadata } from 'next'
import PrivacyContent from '@/app/privacy/PrivacyContent'

export const metadata: Metadata = {
  title: 'Privacy Policy | ForgingApps',
  description: 'How ForgingApps collects, uses, and protects your personal data. GDPR compliant.',
  alternates: {
    canonical: 'https://forgingapps.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | ForgingApps',
    description: 'How ForgingApps collects, uses, and protects your personal data. GDPR compliant.',
    url: 'https://forgingapps.com/privacy',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'ForgingApps Privacy Policy' }],
  },
}

export default function PrivacyPage() {
  return <PrivacyContent />
}
