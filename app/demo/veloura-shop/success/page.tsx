import Link from 'next/link'
import { Metadata } from 'next'

const DEMO_ORDER_NUMBER = 'VLR-DEMO-2026'
const DEMO_ESTIMATED_DELIVERY = 'Within 5 business days (demo)'

export const metadata: Metadata = {
  title: 'Order Confirmed — Veloura Demo',
  description: 'Demo confirmation page for the Veloura storefront experience built by ForgingApps.',
}

export default function SuccessPage() {
  const orderNumber = DEMO_ORDER_NUMBER
  const estimatedDelivery = DEMO_ESTIMATED_DELIVERY

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
      {/* Success Icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-gray-500 mb-1">Thank you for your order. This demo checkout shows the final storefront step without processing a real purchase.</p>

      <div className="bg-gray-50 rounded-lg p-6 my-8 text-left">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Order Number</p>
            <p className="font-bold text-lg">{orderNumber}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Estimated Delivery</p>
            <p className="font-bold">{estimatedDelivery}</p>
          </div>
        </div>
      </div>

      {/* The Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 my-10 text-left">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-2xl">👋</span>
          <h2 className="text-xl font-bold text-amber-900">A quick word from the Veloura team</h2>
        </div>
        <div className="space-y-3 text-amber-900 text-sm leading-relaxed">
          <p>
            First things first: <strong>no real clothes were harmed, packaged, or shipped in the making of this order.</strong>
          </p>
          <p>
            Veloura is not a real store. This is a showcase built by <strong>ForgingApps</strong> — a custom software development studio from Sofia, Bulgaria — demonstrating what a modern AI-powered e-commerce experience can look and feel like.
          </p>
          <p>
            So if you were hoping for a heavyweight hoodie to arrive at your door: we're genuinely sorry. That hoodie doesn't exist. The robots in our demo are very good at pretending, but they Draw the line at actual fabric.
          </p>
          <p>
            That said — if you <em>actually</em> need something like this built for your brand, your store, or your next project, that's where we come in. ForgingApps builds custom apps, AI integrations, and e-commerce platforms at startup-friendly prices.
          </p>
        </div>
        <div className="mt-6 pt-6 border-t border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-amber-900 text-sm font-medium">
            Want something like this for real?
          </p>
          <Link
            href="/en/contact?subject=veloura-shop-demo"
            className="inline-block bg-gray-900 text-white px-6 py-3 font-semibold rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            Talk to ForgingApps →
          </Link>
        </div>
      </div>

      <Link
        href="/en/demo/veloura-shop"
        className="inline-block text-gray-600 hover:text-gray-900 font-medium transition-colors"
      >
        ← Back to the Store
      </Link>
    </div>
  )
}
