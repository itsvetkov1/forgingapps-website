'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useVelouraCart } from '@/contexts/VelouraCartContext'
import { ArrowLeft, Lock } from 'lucide-react'

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
    cardNumber: '4242 4242 4242 4242',
    expiry: '12/28',
    cvv: '123',
  })

  const shipping = form.shippingMethod === 'express' ? 12.90 : form.shippingMethod === 'free' ? 0 : 5.90
  const total = cartTotal + shipping

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Basic validation
    if (!form.firstName || !form.lastName || !form.email || !form.address || !form.city || !form.postalCode) {
      alert('Please fill in all required fields')
      return
    }
    clearCart()
    router.push('/demo/veloura-shop/success')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/demo/veloura-shop" className="text-blue-600 hover:underline">Back to Shop</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/demo/veloura-shop/cart" className="hover:text-gray-900 flex items-center gap-1">
          <ArrowLeft size={14} /> Back to Cart
        </Link>
      </div>

      <h1 className="font-serif text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact */}
          <div>
            <h2 className="font-bold text-lg mb-4">Contact Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
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
          </div>

          {/* Shipping */}
          <div>
            <h2 className="font-bold text-lg mb-4">Shipping Address</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
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
          </div>

          {/* Shipping Method */}
          <div>
            <h2 className="font-bold text-lg mb-4">Shipping Method</h2>
            <div className="space-y-2">
              <label className={`flex items-center justify-between p-4 border rounded cursor-pointer transition-colors ${form.shippingMethod === 'standard' ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="standard"
                    checked={form.shippingMethod === 'standard'}
                    onChange={handleChange}
                    className="accent-gray-900"
                  />
                  <div>
                    <p className="font-medium text-sm">Standard Delivery</p>
                    <p className="text-xs text-gray-500">3-5 business days</p>
                  </div>
                </div>
                <span className="font-semibold text-sm">€5.90</span>
              </label>
              <label className={`flex items-center justify-between p-4 border rounded cursor-pointer transition-colors ${form.shippingMethod === 'express' ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="express"
                    checked={form.shippingMethod === 'express'}
                    onChange={handleChange}
                    className="accent-gray-900"
                  />
                  <div>
                    <p className="font-medium text-sm">Express Delivery</p>
                    <p className="text-xs text-gray-500">1-2 business days</p>
                  </div>
                </div>
                <span className="font-semibold text-sm">€12.90</span>
              </label>
              {cartTotal >= 60 && (
                <label className={`flex items-center justify-between p-4 border rounded cursor-pointer transition-colors ${form.shippingMethod === 'free' ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
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
          </div>

          {/* Payment */}
          <div>
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Lock size={16} /> Payment
            </h2>
            <div className="border border-gray-200 rounded p-4 bg-gray-50 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <input type="radio" checked readOnly className="accent-gray-900" />
                <span className="font-medium text-sm">Credit Card</span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Expiry</label>
                    <input
                      type="text"
                      name="expiry"
                      value={form.expiry}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={form.cvv}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400">This is a demo. No real payment will be processed.</p>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Place Order — €{total.toFixed(2)}
          </button>
        </form>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            <div className="space-y-4 mb-4">
              {items.map(item => (
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
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-gray-500">{item.color.name} / {item.size}</p>
                  </div>
                  <span className="text-sm font-medium">€{(((item.product.salePrice ?? item.product.price)) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>€{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className={shipping === 0 ? 'text-green-600' : ''}>
                  {shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
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
