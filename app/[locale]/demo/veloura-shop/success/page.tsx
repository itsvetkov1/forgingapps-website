import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SuccessPage from '@/app/demo/veloura-shop/success/page'
import { isLocale } from '@/lib/i18n/routing'

export const metadata: Metadata = {
  title: 'Order Confirmed — Veloura',
}

export default async function LocalizedSuccessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <SuccessPage />
}
