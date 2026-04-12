import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CategoryPage, { generateStaticParams as generateShopCategoryParams } from '@/app/demo/veloura-shop/category/[slug]/page'
import { categories } from '@/lib/veloura-shop-data'
import { isLocale, locales } from '@/lib/i18n/routing'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const params = await generateShopCategoryParams()
  return locales.flatMap((locale) => params.map(({ slug }) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const category = categories.find(c => c.slug === slug)
  if (!category) return { title: 'Category — Veloura' }
  return {
    title: `${category.name} — Veloura`,
    description: `Shop ${category.name.toLowerCase()} from Veloura. Premium everyday essentials.`,
  }
}

export default async function LocalizedCategoryPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  return <CategoryPage params={Promise.resolve({ slug })} />
}
