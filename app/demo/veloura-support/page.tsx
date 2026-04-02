import Hero from '@/components/Hero'
import VelouraChatEmbed from '@/components/VelouraChatEmbed'
import { PROOF_CARDS } from '@/lib/veloura-demo-config.mjs'
import { RotateCcw, Search, Shield, Shirt, Truck } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Veloura Support Demo -- AI Customer Support Showcase | ForgingApps',
  description: 'Embedded demo of an AI customer support assistant for apparel brands. Test shipping, returns, sizing, and product guidance flows directly on the page.',
  alternates: {
    canonical: 'https://forgingapps.com/demo/veloura-support',
  },
  openGraph: {
    title: 'Veloura Support Demo -- AI Customer Support Showcase | ForgingApps',
    description: 'Embedded demo of an AI customer support assistant for apparel brands.',
    url: 'https://forgingapps.com/demo/veloura-support',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Veloura Support Demo' }],
  },
}

const iconMap = {
  truck: Truck,
  rotate: RotateCcw,
  search: Search,
  shirt: Shirt,
  shield: Shield,
} as const

export default function VelouraSupportDemo() {
  return (
    <>
      <Hero
        headline="Veloura Support Demo"
        subheadline="A branded embedded AI support experience for fashion and e-commerce brands. Ask about shipping, returns, exchanges, sizing, and product browsing without leaving the page."
        size="small"
        badge="Embedded Live Demo"
      />

      <section className="section-py bg-forge-dark border-t border-forge-ember/20">
        <div className="container-custom">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
            <div className="xl:col-span-2 space-y-8">
              <VelouraChatEmbed />

              <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8">
                <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-6">What this demo proves</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {PROOF_CARDS.map((card) => {
                    const Icon = iconMap[card.icon as keyof typeof iconMap]
                    return (
                      <div key={card.title} className="bg-forge-dark border border-forge-ember/20 rounded-lg p-6">
                        <Icon className="text-forge-gold mb-4" size={28} />
                        <h3 className="font-semibold text-white mb-2">{card.title}</h3>
                        <p className="text-gray-400 text-sm">{card.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8">
                <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-6">Demo Profile</h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-gray-400 mb-1">Brand</p>
                    <p className="text-white font-semibold">Veloura</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Use Case</p>
                    <p className="text-white font-semibold">Fashion e-commerce customer support</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Focus Areas</p>
                    <p className="text-white font-semibold">Shipping, returns, exchanges, sizing, product guidance</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Experience</p>
                    <p className="text-white font-semibold">Custom embedded website chat</p>
                  </div>
                </div>
              </div>

              <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8">
                <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-4">Known policy answers</h2>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-3">
                    <span className="text-forge-gold mt-1">✓</span>
                    <span>Standard EU shipping: 3-5 business days</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-forge-gold mt-1">✓</span>
                    <span>Express EU shipping: 1-2 business days</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-forge-gold mt-1">✓</span>
                    <span>Returns within 30 days if unworn, unwashed, with tags</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-forge-gold mt-1">✓</span>
                    <span>One size exchange per order if stock is available</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-forge-gold mt-1">✓</span>
                    <span>No fake tracking or refund promises beyond policy</span>
                  </li>
                </ul>
              </div>

              <div className="bg-forge-dark border border-forge-ember/30 rounded-lg p-8">
                <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-4">Want this for your business?</h2>
                <p className="text-gray-400 mb-6 text-sm">
                  We build customer-facing AI assistants with clear business boundaries, branded UX, and production-minded integration paths.
                </p>
                <a href="/contact" className="btn-primary w-full text-center">
                  Discuss Your AI Demo →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
