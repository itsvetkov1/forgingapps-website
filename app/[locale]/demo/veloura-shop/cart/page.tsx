import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CartPage from '@/app/demo/veloura-shop/cart/page'
import { buildPageMetadata } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const title = 'Cart — Veloura Demo'
  const description = 'Review products in the Veloura demo cart before checkout.'

  return {
    title,
    description,
    ...buildPageMetadata(locale, '/demo/veloura-shop/cart', title, description, '/veloura/hero.jpg', 'Veloura demo cart preview image'),
  }
}

export default async function LocalizedCartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <CartPage />
}
