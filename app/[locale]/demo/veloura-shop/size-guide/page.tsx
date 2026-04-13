import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const title = 'Size Guide — Veloura Demo'
  const description = 'Veloura demo size guide with measurements for tops, outerwear, and essentials.'

  return {
    title,
    description,
    ...buildPageMetadata(locale, '/demo/veloura-shop/size-guide', title, description, '/veloura/categories/hoodies.jpg', 'Veloura size guide preview image'),
  }
}

const MEASUREMENTS = [
  { row: 'Chest', xs: '51', s: '54', m: '57', l: '60', xl: '64', xxl: '68' },
  { row: 'Waist', xs: '49', s: '52', l: '58', xl: '62', xxl: '66', m: '55' },
  { row: 'Length', xs: '66', s: '69', m: '72', l: '75', xl: '78', xxl: '81' },
  { row: 'Sleeve', xs: '60', s: '62', m: '64', l: '66', xl: '68', xxl: '70' },
]

const SIZE_ORDER = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default async function LocalizedSizeGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">Veloura help</p>
      <h1 className="mb-4 text-4xl font-bold text-gray-900">Size Guide</h1>
      <p className="max-w-2xl mb-10 text-base leading-7 text-gray-600">
        Veloura pieces are designed around relaxed everyday silhouettes. Use the table below to find your fit, then compare against a piece you already own.
      </p>

      <div className="mb-10 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="py-3 pl-5 pr-4 text-left font-semibold text-gray-900">Measurement (cm)</th>
              {SIZE_ORDER.map((size) => (
                <th key={size} className="py-3 px-4 text-center font-semibold text-gray-900">{size}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MEASUREMENTS.map((row, i) => (
              <tr key={row.row} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                <td className="py-3 pl-5 pr-4 font-medium text-gray-700">{row.row}</td>
                {SIZE_ORDER.map((size) => (
                  <td key={size} className="py-3 px-4 text-center text-gray-600">{row[size.toLowerCase() as keyof typeof row]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-bold text-gray-900">How to Measure</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><strong className="text-gray-800">Chest:</strong> Measure around the fullest part, keeping the tape horizontal.</li>
            <li><strong className="text-gray-800">Waist:</strong> Measure around the narrowest part of your torso.</li>
            <li><strong className="text-gray-800">Length:</strong> Measure from shoulder seam to hem.</li>
            <li><strong className="text-gray-800">Sleeve:</strong> Measure from shoulder seam to end of sleeve.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-bold text-gray-900">Between Sizes?</h2>
          <p className="text-sm text-gray-600 leading-6">
            If you are between sizes and prefer a cleaner, true-to-size fit, go with your usual size. If you want a more oversized drape — especially in hoodies or outerwear — size up once and compare the chest width against a piece you already own and like the fit of.
          </p>
        </div>
      </div>

      <div className="mb-10 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Fit Notes by Category</h2>
        <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h3 className="mb-2 text-base font-semibold text-gray-800">Hoodies & Sweatshirts</h3>
            <p className="text-sm text-gray-600 leading-6">Cut relaxed through the body with a dropped shoulder. Sizing up gives a more oversized silhouette; staying true to size gives a clean everyday drape. Body length is slightly longer to keep the hem from riding up.</p>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <h3 className="mb-2 text-base font-semibold text-gray-800">T-shirts & Tops</h3>
            <p className="text-sm text-gray-600 leading-6">Sit slightly closer to the body than hoodies. Ribbed collar holds shape through repeated washing. If you are broad-shouldered or prefer more room in the torso, size up.</p>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <h3 className="mb-2 text-base font-semibold text-gray-800">Outerwear & Jackets</h3>
            <p className="text-sm text-gray-600 leading-6">Cut to layer comfortably over a hoodie or light knit. Shoulder width is structured. If you are between sizes, we recommend sizing up to ensure ease across the shoulders and chest when worn over additional layers.</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        This page is part of the <Link href="/en/demo/veloura-shop" className="underline hover:text-gray-600">Veloura demo storefront</Link> by ForgingApps.
      </p>
    </div>
  )
}