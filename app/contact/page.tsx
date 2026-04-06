import { Metadata } from 'next'
import ContactContent from '@/app/contact/ContactContent'

export const metadata: Metadata = {
  title: 'Contact ForgingApps -- Free Consultation',
  alternates: {
    canonical: 'https://forgingapps.com/contact',
  },
  openGraph: {
    title: 'Contact ForgingApps -- Free Consultation',
    description: 'Get a free 30-minute consultation. Tell us about your project. Response within 24 hours.',
    url: 'https://forgingapps.com/contact',
  },
  description: 'Get a free 30-minute consultation. Tell us about your project and we\'ll recommend the right package. Response within 24 hours.',
}

export default function ContactPage() {
  return <ContactContent />
}
