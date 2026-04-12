import { notFound } from 'next/navigation'
import CheckoutPage from '@/app/demo/veloura-shop/checkout/page'
import { isLocale } from '@/lib/i18n/routing'

export default async function LocalizedCheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <CheckoutPage />
}
