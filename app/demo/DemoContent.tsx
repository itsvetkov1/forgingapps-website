'use client'

import Link from 'next/link'
import { ArrowRight, MessageCircle, ShoppingBag } from 'lucide-react'
import DemoPackageCallout from '@/components/DemoPackageCallout'
import { useLanguage } from '@/contexts/LanguageContext'

const demoCopy = {
  en: {
    headline: 'See What We Build',
    subheadline: 'Live demos you can touch. Each one is a real, working product — not a mockup.',
    badge: 'Live Demos',
    ctaPrompt: 'Want something like this for your business?',
    contact: 'Get in Touch',
    tryLive: 'Try it live',
    demos: [
      {
        title: 'Veloura Support',
        slug: '/en/demo/veloura-support',
        tagline: 'AI customer support assistant',
        description: "An embedded AI chat widget that answers customer questions about Veloura's shipping, returns, sizing, and products — grounded in real brand policies so it never invents answers.",
        highlights: ['Policy-grounded responses', 'Context-aware conversation', 'Branded embedded widget', 'Instant deployment'],
        icon: MessageCircle,
        preview: 'support',
        packageTitle: 'The Ember (EUR3,000+) or The Anvil (EUR5,000-15,000)',
        packageRationale: 'Best fit for an AI-integrated web product where branded support flows, policy grounding, and guided user experience matter.',
      },
      {
        title: 'Veloura Shop',
        slug: '/en/demo/veloura-shop',
        tagline: 'Full e-commerce experience',
        description: 'A complete online storefront for a fictional apparel brand. Browse 17 products across 6 categories, filter by size and colour, manage a cart, and walk through checkout — all statically rendered with Next.js.',
        highlights: ['Product catalogue with categories', 'Cart & checkout flow', 'Responsive design', 'Static export — zero backend'],
        icon: ShoppingBag,
        preview: 'shop',
        packageTitle: 'The Anvil or The Forge',
        packageRationale: 'Best fit for a full storefront with catalog, cart, checkout, and integrated support layered into one production-minded product experience.',
      },
    ],
  },
  bg: {
    headline: 'Вижте какво изграждаме',
    subheadline: 'Живи демота, които можете да използвате. Всяко е реален работещ продукт, не макет.',
    badge: 'Живи демота',
    ctaPrompt: 'Искате нещо подобно за Вашия бизнес?',
    contact: 'Свържете се с нас',
    tryLive: 'Пробвайте демото',
    demos: [
      {
        title: 'Veloura Support',
        slug: '/bg/demo/veloura-support',
        tagline: 'AI асистент за клиентска поддръжка',
        description: 'Вграден AI chat widget, който отговаря на въпроси за доставки, връщания, размери и продукти на Veloura, стъпвайки върху реални правила на бранда.',
        highlights: ['Отговори върху реални правила', 'Контекст в разговора', 'Брандиран embedded widget', 'Бърза интеграция'],
        icon: MessageCircle,
        preview: 'support',
        packageTitle: 'The Ember or The Anvil',
        packageRationale: 'Подходящо за AI-интегриран уеб продукт с брандирана поддръжка и насочено потребителско изживяване.',
      },
      {
        title: 'Veloura Shop',
        slug: '/bg/demo/veloura-shop',
        tagline: 'Пълно изживяване за електронна търговия',
        description: 'Завършен онлайн магазин за измислена модна марка. Разгледайте 17 продукта в 6 категории, филтрирайте по размер и цвят, управлявайте количка и преминете през checkout flow.',
        highlights: ['Продуктов каталог с категории', 'Количка и процес на поръчка', 'Адаптивен дизайн', 'Статичен експорт без бекенд'],
        icon: ShoppingBag,
        preview: 'shop',
        packageTitle: 'The Anvil or The Forge',
        packageRationale: 'Подходящо за пълен storefront с каталог, количка, checkout и интегрирана поддръжка в една завършена продуктова среда.',
      },
    ],
  },
}

export default function DemoContent() {
  const { language, localePath } = useLanguage()
  const data = demoCopy[language]

  return (
    <>
      <section className="section-py bg-forge-dark border-t border-forge-ember/20">
        <div className="container-custom max-w-4xl text-center">
          <span className="inline-block bg-forge-ember/20 text-forge-ember px-3 py-1 rounded text-sm font-semibold mb-4">{data.badge}</span>
          <h1 className="font-cinzel text-5xl font-bold text-forge-gold mb-4">{data.headline}</h1>
          <p className="text-xl text-gray-300">{data.subheadline}</p>
        </div>
      </section>

      <section className="section-py bg-forge-dark border-t border-forge-ember/20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.demos.map((demo) => {
              const Icon = demo.icon
              return (
                <Link key={demo.slug} href={demo.slug} className="group bg-forge-stone border border-forge-ember/30 rounded-lg overflow-hidden hover:border-forge-gold/60 transition-all duration-300">
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-forge-dark via-[#1a1716] to-forge-stone">
                    {demo.preview === 'support' ? <VelouraSupportPreview /> : <VelouraShopPreview />}
                    <div className="absolute inset-0 bg-gradient-to-t from-forge-stone to-transparent" />
                    <div className="absolute bottom-4 left-6 flex items-center gap-2">
                      <Icon className="text-forge-gold" size={22} />
                      <span className="text-forge-gold font-cinzel text-xl font-bold">{demo.title}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-forge-gold text-sm font-semibold uppercase tracking-wide mb-2">{demo.tagline}</p>
                    <p className="text-gray-400 text-sm mb-4">{demo.description}</p>
                    <ul className="space-y-1 mb-6">
                      {demo.highlights.map((highlight) => (
                        <li key={highlight} className="text-gray-500 text-xs flex items-center gap-2">
                          <span className="text-forge-gold">&#x2713;</span> {highlight}
                        </li>
                      ))}
                    </ul>
                    <div className="mb-6">
                      <DemoPackageCallout title={demo.packageTitle} rationale={demo.packageRationale} theme="dark" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-forge-gold text-sm font-semibold group-hover:gap-2 transition-all">
                      {data.tryLive} <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="mt-12 rounded-2xl border border-forge-ember/30 bg-forge-stone p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-forge-gold/70">ForgingApps</p>
                <h2 className="mb-3 font-cinzel text-3xl font-bold text-forge-gold">Built by a product team that ships real client work</h2>
                <p className="max-w-2xl text-sm leading-7 text-gray-300">
                  These demos are built by ForgingApps to show what polished AI-assisted product experiences can look like in practice, from storefront UX to embedded support flows.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-xl border border-forge-ember/20 bg-forge-dark/60 p-4">
                  <p className="text-sm font-semibold text-white">Live AI agent, not a mockup</p>
                  <p className="mt-1 text-xs leading-6 text-gray-400">The support experience is interactive and responds to real product and policy questions in the demo.
                  </p>
                </div>
                <div className="rounded-xl border border-forge-ember/20 bg-forge-dark/60 p-4">
                  <p className="text-sm font-semibold text-white">Two-time Umlaut Secure App Award winner</p>
                  <p className="mt-1 text-xs leading-6 text-gray-400">Security-minded product delivery is part of the team background behind the work you are seeing here.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-forge-ember/20 pt-6 sm:flex-row sm:items-center">
              <p className="text-sm text-gray-400">{data.ctaPrompt}</p>
              <Link href={localePath('/contact')} className="btn-primary">Want something like this?</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function VelouraSupportPreview() {
  return (
    <div className="absolute inset-0 p-5">
      <div className="h-full rounded-2xl border border-forge-ember/20 bg-forge-dark/95 p-4 shadow-[0_0_0_1px_rgba(255,184,77,0.04)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-forge-gold/70">Veloura Support</p>
            <p className="text-xs text-gray-500">AI customer support snapshot</p>
          </div>
          <span className="rounded-full border border-forge-ember/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-gray-400">
            Live demo
          </span>
        </div>

        <div className="space-y-3">
          <div className="max-w-[88%] rounded-2xl border border-forge-ember/20 bg-[#23201e] px-4 py-3 text-sm leading-5 text-gray-200">
            The Heavyweight Hoodie comes in XS, S, M, L, XL, and XXL. Available now: XS to L.
          </div>
          <div className="flex justify-end">
            <div className="max-w-[82%] rounded-2xl bg-forge-ember px-4 py-3 text-sm leading-5 text-white shadow-lg shadow-forge-ember/10">
              What sizes does the Heavyweight Hoodie come in?
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function VelouraShopPreview() {
  const products = [
    { name: 'Heavyweight Hoodie', price: 'EUR 89', swatch: 'from-[#2c2b31] to-[#4a4852]' },
    { name: 'Relaxed Tee', price: 'EUR 34', swatch: 'from-[#cab08b] to-[#8c6b45]' },
    { name: 'Canvas Tote', price: 'EUR 29', swatch: 'from-[#b85b34] to-[#6a2f1b]' },
  ]

  return (
    <div className="absolute inset-0 p-5">
      <div className="h-full rounded-2xl border border-forge-ember/20 bg-[#141211]/95 p-4 shadow-[0_0_0_1px_rgba(255,184,77,0.04)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-forge-gold/70">Veloura Shop</p>
            <p className="text-xs text-gray-500">Static storefront preview</p>
          </div>
          <span className="rounded-full border border-forge-ember/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-gray-400">
            17 products
          </span>
        </div>

        <div className="grid h-[calc(100%-3.25rem)] grid-cols-3 gap-3">
          {products.map((product) => (
            <div key={product.name} className="overflow-hidden rounded-xl border border-forge-ember/15 bg-black/20">
              <div className={`h-20 bg-gradient-to-br ${product.swatch}`} />
              <div className="p-3">
                <p className="mb-1 line-clamp-2 text-xs font-medium text-white">{product.name}</p>
                <div className="mb-2 flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-forge-ember/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-forge-gold/70" />
                </div>
                <p className="text-xs font-semibold text-forge-gold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
