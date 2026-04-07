'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle, ShoppingBag } from 'lucide-react'
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
        title: 'Veloura Shop',
        slug: '/demo/veloura-shop',
        image: '/veloura/hero.jpg',
        tagline: 'Full e-commerce experience',
        description: 'A complete online storefront for a fictional apparel brand. Browse 17 products across 6 categories, filter by size and colour, manage a cart, and walk through checkout — all statically rendered with Next.js.',
        highlights: ['Product catalogue with categories', 'Cart & checkout flow', 'Responsive design', 'Static export — zero backend'],
        icon: ShoppingBag,
      },
      {
        title: 'Veloura Support',
        slug: '/demo/veloura-support',
        image: '/og-image.svg',
        tagline: 'AI customer support assistant',
        description: "An embedded AI chat widget that answers customer questions about Veloura's shipping, returns, sizing, and products — grounded in real brand policies so it never invents answers.",
        highlights: ['Policy-grounded responses', 'Context-aware conversation', 'Branded embedded widget', 'Instant deployment'],
        icon: MessageCircle,
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
        title: 'Veloura Shop',
        slug: '/demo/veloura-shop',
        image: '/veloura/hero.jpg',
        tagline: 'Пълно изживяване за електронна търговия',
        description: 'Завършен онлайн магазин за измислена модна марка. Разгледайте 17 продукта в 6 категории, филтрирайте по размер и цвят, управлявайте количка и преминете през checkout flow.',
        highlights: ['Продуктов каталог с категории', 'Количка и процес на поръчка', 'Адаптивен дизайн', 'Статичен експорт без бекенд'],
        icon: ShoppingBag,
      },
      {
        title: 'Veloura Support',
        slug: '/demo/veloura-support',
        image: '/og-image.svg',
        tagline: 'AI асистент за клиентска поддръжка',
        description: 'Вграден AI chat widget, който отговаря на въпроси за доставки, връщания, размери и продукти на Veloura, стъпвайки върху реални правила на бранда.',
        highlights: ['Отговори върху реални правила', 'Контекст в разговора', 'Брандиран embedded widget', 'Бърза интеграция'],
        icon: MessageCircle,
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
                  <div className="relative h-56 bg-gray-800 overflow-hidden">
                    <Image src={demo.image} alt={demo.title} fill className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
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
                    <span className="inline-flex items-center gap-1 text-forge-gold text-sm font-semibold group-hover:gap-2 transition-all">
                      {data.tryLive} <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">{data.ctaPrompt}</p>
            <Link href={localePath('/contact')} className="btn-primary">{data.contact}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
