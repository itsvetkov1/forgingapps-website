'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/veloura-shop-data'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const displayPrice = product.salePrice ?? product.price
  const isOnSale = product.salePrice !== null
  const discountPct = isOnSale ? Math.round((1 - product.salePrice! / product.price) * 100) : 0

  return (
    <Link href={`/en/demo/veloura-shop/product/${product.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-gray-50 aspect-[3/4] mb-3">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {isOnSale && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              -{discountPct}%
            </span>
          </div>
        )}
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</p>
        <h3 className="font-medium text-gray-900 mb-1 group-hover:underline">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${isOnSale ? 'text-red-600' : 'text-gray-900'}`}>
            €{displayPrice}
          </span>
          {isOnSale && (
            <span className="text-gray-400 line-through text-sm">€{product.price}</span>
          )}
        </div>
        <div className="flex gap-1 mt-2">
          {product.colors.map(c => (
            <div
              key={c.name}
              title={c.name}
              className="w-3 h-3 rounded-full border border-gray-200"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>
    </Link>
  )
}
