import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CategoryPage, { generateStaticParams as generateShopCategoryParams } from '@/app/demo/veloura-shop/category/[slug]/page'
import { buildPageMetadata } from '@/lib/i18n/metadata'
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
  if (!category) return { title: 'Category — Veloura Demo' }
  const title = `${category.name} — Veloura Demo`
  const description = `Shop ${category.name.toLowerCase()} from the Veloura demo storefront built by ForgingApps.`
  return {
    title,
    description,
    ...buildPageMetadata(locale, `/demo/veloura-shop/category/${slug}`, title, description, category.image, `${category.name} category image`),
  }
}

export default async function LocalizedCategoryPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  return <CategoryPage params={Promise.resolve({ slug })} />
}
