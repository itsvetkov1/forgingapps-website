"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag, Search, Menu, X } from "lucide-react"
import { useState } from "react"
import { useVelouraCart } from "@/contexts/VelouraCartContext"
import { categories } from "@/lib/veloura-shop-data"

const mainCategories = categories.filter((c) => c.slug !== "sale")

export default function Navbar() {
  const { cartCount } = useVelouraCart()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { href: "/demo/veloura-shop", label: "Home" },
    ...mainCategories.map((c) => ({
      href: `/demo/veloura-shop/category/${c.slug}`,
      label: c.name,
    })),
    { href: "/demo/veloura-shop/sale", label: "Sale" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {/* Top bar */}
      <div className="bg-gray-900 text-white text-center text-xs py-1.5 tracking-wide uppercase">
        Free shipping on orders over €60
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -ml-2 text-gray-700 hover:text-gray-900"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <Link
            href="/demo/veloura-shop"
            className="text-xl font-bold tracking-widest uppercase text-gray-900 hover:text-gray-700 transition-colors"
          >
            Veloura
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    isActive
                      ? "text-gray-900 underline underline-offset-4 decoration-2"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            <button
              className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/demo/veloura-shop/cart"
              className="p-2 text-gray-700 hover:text-gray-900 transition-colors relative"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
