'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-forge-dark/95 backdrop-blur-sm border-b border-forge-stone">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-cinzel text-xl font-bold text-forge-gold hover:text-forge-ember transition">
            <span>⚒</span>
            <span>ForgingApps</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/services" className="hover:text-forge-gold transition">Services</Link>
            <Link href="/ai-consulting" className="hover:text-forge-gold transition">AI Consulting</Link>
            <Link href="/portfolio" className="hover:text-forge-gold transition">Portfolio</Link>
            <Link href="/about" className="hover:text-forge-gold transition">About</Link>
            <Link href="/blog" className="hover:text-forge-gold transition">Blog</Link>
            <Link href="/contact" className="btn-small bg-forge-ember text-white hover:bg-forge-gold hover:text-forge-dark">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-forge-gold hover:text-forge-ember transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-forge-stone">
            <div className="flex flex-col gap-3">
              <Link href="/services" className="hover:text-forge-gold transition py-2" onClick={() => setMobileMenuOpen(false)}>Services</Link>
              <Link href="/ai-consulting" className="hover:text-forge-gold transition py-2" onClick={() => setMobileMenuOpen(false)}>AI Consulting</Link>
              <Link href="/portfolio" className="hover:text-forge-gold transition py-2" onClick={() => setMobileMenuOpen(false)}>Portfolio</Link>
              <Link href="/about" className="hover:text-forge-gold transition py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="/blog" className="hover:text-forge-gold transition py-2" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
              <Link href="/contact" className="btn-small bg-forge-ember text-white hover:bg-forge-gold hover:text-forge-dark w-full text-center" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
