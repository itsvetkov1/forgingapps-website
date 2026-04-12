import { notFound } from 'next/navigation'
import CartPage from '@/app/demo/veloura-shop/cart/page'
import { isLocale } from '@/lib/i18n/routing'

export default async function LocalizedCartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <CartPage />
}
