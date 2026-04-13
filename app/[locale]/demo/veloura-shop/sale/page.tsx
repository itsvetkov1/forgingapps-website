import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SalePage from '@/app/demo/veloura-shop/sale/page'
import { buildPageMetadata } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const title = 'Sale — Veloura Demo'
  const description = 'Shop discounted items in the Veloura demo storefront built by ForgingApps.'

  return {
    title,
    description,
    ...buildPageMetadata(locale, '/demo/veloura-shop/sale', title, description, '/veloura/hero.jpg', 'Veloura demo sale collection'),
  }
}

export default async function LocalizedSalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <SalePage />
}
