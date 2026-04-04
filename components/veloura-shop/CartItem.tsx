"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import type { CartItem as CartItemType } from "@/contexts/VelouraCartContext"
import { useVelouraCart } from "@/contexts/VelouraCartContext"
import { formatPrice } from "@/lib/veloura-shop-data"

interface CartItemProps {
  item: CartItemType
}

export default function CartItemComponent({ item }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useVelouraCart()
  const price = item.product.salePrice ?? item.product.price
  const lineTotal = price * item.quantity

  return (
    <div className="flex gap-4 py-4 border-b border-gray-100">
      <div className="relative w-20 h-24 rounded-md overflow-hidden bg-gray-50 flex-shrink-0">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {item.product.name}
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">
              {item.color.name} / {item.size}
            </p>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors ml-2"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-end justify-between mt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-50 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-50 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {formatPrice(lineTotal)}
          </span>
        </div>
      </div>
    </div>
  )
}
