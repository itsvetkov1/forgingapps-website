import Image from 'next/image'
import Link from 'next/link'
import ProductCard from '@/components/veloura-shop/ProductCard'
import { getFeaturedProducts, getSaleProducts, categories } from '@/lib/veloura-shop-data'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Veloura — Everyday essentials, built to last',
  description: 'Shop the Veloura collection. Premium everyday essentials in quality fabrics, designed to last.',
}

export default function VelouraShopHome() {
  const featured = getFeaturedProducts()
  const saleProducts = getSaleProducts()
  const shopCategories = categories.filter(c => c.slug !== 'sale')

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative w-full h-[60vh] min-h-[400px] bg-gray-100">
        <Image
          src="/veloura/hero.jpg"
          alt="Veloura — Everyday essentials"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-5xl md:text-7xl font-bold mb-4">Veloura</p>
            <p className="text-xl md:text-2xl mb-8 font-light">Everyday essentials, built to last.</p>
            <Link
              href="/en/demo/veloura-shop/category/hoodies-sweatshirts"
              className="inline-block bg-white text-gray-900 px-8 py-3 font-medium hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* What this demonstrates */}
      <section className="bg-gray-950 text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.6fr] gap-8 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-gray-500 mb-3">ForgingApps demo</p>
              <h2 className="text-3xl font-bold text-white mb-4">What this demonstrates</h2>
              <p className="text-gray-400 leading-7 max-w-xl">
                This Veloura storefront is not just a product grid. It is a capability demo showing how ForgingApps can combine polished commerce UX, guided product discovery, and AI-assisted support inside one branded experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-gray-800 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white mb-2">AI support assistant</p>
                <p className="text-sm text-gray-400 leading-6">
                  Cross-linked with the Veloura Support demo, including product-aware sizing help, similar-item discovery, and policy answers.
                </p>
                <Link href="/en/demo/veloura-support" className="inline-block mt-4 text-sm font-semibold text-white underline underline-offset-4 hover:text-gray-200">
                  Explore the support demo
                </Link>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white mb-2">Complete storefront flow</p>
                <p className="text-sm text-gray-400 leading-6">
                  Product catalog, categories, product detail pages, sale browsing, cart state, and checkout flow are all wired into a consistent demo journey.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white mb-2">Reusable UI patterns</p>
                <p className="text-sm text-gray-400 leading-6">
                  Hero merchandising, featured products, promotional sections, and demo-safe checkout patterns show how the experience can scale into a real commerce build.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
          <Link href="/en/demo/veloura-shop" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* On Sale */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">On Sale</h2>
            <Link href="/en/demo/veloura-shop/sale" className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors underline">
              View All Sale Items
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {saleProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {shopCategories.map(cat => (
            <Link
              key={cat.slug}
              href={`/en/demo/veloura-shop/category/${cat.slug}`}
              className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-lg font-bold">{cat.name.split(' ')[0]}</p>
                <p className="text-white/80 text-xs mt-1">{cat.productCount} products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand Promise */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl mb-2">⚡</p>
              <h3 className="text-lg font-bold mb-2">Free Shipping Over €60</h3>
              <p className="text-gray-400 text-sm">Standard delivery 3-5 business days</p>
            </div>
            <div>
              <p className="text-3xl mb-2">↩️</p>
              <h3 className="text-lg font-bold mb-2">30-Day Returns</h3>
              <p className="text-gray-400 text-sm">No questions asked, free return shipping</p>
            </div>
            <div>
              <p className="text-3xl mb-2">🛡️</p>
              <h3 className="text-lg font-bold mb-2">Quality Guarantee</h3>
              <p className="text-gray-400 text-sm">Every piece backed by our quality promise</p>
            </div>
          </div>
        </div>
      </section>
      {/* Cross-link to Support Demo */}
      <section className="bg-gray-950 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-400 mb-2 text-sm">This is a demo storefront built by ForgingApps</p>
          <p className="text-white text-lg font-semibold mb-4">See our AI support assistant handle Veloura customer questions</p>
          <Link href="/en/demo/veloura-support" className="inline-block bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
            Try Veloura Support Demo
          </Link>
        </div>
      </section>
    </div>
  )
}
