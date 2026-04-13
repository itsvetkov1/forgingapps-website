import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SuccessPage from '@/app/demo/veloura-shop/success/page'
import { buildPageMetadata } from '@/lib/i18n/metadata'
import { isLocale } from '@/lib/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const title = 'Order Confirmed — Veloura Demo'
  const description = 'Demo confirmation page for the Veloura storefront experience built by ForgingApps.'

  return {
    title,
    description,
    ...buildPageMetadata(locale, '/demo/veloura-shop/success', title, description, '/veloura/hero.jpg', 'Veloura demo order confirmation image'),
  }
}

export default async function LocalizedSuccessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <SuccessPage />
}
