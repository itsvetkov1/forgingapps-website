import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import VelouraShopHome from '@/app/demo/veloura-shop/page'
import { isLocale } from '@/lib/i18n/routing'

export const metadata: Metadata = {
  title: 'Veloura — Everyday essentials, built to last',
  description: 'Shop the Veloura collection. Premium everyday essentials in quality fabrics, designed to last.',
}

export default async function LocalizedVelouraShopHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <VelouraShopHome />
}
