import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import VelouraShopLayout from '@/app/demo/veloura-shop/layout'
import { isLocale } from '@/lib/i18n/routing'

export const metadata: Metadata = {
  title: 'Veloura — Everyday essentials, built to last',
  description: 'Shop the Veloura collection — hoodies, tees, pants, jackets and accessories. Thoughtfully designed, responsibly made.',
}

export default async function LocalizedVelouraShopLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <VelouraShopLayout>{children}</VelouraShopLayout>
}
