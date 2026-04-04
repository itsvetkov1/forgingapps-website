import Link from 'next/link'

export default function ShopFooter() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <p className="font-serif text-xl font-bold tracking-widest mb-3">VELOURA</p>
            <p className="text-gray-400 text-sm">Everyday essentials, built to last.</p>
          </div>
          <div>
            <p className="font-semibold text-sm mb-3">Shop</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/demo/veloura-shop/category/hoodies-sweatshirts" className="hover:text-white transition-colors">Hoodies & Sweatshirts</Link></li>
              <li><Link href="/demo/veloura-shop/category/tshirts-tops" className="hover:text-white transition-colors">T-Shirts & Tops</Link></li>
              <li><Link href="/demo/veloura-shop/category/pants-joggers" className="hover:text-white transition-colors">Pants & Joggers</Link></li>
              <li><Link href="/demo/veloura-shop/category/jackets-outerwear" className="hover:text-white transition-colors">Jackets & Outerwear</Link></li>
              <li><Link href="/demo/veloura-shop/category/accessories" className="hover:text-white transition-colors">Accessories</Link></li>
              <li><Link href="/demo/veloura-shop/sale" className="hover:text-white transition-colors">Sale</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-sm mb-3">Info</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="hover:text-white transition-colors cursor-default">About Us</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Sustainability</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Size Guide</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Shipping & Returns</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Contact</span></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-sm mb-3">Connect</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="hover:text-white transition-colors cursor-default">Instagram</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">TikTok</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Pinterest</span></li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">Demo by ForgingApps</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2026 Veloura. All rights reserved. This is a demo store.</p>
          <p className="mt-2 md:mt-0">Powered by custom AI and modern e-commerce technology.</p>
        </div>
      </div>
    </footer>
  )
}
