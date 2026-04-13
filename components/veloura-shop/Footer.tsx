import Link from "next/link"
import { Instagram, Twitter } from "lucide-react"

const DEMO_YEAR = 2026

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="text-xl font-bold tracking-widest uppercase mb-3">Veloura</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Everyday essentials, built to last. Thoughtfully designed for people who care about what they wear.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-semibold">Shop</p>
            <ul className="space-y-2">
              {[
                { href: "/en/demo/veloura-shop/category/hoodies-sweatshirts", label: "Hoodies & Sweatshirts" },
                { href: "/en/demo/veloura-shop/category/tshirts-tops", label: "T-Shirts & Tops" },
                { href: "/en/demo/veloura-shop/category/pants-joggers", label: "Pants & Joggers" },
                { href: "/en/demo/veloura-shop/category/jackets-outerwear", label: "Jackets & Outerwear" },
                { href: "/en/demo/veloura-shop/category/accessories", label: "Accessories" },
                { href: "/en/demo/veloura-shop/sale", label: "Sale" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-semibold">Help</p>
            <ul className="space-y-2">
              {[
                { href: "/en/demo/veloura-shop/size-guide", label: "Size Guide" },
                { href: "/en/demo/veloura-shop/shipping-returns", label: "Shipping & Returns" },
                { href: "/en/demo/veloura-shop/care-instructions", label: "Care Instructions" },
                { href: "/en/demo/veloura-shop/contact-us", label: "Contact Us" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-semibold">About</p>
            <ul className="space-y-2">
              {[
                { href: "/en/about", label: "About Us" },
                { href: "/en/services", label: "Our Services" },
                { href: "/en/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {DEMO_YEAR} Veloura. Demo by ForgingApps.
          </p>
          <p className="text-xs text-gray-600">
            <Link href="/en/services" className="text-gray-500 hover:text-white transition-colors underline underline-offset-4">
              Built by ForgingApps
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
