'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import VelouraChatEmbed from '@/components/VelouraChatEmbed'
import { Brain, MessageCircle, Zap, Share2 } from 'lucide-react'
import Link from 'next/link'

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

          {/* Chat area -- hero prominence */}
          <div className="mb-8 min-h-[60vh] flex flex-col">
            <VelouraChatEmbed />
          </div>

          {/* Share Demo + CTA row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Share button */}
            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-6 flex items-center justify-between">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-forge-gold mb-1">Share this demo</h3>
                <p className="text-gray-400 text-sm">Send a colleague a link to this page</p>
              </div>
              <ShareDemoButton />
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-forge-ember/20 to-forge-gold/20 border border-forge-ember/40 rounded-lg p-6 flex items-center justify-between">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-forge-gold mb-1">Build something like this</h3>
                <p className="text-gray-400 text-sm">Branded AI chat for your e-commerce or SaaS product</p>
              </div>
              <Link href="/contact" className="btn-primary whitespace-nowrap">
                Get in Touch →
              </Link>
            </div>
          </div>

          {/* 3 capability cards */}
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

          {/* Demo Profile sidebar */}
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

            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8">
              <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-4">Want this for your brand?</h2>
              <p className="text-gray-400 mb-6 text-sm">
                We build customer-facing AI assistants with clear business boundaries, branded UX, and production-minded integration paths.
              </p>
              <Link href="/ai-consulting" className="btn-primary w-full text-center block mb-3">
                AI Consulting →
              </Link>
              <Link href="/services" className="text-forge-gold text-sm hover:text-forge-ember transition block text-center">
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
