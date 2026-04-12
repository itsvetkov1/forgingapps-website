import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SalePage from '@/app/demo/veloura-shop/sale/page'
import { isLocale } from '@/lib/i18n/routing'

export const metadata: Metadata = {
  title: 'Sale — Veloura',
  description: 'Shop the Veloura sale. Premium essentials at reduced prices.',
}

export default async function LocalizedSalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <SalePage />
}
