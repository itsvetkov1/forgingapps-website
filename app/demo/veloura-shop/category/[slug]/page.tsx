import ProductCard from '@/components/veloura-shop/ProductCard'
import { getProductsByCategory, categories } from '@/lib/veloura-shop-data'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = categories.find(c => c.slug === slug)
  if (!category) return { title: 'Category — Veloura' }
  return {
    title: `${category.name} — Veloura`,
    description: `Shop ${category.name.toLowerCase()} from Veloura. Premium everyday essentials.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = categories.find(c => c.slug === slug)
  if (!category || slug === 'sale') return notFound()

  const products = getProductsByCategory(slug)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/demo/veloura-shop" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <span className="text-gray-900">{category.name}</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
        <span className="text-sm text-gray-500">{products.length} products</span>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500 py-16 text-center">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
