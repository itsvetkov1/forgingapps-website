import { Metadata } from 'next'
import AIConsultingContent from '@/app/ai-consulting/AIConsultingContent'

export const metadata: Metadata = {
  title: 'AI Consulting for Business -- The Oracle | ForgingApps',
  description: 'Practical AI consulting starting at €60/hr. Strategy, chatbots, automation, integration. No enterprise pricing. Based in Sofia, serving Europe.',
  alternates: {
    canonical: 'https://forgingapps.com/ai-consulting',
  },
  openGraph: {
    title: 'AI Consulting for Business -- The Oracle | ForgingApps',
    description: 'Practical AI consulting starting at €60/hr. Strategy, chatbots, automation, integration. No enterprise pricing.',
    url: 'https://forgingapps.com/ai-consulting',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'ForgingApps AI Consulting' }],
  },
}

export default function AIConsultingPage() {
  return <AIConsultingContent />
}
