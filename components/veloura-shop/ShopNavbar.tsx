'use client'

import Link from 'next/link'
import { ShoppingBag, Search, Menu, X } from 'lucide-react'
import { useCart } from '@/contexts/VelouraCartContext'
import { useState } from 'react'

const navLinks = [
  { label: 'New Arrivals', href: '/demo/veloura-shop' },
  { label: 'Hoodies', href: '/demo/veloura-shop/category/hoodies-sweatshirts' },
  { label: 'T-Shirts', href: '/demo/veloura-shop/category/tshirts-tops' },
  { label: 'Pants', href: '/demo/veloura-shop/category/pants-joggers' },
  { label: 'Jackets', href: '/demo/veloura-shop/category/jackets-outerwear' },
  { label: 'Accessories', href: '/demo/veloura-shop/category/accessories' },
  { label: 'Sale', href: '/demo/veloura-shop/sale' },
]

export default function ShopNavbar() {
  const { cartCount } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/demo/veloura-shop" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-widest text-gray-900">VELOURA</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              <Search size={20} />
            </button>
            <Link href="/demo/veloura-shop/cart" className="relative text-gray-600 hover:text-gray-900 transition-colors">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col gap-3">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 py-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
