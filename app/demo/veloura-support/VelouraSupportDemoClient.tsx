'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import VelouraChatEmbed from '@/components/VelouraChatEmbed'
import { Brain, MessageCircle, Zap, Share2 } from 'lucide-react'
import Link from 'next/link'
import DemoTechStrip from '@/components/DemoTechStrip'
import DemoPackageCallout from '@/components/DemoPackageCallout'

const CAPABILITY_CARDS = [
  {
    icon: Brain,
    title: 'Real-time Problem Solving',
    description: 'Responds instantly to complex customer questions with policy-grounded answers -- no waiting, no hold music.',
  },
  {
    icon: MessageCircle,
    title: 'Context-Aware Conversations',
    description: 'Remembers what the customer asked earlier in the session. Follow-up questions feel natural, not repetitive.',
  },
  {
    icon: Zap,
    title: 'Immediately Deployable',
    description: 'Production-minded integration that fits your existing website. Launch in days, not months.',
  },
]

const EXAMPLE_EXCHANGES = [
  {
    label: 'Shipping policy',
    user: 'How long does EU shipping take?',
    assistant: 'Standard EU shipping takes 3–5 business days, and express EU shipping takes 1–2 business days. Is there anything else I can help you with?',
  },
  {
    label: 'Returns policy',
    user: "I want to return something. What's the policy?",
    assistant: 'Returns are accepted within 30 days of delivery if the item is unworn, unwashed, and has its original tags attached. You can start the process through our returns page. Anything else I can help you with?',
  },
  {
    label: 'Sizing guidance',
    user: 'I am between two sizes. What do you recommend?',
    assistant: "If you're between sizes, we generally recommend sizing up for a relaxed fit or sizing down for something more fitted. Our size guide has measurements for each item — want me to help you find the right one?",
  },
]

const HOW_IT_WORKS_STEPS = [
  {
    number: '1',
    title: 'Share your policies and brand voice',
    description: 'You provide your FAQs, support docs, and tone guidelines. We train the assistant on your actual content — nothing generic.',
  },
  {
    number: '2',
    title: 'We build and configure your assistant',
    description: 'We define its knowledge boundaries, embed it in your site, and test it against real edge cases before anything goes live.',
  },
  {
    number: '3',
    title: 'It answers instantly, around the clock',
    description: 'The assistant handles common questions 24/7. Complex issues are routed to your team cleanly, without dead ends.',
  },
]

export default function VelouraSupportDemoClient() {
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

          <div className="mb-8">
            <DemoPackageCallout
              title="The Ember (EUR3,000+) or The Anvil (EUR5,000-15,000)"
              rationale="This demo maps best to an AI-integrated web product: Ember for a focused assistant rollout, or Anvil when the support experience needs deeper product integration."
              theme="dark"
            />
          </div>

          <div className="mb-8 min-h-[60vh] flex flex-col">
            <VelouraChatEmbed />
          </div>

          <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8 mb-8">
            <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-2">See It in Action</h2>
            <p className="text-gray-400 text-sm mb-6">Three common support moments, shown the way a branded assistant would handle them inside an actual store experience.</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {EXAMPLE_EXCHANGES.map((exchange) => (
                <div key={exchange.label} className="rounded-lg border border-forge-ember/20 bg-forge-dark/60 p-5">
                  <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-gray-500">{exchange.label}</p>
                  <div className="space-y-3">
                    <div className="flex justify-start">
                      <div className="max-w-[92%] rounded-2xl border border-forge-ember/20 bg-forge-dark px-4 py-3 text-sm leading-6 text-gray-200">
                        {exchange.assistant}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="max-w-[88%] rounded-2xl bg-forge-ember px-4 py-3 text-sm leading-6 text-white">
                        {exchange.user}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8 mb-8">
            <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HOW_IT_WORKS_STEPS.map((step) => (
                <div key={step.number} className="rounded-lg border border-forge-ember/20 bg-forge-dark/50 p-6">
                  <div className="text-4xl font-cinzel font-bold text-forge-ember mb-4">{step.number}</div>
                  <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-6">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <DemoTechStrip theme="dark" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-6 flex items-center justify-between">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-forge-gold mb-1">Share this demo</h3>
                <p className="text-gray-400 text-sm">Send a colleague a link to this page</p>
              </div>
              <ShareDemoButton />
            </div>

            <div className="bg-gradient-to-r from-forge-ember/20 to-forge-gold/20 border border-forge-ember/40 rounded-lg p-6 flex items-center justify-between">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-forge-gold mb-1">Build something like this</h3>
                <p className="text-gray-400 text-sm">Branded AI chat for your e-commerce or SaaS product</p>
              </div>
              <Link href="/en/contact" className="btn-primary whitespace-nowrap">
                Get in Touch →
              </Link>
            </div>
          </div>

          <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8 mb-8">
            <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-6">What this demo proves</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CAPABILITY_CARDS.map((card) => {
                const Icon = card.icon
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

            <Link href="/en/demo/veloura-shop" className="block bg-forge-stone border border-forge-ember/30 rounded-lg p-8 hover:border-forge-gold/60 transition-all duration-300 group">
              <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-4">Browse the Veloura Shop</h2>
              <p className="text-gray-400 mb-4 text-sm">
                See the full e-commerce storefront we built for this fictional brand — 17 products, 6 categories, cart, and checkout.
              </p>
              <span className="text-forge-gold text-sm font-semibold group-hover:underline">
                Open the shop demo →
              </span>
            </Link>

            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8">
              <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-4">Want this for your brand?</h2>
              <p className="text-gray-400 mb-6 text-sm">
                We build customer-facing AI assistants with clear business boundaries, branded UX, and production-minded integration paths.
              </p>
              <Link href="/en/ai-consulting" className="btn-primary w-full text-center block mb-3">
                AI Consulting →
              </Link>
              <Link href="/en/services" className="text-forge-gold text-sm hover:text-forge-ember transition block text-center">
                View all services →
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

function ShareDemoButton() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback silently
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-2 bg-forge-ember/20 border border-forge-ember/40 text-forge-gold px-4 py-2 rounded-lg hover:bg-forge-ember/30 transition text-sm font-semibold"
    >
      <Share2 size={16} />
      {copied ? 'Copied!' : 'Copy Link'}
    </button>
  )
}
