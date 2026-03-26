import Hero from '@/components/Hero'
import { ExternalLink, MessageSquare, Shield, Shirt, Truck, RotateCcw } from 'lucide-react'
import { Metadata } from 'next'

const LIVE_DEMO_URL = 'https://88de515d087d6c.lhr.life'

export const metadata: Metadata = {
  title: 'Veloura Support Demo -- AI Customer Support Showcase | ForgingApps',
  description: 'Live production-stage demo of an AI customer support assistant for apparel brands. Test shipping, returns, sizing, and product guidance flows.',
  alternates: {
    canonical: 'https://forgingapps.com/demo/veloura-support',
  },
  openGraph: {
    title: 'Veloura Support Demo -- AI Customer Support Showcase | ForgingApps',
    description: 'Live stage demo of an AI customer support assistant for apparel brands.',
    url: 'https://forgingapps.com/demo/veloura-support',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Veloura Support Demo' }],
  },
}

const starterPrompts = [
  'How long does shipping take inside the EU?',
  'Can I return a dress if it does not fit?',
  'I am between two sizes. Which one should I choose?',
  'Do you allow size exchanges?',
]

export default function VelouraSupportDemo() {
  return (
    <>
      <Hero
        headline="Veloura Support Demo"
        subheadline="A live AI customer support demo for fashion and e-commerce brands. Launch the secure stage environment and test shipping, returns, exchanges, and sizing like a real customer would."
        size="small"
        badge="Live Demo"
      />

      <section className="section-py bg-forge-dark border-t border-forge-ember/20">
        <div className="container-custom">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
            <div className="xl:col-span-2 space-y-8">
              <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8">
                <div className="flex items-start justify-between gap-4 flex-col md:flex-row mb-6">
                  <div>
                    <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-3">Try the Bot</h2>
                    <p className="text-gray-400 max-w-2xl">
                      This demo runs in a dedicated secure stage environment so the marketing site can stay fast and static while the assistant remains fully interactive.
                    </p>
                  </div>
                  <a
                    href={LIVE_DEMO_URL}
                    className="btn-primary whitespace-nowrap"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Launch Live Demo <ExternalLink size={18} className="ml-2" />
                  </a>
                </div>

                <div className="bg-forge-dark border border-forge-ember/20 rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageSquare className="text-forge-gold" size={22} />
                    <h3 className="font-cinzel text-xl font-bold text-forge-gold">Live stage access</h3>
                  </div>
                  <p className="text-gray-400 mb-4">
                    The assistant is now reachable through a public secure stage link. It opens in a separate tab with the live Veloura support runtime.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-forge-gold mt-1">•</span>
                      <span>Live customer-support agent, not a scripted fake chat</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-forge-gold mt-1">•</span>
                      <span>Runs in a separate secure stage to keep the main site static and fast</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-forge-gold mt-1">•</span>
                      <span>Best tested on desktop first for the full Control UI experience</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-4">Suggested prompts for testing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {starterPrompts.map((prompt) => (
                      <div key={prompt} className="bg-forge-dark border border-forge-ember/20 rounded-lg p-4 text-gray-300 text-sm">
                        {prompt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8">
                <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-6">What this demo proves</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-forge-dark border border-forge-ember/20 rounded-lg p-6">
                    <Truck className="text-forge-gold mb-4" size={28} />
                    <h3 className="font-semibold text-white mb-2">Shipping questions</h3>
                    <p className="text-gray-400 text-sm">Handles standard delivery questions with policy-grounded answers instead of hallucinated promises.</p>
                  </div>
                  <div className="bg-forge-dark border border-forge-ember/20 rounded-lg p-6">
                    <RotateCcw className="text-forge-gold mb-4" size={28} />
                    <h3 className="font-semibold text-white mb-2">Returns and exchanges</h3>
                    <p className="text-gray-400 text-sm">Explains return windows, condition requirements, and exchange limits clearly and consistently.</p>
                  </div>
                  <div className="bg-forge-dark border border-forge-ember/20 rounded-lg p-6">
                    <Shirt className="text-forge-gold mb-4" size={28} />
                    <h3 className="font-semibold text-white mb-2">Sizing support</h3>
                    <p className="text-gray-400 text-sm">Guides users toward the right choice with concise follow-up questions and product-aware support behavior.</p>
                  </div>
                  <div className="bg-forge-dark border border-forge-ember/20 rounded-lg p-6">
                    <Shield className="text-forge-gold mb-4" size={28} />
                    <h3 className="font-semibold text-white mb-2">Safe support boundaries</h3>
                    <p className="text-gray-400 text-sm">Avoids inventing order status, refund approvals, or exceptions that would violate store policy.</p>
                  </div>
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
                    <p className="text-gray-400 mb-1">Runtime</p>
                    <p className="text-white font-semibold">OpenClaw bot on live secure stage</p>
                  </div>
                </div>
              </div>

              <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8">
                <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-4">Known stage policy answers</h2>
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
