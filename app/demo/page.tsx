import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/components/Hero'
import { ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Live Demos — See What We Build | ForgingApps',
  description:
    'Explore live demos of our work: a full e-commerce storefront and an AI-powered customer support assistant, both built for the fictional brand Veloura.',
  alternates: { canonical: 'https://forgingapps.com/demo' },
  openGraph: {
    title: 'Live Demos — See What We Build | ForgingApps',
    description:
      'Explore live demos: a full e-commerce storefront and an AI customer support assistant.',
    url: 'https://forgingapps.com/demo',
  },
}

const DEMOS = [
  {
    title: 'Veloura Shop',
    slug: '/demo/veloura-shop',
    icon: ShoppingBag,
    image: '/veloura/hero.jpg',
    tagline: 'Full e-commerce experience',
    description:
      'A complete online storefront for a fictional apparel brand. Browse 17 products across 6 categories, filter by size and colour, manage a cart, and walk through checkout — all statically rendered with Next.js.',
    highlights: ['Product catalogue with categories', 'Cart & checkout flow', 'Responsive design', 'Static export — zero backend'],
  },
  {
    title: 'Veloura Support',
    slug: '/demo/veloura-support',
    icon: MessageCircle,
    image: '/og-image.svg',
    tagline: 'AI customer support assistant',
    description:
      "An embedded AI chat widget that answers customer questions about Veloura's shipping, returns, sizing, and products — grounded in real brand policies so it never invents answers.",
    highlights: ['Policy-grounded responses', 'Context-aware conversation', 'Branded embedded widget', 'Instant deployment'],
  },
]

export default function DemoIndexPage() {
  return (
    <>
      <Hero
        headline="See What We Build"
        subheadline="Live demos you can touch. Each one is a real, working product — not a mockup."
        size="small"
        badge="Live Demos"
      />

      <section className="section-py bg-forge-dark border-t border-forge-ember/20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {DEMOS.map((demo) => {
              const Icon = demo.icon
              return (
                <Link
                  key={demo.slug}
                  href={demo.slug}
                  className="group bg-forge-stone border border-forge-ember/30 rounded-lg overflow-hidden hover:border-forge-gold/60 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-56 bg-gray-800 overflow-hidden">
                    <Image
                      src={demo.image}
                      alt={demo.title}
                      fill
                      className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forge-stone to-transparent" />
                    <div className="absolute bottom-4 left-6 flex items-center gap-2">
                      <Icon className="text-forge-gold" size={22} />
                      <span className="text-forge-gold font-cinzel text-xl font-bold">{demo.title}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-forge-gold text-sm font-semibold uppercase tracking-wide mb-2">
                      {demo.tagline}
                    </p>
                    <p className="text-gray-400 text-sm mb-4">{demo.description}</p>
                    <ul className="space-y-1 mb-6">
                      {demo.highlights.map((h) => (
                        <li key={h} className="text-gray-500 text-xs flex items-center gap-2">
                          <span className="text-forge-gold">&#x2713;</span> {h}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1 text-forge-gold text-sm font-semibold group-hover:gap-2 transition-all">
                      Try it live <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Want something like this for your business?</p>
            <Link href="/contact" className="btn-primary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
