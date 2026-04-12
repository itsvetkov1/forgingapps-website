import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductPage, { generateStaticParams as generateShopProductParams } from '@/app/demo/veloura-shop/product/[slug]/page'
import { getProductBySlug } from '@/lib/veloura-shop-data'
import { isLocale, locales } from '@/lib/i18n/routing'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const params = await generateShopProductParams()
  return locales.flatMap((locale) => params.map(({ slug }) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Product — Veloura' }
  return {
    title: `${product.name} — Veloura`,
    description: product.description,
  }
}

export default async function LocalizedProductPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  return <ProductPage params={Promise.resolve({ slug })} />
}
