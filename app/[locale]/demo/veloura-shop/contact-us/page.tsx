import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/VelouraContactForm'
import { buildPageMetadata } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const title = 'Contact Us — Veloura Demo'
  const description = 'Veloura demo contact information for support, orders, and sizing questions.'

  return {
    title,
    description,
    ...buildPageMetadata(locale, '/demo/veloura-shop/contact-us', title, description, '/veloura/hero.jpg', 'Veloura demo contact page image'),
  }
}

export default async function LocalizedContactUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">Veloura help</p>
      <h1 className="mb-4 text-4xl font-bold text-gray-900">Contact Us</h1>
      <p className="max-w-2xl mb-10 text-base leading-7 text-gray-600">
        Our support team is here for orders, returns, sizing questions, and anything else you need.
      </p>

      <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Email Support</h2>
            <p className="text-sm text-gray-600 leading-6 mb-4">
              For the fastest response, email us directly. We respond to all inquiries within <strong>one business day</strong>, Monday to Friday.
            </p>
            <a
              href="mailto:support@veloura.com"
              className="inline-block rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 transition"
            >
              support@veloura.com
            </a>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-bold text-gray-900">Response Hours</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong className="text-gray-900">Monday – Friday:</strong> 09:00 – 18:00 CET</p>
              <p>We aim to reply to all messages within one business day. Messages sent on weekends or public holidays are handled on the next working day.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-bold text-gray-900">What We Help With</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                'Order status and tracking',
                'Returns and exchange requests',
                'Sizing advice before purchase',
                'Product availability questions',
                'Payment or discount code issues',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 text-gray-400">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-bold text-gray-900">Try the Support Assistant First</h2>
            <p className="text-sm text-gray-600 leading-6 mb-4">
              Our embedded support assistant can answer common questions about products, sizing, shipping, and returns instantly — at any time of day.
            </p>
            <Link
              href="/en/demo/veloura-support"
              className="inline-block rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Open Veloura Support Demo →
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Send a Message</h2>
          <ContactForm />
        </div>
      </div>

      <p className="text-xs text-gray-400">
        This page is part of the <Link href="/en/demo/veloura-shop" className="underline hover:text-gray-600">Veloura demo storefront</Link> by ForgingApps.
      </p>
    </div>
  )
}