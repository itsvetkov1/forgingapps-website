'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-forge-stone border-t border-forge-ember/30">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2 font-cinzel text-lg font-bold text-forge-gold mb-2">
              <span>⚒</span>
              <span>ForgingApps</span>
            </div>
            <p className="text-gray-400 text-sm">Apps forged with precision. Built to last.</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-cinzel text-forge-gold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="text-gray-400 hover:text-forge-gold transition">All Packages</Link></li>
              <li><Link href="/ai-consulting" className="text-gray-400 hover:text-forge-gold transition">AI Consulting</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-forge-gold transition">Get a Quote</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-cinzel text-forge-gold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/portfolio" className="text-gray-400 hover:text-forge-gold transition">Portfolio</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-forge-gold transition">About Us</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-forge-gold transition">Blog</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-cinzel text-forge-gold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:hello@forgingapps.com" className="text-gray-400 hover:text-forge-gold transition">hello@forgingapps.com</a></li>
              <li className="text-gray-400">Sofia, Bulgaria</li>
              <li><a href="/contact" className="text-forge-gold hover:text-forge-ember transition font-semibold">Free Consultation</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-forge-ember/20 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>&copy; 2026 ForgingApps. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-forge-gold transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-forge-gold transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
