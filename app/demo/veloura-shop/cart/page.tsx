"use client"

import Link from "next/link"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import CartItemComponent from "@/components/veloura-shop/CartItem"
import { useVelouraCart } from "@/contexts/VelouraCartContext"
import { formatPrice } from "@/lib/veloura-shop-data"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CartPage() {
  const { items, cartTotal } = useVelouraCart()
  const router = useRouter()
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard")

  const subtotal = cartTotal
  const shippingCost =
    shippingMethod === "express"
      ? 12.9
      : subtotal >= 60
      ? 0
      : 5.9
  const total = subtotal + shippingCost

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">
          Looks like you have not added anything yet.
        </p>
        <Link
          href="/demo/veloura-shop"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-8 flex items-center gap-2">
        <Link href="/demo/veloura-shop" className="hover:text-gray-900 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-900">Cart</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Cart</h1>
        <span className="text-sm text-gray-500">
          {items.length} item{items.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <div className="border-t border-gray-100">
            {items.map((item) => (
              <CartItemComponent key={item.id} item={item} />
            ))}
          </div>
          <div className="pt-4">
            <Link
              href="/demo/veloura-shop"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order summary */}
        <div>
          <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900 font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-gray-600">Shipping</span>
                <div className="flex flex-col items-end gap-1">
                  {subtotal >= 60 ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <span className="text-gray-900 font-medium">
                      {formatPrice(shippingCost)}
                    </span>
                  )}
                  {subtotal < 60 && (
                    <span className="text-xs text-gray-400">
                      {formatPrice(60 - subtotal)} away from free shipping
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3 mb-6">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold uppercase tracking-wide text-gray-900">
                  Total
                </span>
                <span className="text-xl font-bold text-gray-900">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Taxes included where applicable</p>
            </div>

            <button
              onClick={() => router.push("/demo/veloura-shop/checkout")}
              className="w-full py-3.5 bg-gray-900 text-white text-sm font-semibold uppercase tracking-wide rounded-lg hover:bg-gray-800 active:bg-gray-950 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
