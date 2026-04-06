import { Metadata } from 'next'
import TermsContent from '@/app/terms/TermsContent'

export const metadata: Metadata = {
  title: 'Terms of Service | ForgingApps',
  description: 'Terms and conditions for ForgingApps custom app development and AI consulting services.',
  alternates: {
    canonical: 'https://forgingapps.com/terms',
  },
  openGraph: {
    title: 'Terms of Service | ForgingApps',
    description: 'Terms and conditions for ForgingApps custom app development and AI consulting services.',
    url: 'https://forgingapps.com/terms',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'ForgingApps Terms of Service' }],
  },
}

export default function TermsPage() {
  return <TermsContent />
}
