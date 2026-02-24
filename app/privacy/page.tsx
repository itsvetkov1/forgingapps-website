import Link from 'next/link'
import { Metadata } from 'next'

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

export default function Privacy() {
  return (
    <article className="bg-forge-dark min-h-screen py-16">
      <div className="container-custom max-w-3xl">
        <div className="mb-12">
          <h1 className="font-cinzel text-5xl font-bold text-forge-gold mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Last updated: February 23, 2026</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-8 text-gray-300 leading-relaxed">

            <section>
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">Who We Are</h2>
              <p>
                ForgingApps is a custom app development and AI consulting studio based in Sofia, Bulgaria. This policy explains how we handle your personal data when you use our website and services.
              </p>
              <p className="mt-3">
                Contact: <a href="mailto:hello@forgingapps.com" className="text-forge-gold hover:text-forge-ember transition">hello@forgingapps.com</a>
              </p>
            </section>

            <section>
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">What Data We Collect</h2>
              <p>We collect only what you voluntarily provide through our contact form:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number (optional)</li>
                <li>Project details and message content</li>
                <li>Budget range and referral source (optional)</li>
              </ul>
              <p className="mt-3">
                We do not use tracking cookies, analytics scripts, or any third-party advertising tools on this website.
              </p>
            </section>

            <section>
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">How We Use Your Data</h2>
              <p>Your data is used exclusively to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Respond to your inquiry</li>
                <li>Provide a project quote or consultation</li>
                <li>Communicate about ongoing projects</li>
              </ul>
              <p className="mt-3">We do not sell, rent, or share your data with third parties for marketing purposes.</p>
            </section>

            <section>
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">Third-Party Services</h2>
              <p>This website uses the following third-party services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li><strong>Cloudflare Pages</strong> — Website hosting and CDN. Cloudflare may collect standard web server logs (IP addresses, request timestamps). See <a href="https://www.cloudflare.com/privacypolicy/" className="text-forge-gold hover:text-forge-ember transition" target="_blank" rel="noopener noreferrer">Cloudflare&apos;s Privacy Policy</a>.</li>
                <li><strong>Formspree</strong> — Contact form processing. Form submissions are routed through Formspree&apos;s servers. See <a href="https://formspree.io/legal/privacy-policy" className="text-forge-gold hover:text-forge-ember transition" target="_blank" rel="noopener noreferrer">Formspree&apos;s Privacy Policy</a>.</li>
                <li><strong>Google Fonts</strong> — Web fonts are loaded from Google&apos;s servers. See <a href="https://policies.google.com/privacy" className="text-forge-gold hover:text-forge-ember transition" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">Cookies</h2>
              <p>
                This website does not set any first-party cookies. Cloudflare may set essential security cookies as part of its CDN service. No tracking or advertising cookies are used.
              </p>
            </section>

            <section>
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">Your Rights (GDPR)</h2>
              <p>As we are based in the EU (Bulgaria), you have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Data portability</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, email us at <a href="mailto:hello@forgingapps.com" className="text-forge-gold hover:text-forge-ember transition">hello@forgingapps.com</a>. We will respond within 30 days.
              </p>
            </section>

            <section>
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">Data Retention</h2>
              <p>
                Contact form submissions are retained for as long as necessary to respond to your inquiry and for a reasonable period afterward in case of follow-up. Project-related communications are retained for the duration of the business relationship plus 5 years for legal compliance.
              </p>
            </section>

            <section>
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">Changes to This Policy</h2>
              <p>
                We may update this policy from time to time. Changes will be posted on this page with an updated date. Continued use of the website after changes constitutes acceptance.
              </p>
            </section>

          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-forge-ember/20">
          <Link href="/" className="text-forge-gold hover:text-forge-ember transition">
            ← Back to Home
          </Link>
        </div>
      </div>
    </article>
  )
}
