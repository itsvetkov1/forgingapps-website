import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import VelouraShopHome from '@/app/demo/veloura-shop/page'
import { buildPageMetadata } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const title = 'Veloura Demo Shop | Everyday essentials, built to last'
  const description = 'Live demo storefront with product catalog, cart, checkout, and embedded support built by ForgingApps.'

  return {
    title,
    description,
    ...buildPageMetadata(locale, '/demo/veloura-shop', title, description, '/veloura/hero.jpg', 'Veloura demo storefront hero image'),
  }
}

export default async function LocalizedVelouraShopHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <VelouraShopHome />
}
