"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, ChevronRight, Check } from "lucide-react"
import ColorSwatch from "@/components/veloura-shop/ColorSwatch"
import SizeSelector from "@/components/veloura-shop/SizeSelector"
import ProductCard from "@/components/veloura-shop/ProductCard"
import { useVelouraCart } from "@/contexts/VelouraCartContext"
import {
  formatPrice,
  type Product,
  type ProductColor,
} from "@/lib/veloura-shop-data"

interface ProductDetailProps {
  product: Product
  relatedProducts: Product[]
}

export default function ProductDetail({
  product,
  relatedProducts,
}: ProductDetailProps) {
  const { addToCart } = useVelouraCart()
  const [selectedColor, setSelectedColor] =
    useState<ProductColor>(product.colors[0]!)
  const [selectedSize, setSelectedSize] = useState("")
  const [added, setAdded] = useState(false)

  const discountPct = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  function handleAddToCart() {
    if (!selectedSize) return
    addToCart(product, selectedColor, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-8">
        <Link href="/demo/veloura-shop" className="hover:text-gray-900">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/demo/veloura-shop/category/${product.categorySlug}`} className="hover:text-gray-900">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="relative aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden">
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
          {product.salePrice && (
            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">-{discountPct}%</span>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* Price */}
          <div className="flex items-baseline gap-3 mt-3">
            {product.salePrice ? (
              <>
                <span className="text-2xl font-bold text-red-600">{formatPrice(product.salePrice)}</span>
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.price)}</span>
                <span className="text-sm font-medium text-red-500">Save {formatPrice(product.price - product.salePrice)}</span>
              </>
            ) : (
              <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            )}
          </div>

          {/* Color Selector */}
          <div className="mt-6">
            <ColorSwatch colors={product.colors} selected={selectedColor} onChange={setSelectedColor} />
          </div>

          {/* Size Selector */}
          <div className="mt-6">
            <SizeSelector sizes={product.sizes} selected={selectedSize} onChange={setSelectedSize} />
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`mt-6 w-full py-3 px-6 rounded-lg font-medium text-base flex items-center justify-center gap-2 transition-all ${
              added ? "bg-green-600 text-white" : selectedSize ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {added ? (<><Check className="w-5 h-5" /> Added to Cart</>) : (<><ShoppingBag className="w-5 h-5" /> Add to Cart</>)}
          </button>

          {/* Description */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Material & Care */}
          <div className="mt-6 border-t border-gray-100 pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Material</h3>
            <p className="text-sm text-gray-600">{product.material}</p>
            <h3 className="text-sm font-medium text-gray-900 mt-4 mb-2">Care Instructions</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {product.careInstructions.map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
