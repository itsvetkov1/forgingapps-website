import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CheckoutPage from '@/app/demo/veloura-shop/checkout/page'
import { buildPageMetadata } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const title = 'Checkout — Veloura Demo'
  const description = 'Demo checkout flow for the Veloura storefront built by ForgingApps.'

  return {
    title,
    description,
    ...buildPageMetadata(locale, '/demo/veloura-shop/checkout', title, description, '/veloura/hero.jpg', 'Veloura demo checkout preview image'),
  }
}

export default async function LocalizedCheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <CheckoutPage />
}
