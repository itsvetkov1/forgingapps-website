import Image from 'next/image'
import Link from 'next/link'
import ProductCard from '@/components/veloura-shop/ProductCard'
import { getFeaturedProducts, getSaleProducts, categories } from '@/lib/veloura-shop-data'
import { Metadata } from 'next'
import DemoTechStrip from '@/components/DemoTechStrip'
import DemoPackageCallout from '@/components/DemoPackageCallout'

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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">What you are seeing</p>
          <p className="max-w-3xl text-sm leading-7 text-gray-600 mb-4">
            A full working storefront with product catalog, category filtering, persistent cart state, and product detail pages. Structured to feel like a launch-ready commerce experience from the first click.
          </p>
          <div className="border-t border-gray-100 pt-4 grid grid-cols-1 gap-2 text-sm text-gray-500">
            <div>
              <span className="font-semibold text-gray-700">What is live:</span>{' '}
              Product catalog with 17 items — Category filtering — Cart state in browser — Product detail pages — AI support cross-link
            </div>
            <div>
              <span className="font-semibold text-gray-700">What is simulated:</span>{' '}
              Checkout completion — Payment processing — Inventory tracking — Account creation
            </div>
          </div>
        </div>

        <DemoPackageCallout
          title="The Anvil or The Forge"
          rationale="This demo fits The Anvil for a polished storefront with real cart and catalog flows, or The Forge when the goal is a larger commerce platform with integrated support and expansion room."
          theme="light"
          href="/en/services#anvil"
        />
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
              <p className="text-3xl mb-2">&#9889;</p>
              <h3 className="text-lg font-bold mb-2">Free Shipping Over &#8364;60</h3>
              <p className="text-gray-400 text-sm">Standard delivery 3-5 business days</p>
            </div>
            <div>
              <p className="text-3xl mb-2">&#8617;</p>
              <h3 className="text-lg font-bold mb-2">30-Day Returns</h3>
              <p className="text-gray-400 text-sm">No questions asked, free return shipping</p>
            </div>
            <div>
              <p className="text-3xl mb-2">&#128737;</p>
              <h3 className="text-lg font-bold mb-2">Quality Guarantee</h3>
              <p className="text-gray-400 text-sm">Every piece backed by our quality promise</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <DemoTechStrip theme="light" />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-900 to-black px-8 py-10 text-white">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Demo-specific next step</p>
              <h2 className="mb-3 text-3xl font-bold">Ready to build your own storefront?</h2>
              <p className="text-sm leading-7 text-white/70">We design and ship branded storefronts like this, including catalog, cart, checkout, and support-ready flows, in 2-4 weeks.</p>
            </div>
            <Link href="/en/contact?subject=veloura-shop-demo" className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors whitespace-nowrap">
              Plan your storefront build
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
