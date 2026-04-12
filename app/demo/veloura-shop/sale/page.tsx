import ProductCard from '@/components/veloura-shop/ProductCard'
import { getSaleProducts } from '@/lib/veloura-shop-data'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sale — Veloura',
  description: 'Shop the Veloura sale. Premium essentials at reduced prices.',
}

// Item tags:
// - Best value: Heavyweight Hoodie — biggest absolute discount (€47 off)
// - Most popular: Lightweight Crewneck — reliable bestseller in any basics collection
// - Last chance: Lightweight Baseball Cap — lowest price point, feels like a final-add buy
const TAGGED_PRODUCTS: Record<string, string> = {
  'heavyweight-hoodie': 'Best value',
  'lightweight-crewneck': 'Most popular',
  'lightweight-baseball-cap': 'Last chance',
}

export default function SalePage() {
  const saleProducts = getSaleProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/en/demo/veloura-shop" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <span className="text-gray-900">Sale</span>
      </nav>

      <div className="flex items-center justify-between mb-2">
        <h1 className="text-4xl font-bold text-gray-900">Sale</h1>
        <span className="text-sm text-red-600 font-medium">{saleProducts.length} items on sale</span>
      </div>
      <p className="text-gray-500 mb-8">Limited time only. When they are gone, they are gone.</p>

      {saleProducts.length === 0 ? (
        <p className="text-gray-500 py-16 text-center">No sale items at the moment.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {saleProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              tag={TAGGED_PRODUCTS[product.slug]}
            />
          ))}
        </div>
      )}
    </div>
  )
}
