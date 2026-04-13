import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const title = 'Care Instructions — Veloura Demo'
  const description = 'Veloura demo garment care guide for premium everyday essentials.'

  return {
    title,
    description,
    ...buildPageMetadata(locale, '/demo/veloura-shop/care-instructions', title, description, '/veloura/products/heavyweight-hoodie.jpg', 'Veloura garment care preview image'),
  }
}

export default async function LocalizedCareInstructionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">Veloura help</p>
      <h1 className="mb-4 text-4xl font-bold text-gray-900">Care Instructions</h1>
      <p className="max-w-2xl mb-10 text-base leading-7 text-gray-600">
        Following these guidelines will help your Veloura pieces keep their shape, colour, and feel through repeated wear and washing.
      </p>

      <div className="mb-10 space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">General Care</h2>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 text-sm text-gray-600">
            {[
              'Machine wash cold, inside out',
              'Use a gentle cycle with mild detergent',
              'Tumble dry low or hang dry',
              'Do not bleach',
              'Iron on low heat if needed',
              'Remove promptly from the wash to avoid colour transfer',
              'Wash with similar colours only',
              'Do not dry clean any Veloura pieces',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 text-gray-400">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Care by Category</h2>
          <div className="space-y-5">
            <div>
              <h3 className="mb-2 text-base font-semibold text-gray-800">Hoodies & Sweatshirts</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>— Machine wash cold, inside out, gentle cycle</li>
                <li>— Air dry or tumble dry low — <strong>high heat damages the fleece structure</strong></li>
                <li>— Do not iron the printed or embroidered areas</li>
                <li>— Zip-up styles: close all zippers before washing to protect the teeth</li>
              </ul>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <h3 className="mb-2 text-base font-semibold text-gray-800">T-shirts & Tops</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>— Machine wash cold, inside out</li>
                <li>— Gentle cycle recommended</li>
                <li>— Remove from the wash promptly to prevent creasing</li>
                <li>— Tumble dry low or lay flat to dry</li>
                <li>— Iron on low heat inside out — avoid direct heat on prints</li>
              </ul>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <h3 className="mb-2 text-base font-semibold text-gray-800">Pants & Joggers</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>— Wash inside out with similar colours</li>
                <li>— Close any zippers before washing to avoid snagging</li>
                <li>— Tumble dry low or hang to dry</li>
                <li>— Iron on low heat inside out if needed</li>
              </ul>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <h3 className="mb-2 text-base font-semibold text-gray-800">Jackets & Outerwear</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>— Spot clean where possible before full washing</li>
                <li>— Machine wash delicate, cold, inside out</li>
                <li>— <strong>Air dry only</strong> — high heat breaks down technical or coated fabrics</li>
                <li>— Do not iron technical shell fabrics</li>
              </ul>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <h3 className="mb-2 text-base font-semibold text-gray-800">Accessories (bags, caps, other)</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>— Spot clean with a damp cloth or hand wash in cold water</li>
                <li>— Air dry only — do not tumble dry caps or structured bags</li>
                <li>— Do not machine wash structured accessories</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-bold text-gray-900">Storing Your Pieces</h2>
          <p className="text-sm text-gray-600 leading-6">
            Fold hoodies and heavier pieces to prevent shoulder stretching. Hang T-shirts and lighter tops on wide, padded hangers to keep the collar shape. Store in a dry place — moisture can cause mildew on natural fibre blends even when the garment appears clean.
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        This page is part of the <Link href="/en/demo/veloura-shop" className="underline hover:text-gray-600">Veloura demo storefront</Link> by ForgingApps.
      </p>
    </div>
  )
}