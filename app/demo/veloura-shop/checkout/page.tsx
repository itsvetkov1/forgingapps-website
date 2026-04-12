'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useVelouraCart } from '@/contexts/VelouraCartContext'
import { ArrowLeft } from 'lucide-react'

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useVelouraCart()
  const router = useRouter()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Germany',
    shippingMethod: 'standard',
  })

  const shipping =
    form.shippingMethod === 'express'
      ? 12.9
      : form.shippingMethod === 'free'
      ? 0
      : 5.9
  const total = cartTotal + shipping

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.address ||
      !form.city ||
      !form.postalCode
    ) {
      return
    }
    clearCart()
    router.push('/en/demo/veloura-shop/success')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <Link
          href="/en/demo/veloura-shop"
          className="text-gray-600 hover:text-gray-900 underline text-sm"
        >
          Back to Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/en/demo/veloura-shop/cart"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Cart
        </Link>
      </div>

      {/* Page heading */}
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-3 space-y-8"
        >
          {/* Contact */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>
            </div>
          </section>

          {/* Shipping */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-4">Shipping Address</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Country</label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  <option>Germany</option>
                  <option>Austria</option>
                  <option>Switzerland</option>
                  <option>France</option>
                  <option>Netherlands</option>
                  <option>Belgium</option>
                  <option>Denmark</option>
                  <option>Sweden</option>
                  <option>Norway</option>
                  <option>Finland</option>
                </select>
              </div>
            </div>
          </section>

          {/* Shipping Method */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-4">Shipping Method</h2>
            <div className="space-y-2">
              {[
                {
                  value: 'standard',
                  label: 'Standard Delivery',
                  sub: '3-5 business days',
                  price: '€5.90',
                },
                {
                  value: 'express',
                  label: 'Express Delivery',
                  sub: '1-2 business days',
                  price: '€12.90',
                },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center justify-between p-4 border rounded cursor-pointer transition-colors ${
                    form.shippingMethod === opt.value
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value={opt.value}
                      checked={form.shippingMethod === opt.value}
                      onChange={handleChange}
                      className="accent-gray-900"
                    />
                    <div>
                      <p className="font-medium text-sm">{opt.label}</p>
                      <p className="text-xs text-gray-500">{opt.sub}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-sm">{opt.price}</span>
                </label>
              ))}
              {cartTotal >= 60 && (
                <label
                  className={`flex items-center justify-between p-4 border rounded cursor-pointer transition-colors ${
                    form.shippingMethod === 'free'
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="free"
                      checked={form.shippingMethod === 'free'}
                      onChange={handleChange}
                      className="accent-gray-900"
                    />
                    <div>
                      <p className="font-medium text-sm">Free Delivery</p>
                      <p className="text-xs text-gray-500">3-5 business days</p>
                    </div>
                  </div>
                  <span className="font-semibold text-sm text-green-600">Free</span>
                </label>
              )}
            </div>
          </section>

          {/* Demo note */}
          <p className="text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded p-3">
            This is a demo checkout. No real payment will be processed.
          </p>

          <button
            type="submit"
            className="w-full py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Place Order — €{total.toFixed(2)}
          </button>
        </form>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>
            <div className="space-y-4 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-14 h-16 bg-white rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.color.name} / {item.size}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    €{((item.product.salePrice ?? item.product.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">€{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : 'text-gray-900'}>
                  {shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
