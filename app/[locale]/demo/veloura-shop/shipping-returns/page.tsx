import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const title = 'Shipping & Returns — Veloura Demo'
  const description = 'Veloura demo shipping policy and returns process.'

  return {
    title,
    description,
    ...buildPageMetadata(locale, '/demo/veloura-shop/shipping-returns', title, description, '/veloura/hero.jpg', 'Veloura shipping and returns demo image'),
  }
}

export default async function LocalizedShippingReturnsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">Veloura help</p>
      <h1 className="mb-4 text-4xl font-bold text-gray-900">Shipping & Returns</h1>
      <p className="max-w-2xl mb-10 text-base leading-7 text-gray-600">
        Everything you need to know about getting your order and managing returns.
      </p>

      <div className="mb-10 space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Shipping</h2>

          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="mb-1 text-xs uppercase tracking-wide text-gray-500">Standard EU</p>
                <p className="text-2xl font-bold text-gray-900">3–5 days</p>
                <p className="mt-1 text-sm text-gray-600">Free on orders over €60</p>
                <p className="text-xs text-gray-500 mt-1">1-day processing</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="mb-1 text-xs uppercase tracking-wide text-gray-500">Express EU</p>
                <p className="text-2xl font-bold text-gray-900">1–2 days</p>
                <p className="mt-1 text-sm text-gray-600">€8.95 per order</p>
                <p className="text-xs text-gray-500 mt-1">1-day processing</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="mb-1 text-xs uppercase tracking-wide text-gray-500">Tracking</p>
                <p className="text-lg font-bold text-gray-900">Email update</p>
                <p className="mt-1 text-sm text-gray-600">Tracking link sent once dispatched</p>
                <p className="text-xs text-gray-500 mt-1">1-day processing before dispatch</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-6">
              Orders placed before 14:00 CET are processed the same day. After that, they go out the following business day. All EU orders are shipped from our EU fulfillment centre.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Returns</h2>

          <div className="space-y-4 text-sm text-gray-600 leading-7">
            <div className="grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
              <div>
                <p className="font-semibold text-gray-900">Return window</p>
                <p>30 days from delivery</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Condition</p>
                <p>Unworn, unwashed, with original tags attached</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Return shipping</p>
                <p><strong>Free</strong> for EU orders — pre-paid label sent by email</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Refund timing</p>
                <p>Processed within <strong>5–7 business days</strong> of receiving the return</p>
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
              <p className="text-sm font-medium">Sale items</p>
              <p className="text-sm mt-1">Sale items are final and cannot be returned or exchanged.</p>
            </div>

            <p>Refunds are issued to the original payment method. If the order was placed with a discount code, the refund reflects the paid amount after promo adjustment.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-bold text-gray-900">Exchanges</h2>
          <p className="text-sm text-gray-600 leading-6">
            We offer <strong>one free size exchange per order</strong> if the item is in stock in the desired size. To start an exchange, contact our support team at{' '}
            <a href="mailto:support@veloura.com" className="text-gray-900 underline">support@veloura.com</a>{' '}
            with your order number and the size you need. We will check availability and send a replacement label if everything checks out.
          </p>
          <p className="mt-3 text-sm text-gray-600">
            Exchanges are subject to stock availability. If the requested size is out of stock, we will offer a refund or suggest an alternative.
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        This page is part of the <Link href="/en/demo/veloura-shop" className="underline hover:text-gray-600">Veloura demo storefront</Link> by ForgingApps.
      </p>
    </div>
  )
}