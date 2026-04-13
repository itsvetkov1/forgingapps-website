'use client'

import Link from 'next/link'
import { ArrowRight, MessageCircle, ShoppingBag, Headset, Search, TrendingUp, Layers3, type LucideIcon } from 'lucide-react'
import DemoPackageCallout from '@/components/DemoPackageCallout'
import { useLanguage } from '@/contexts/LanguageContext'

const outcomeIcons: LucideIcon[] = [Headset, Search, TrendingUp, Layers3]

const demoCopy = {
  en: {
    headline: 'See What We Build',
    subheadline: 'Live demos you can touch. Each one is a working product experience you can explore right now.',
    intro: 'We build live demos instead of static portfolios. Each demo below is a working application that showcases a specific capability.',
    badge: 'Live Demos',
    ctaPrompt: 'Want something like this for your business?',
    contact: 'Get in Touch',
    tryLive: 'Try it live',
    demoLanguageNotice: '',
    bottomIntro: 'Built by the ForgingApps team.',
    bottomMeetUs: 'Meet us',
    bottomHeading: 'Built by a product team that ships real client work',
    bottomDescription: '{data.bottomDescription}',
    bottomProof1Title: 'Live AI agent in a working storefront',
    bottomProof1Desc: 'The support experience is interactive and responds to real product and policy questions in the demo.',
    bottomProof2Title: 'Two-time umlaut Secure App Award winner',
    bottomProof2Desc: 'Security-minded product delivery is part of the team background behind the work you are seeing here.',
    bottomCta: 'Want something like this?',
    outcomesHeading: 'Business outcomes this approach enables',
    outcomes: [
      'Reduced support load, AI assistants handle repeat queries so human agents can focus on complex cases.',
      'Faster product discovery, shoppers find what they need in seconds instead of hunting through pages.',
      'Higher conversion, contextual recommendations help turn browsers into buyers.',
      'Scalable without headcount, one AI integration can serve thousands of users at the same time.',
    ],
    demos: [
      {
        title: 'Veloura Support',
        slug: '/en/demo/veloura-support',
        tagline: 'AI customer support assistant',
        description: "See how we built Veloura Support — a live demo showing how an embedded AI assistant can answer shipping, returns, sizing, and product questions using real brand policies.",
        highlights: ['Policy-grounded responses', 'Context-aware conversation', 'Branded embedded widget', 'Instant deployment'],
        icon: MessageCircle,
        preview: 'support',
        packageTitle: 'AI Chat Assistant — €2,500 flat',
        packageRationale: 'A custom AI assistant trained on your content, embedded in your website. Fixed scope, fixed price, deployed in 2 weeks.',
        packageHref: '/en/ai-consulting#ai-chat-assistant',
      },
      {
        title: 'Veloura Shop',
        slug: '/en/demo/veloura-shop',
        tagline: 'Full e-commerce experience',
        description: 'See how we built Veloura Shop — a live demo showing a complete storefront experience with 17 products, 6 categories, cart flow, and checkout in one polished journey.',
        highlights: ['Product catalogue with categories', 'Cart & checkout flow', 'Responsive design', 'Static export — zero backend'],
        icon: ShoppingBag,
        preview: 'shop',
        packageTitle: 'The Anvil or The Forge',
        packageRationale: 'Best fit for a full storefront with catalog, cart, checkout, and integrated support layered into one production-minded product experience.',
        packageHref: '/en/services#anvil',
      },
    ],
  },
  bg: {
    headline: 'Вижте какво изграждаме',
    subheadline: 'Живи демота, които можете да използвате. Всяко е реален работещ продукт, не макет.',
    intro: 'Изграждаме живи демота вместо статично портфолио. Всяко демо по-долу е работещо приложение, което показва конкретна способност.',
    badge: 'Живи демота',
    ctaPrompt: 'Искате нещо подобно за Вашия бизнес?',
    contact: 'Свържете се с нас',
    tryLive: 'Пробвайте демото',
    demoLanguageNotice: 'Демотата са на английски, защото симулират международни продуктови изживявания.',
    bottomIntro: 'Изградено от екипа на ForgingApps.',
    bottomMeetUs: 'Запознайте се с нас',
    bottomHeading: 'Изградено от продуктов екип, който доставя реални клиентски проекти',
    bottomDescription: 'Тези демота са изградени от ForgingApps, за да покажат как изглеждат полирани AI-подпомогнати продуктови изживявания на практика.',
    bottomProof1Title: 'Жив AI агент в работещ магазин',
    bottomProof1Desc: 'Поддръжката е интерактивна и отговаря на реални въпроси за продукти и политики в демото.',
    bottomProof2Title: 'Двукратен носител на umlaut Secure App Award',
    bottomProof2Desc: 'Сигурността е част от фона на екипа, който стои зад това, което виждате тук.',
    bottomCta: 'Искате нещо подобно?',
    outcomesHeading: 'Бизнес резултати, които този подход позволява',
    outcomes: [
      'По-малко натоварване за support екипа, AI поема повтарящите се въпроси и оставя сложните случаи на хората.',
      'По-бързо откриване на продукти, клиентите намират нужното за секунди, не за минути.',
      'По-висока конверсия, контекстни препоръки превръщат разглеждащите в купувачи.',
      'Мащабиране без нов headcount, една AI интеграция обслужва хиляди потребители едновременно.',
    ],
    demos: [
      {
        title: 'Veloura Support',
        slug: '/bg/demo/veloura-support',
        tagline: 'AI асистент за клиентска поддръжка',
        description: 'Вижте как изградихме Veloura Support — живо демо, което показва как вграден AI асистент отговаря на въпроси за доставки, връщания, размери и продукти по реални правила на бранда.',
        highlights: ['Отговори върху реални правила', 'Контекст в разговора', 'Брандиран embedded widget', 'Бърза интеграция'],
        icon: MessageCircle,
        preview: 'support',
        packageTitle: 'AI Chat Assistant — €2,500 фиксирано',
        packageRationale: 'Персонализиран AI асистент, обучен на вашата информация, вграден във вашия уебсайт. Фиксирана обхват, фиксирана цена, внедрен за 2 седмици.',
        packageHref: '/bg/ai-consulting#ai-chat-assistant',
      },
      {
        title: 'Veloura Shop',
        slug: '/bg/demo/veloura-shop',
        tagline: 'Пълно изживяване за електронна търговия',
        description: 'Вижте как изградихме Veloura Shop — живо демо, което показва завършен storefront с 17 продукта, 6 категории, количка и checkout flow в една цялостна среда.',
        highlights: ['Продуктов каталог с категории', 'Количка и процес на поръчка', 'Адаптивен дизайн', 'Статичен експорт без бекенд'],
        icon: ShoppingBag,
        preview: 'shop',
        packageTitle: 'The Anvil or The Forge',
        packageRationale: 'Подходящо за пълен storefront с каталог, количка, checkout и интегрирана поддръжка в една завършена продуктова среда.',
        packageHref: '/bg/services#anvil',
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
          <p className="text-xl text-gray-300 mb-4">{data.subheadline}</p>
          <p className="max-w-3xl mx-auto text-sm leading-7 text-gray-400">{data.intro}</p>
          {data.demoLanguageNotice && (
            <p className="mt-3 max-w-3xl mx-auto text-xs leading-5 text-gray-500 italic">{data.demoLanguageNotice}</p>
          )}
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
                      <DemoPackageCallout title={demo.packageTitle} rationale={demo.packageRationale} theme="dark" href={demo.packageHref} />
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
            <div className="mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-forge-gold/70">Business outcomes</p>
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold">{data.outcomesHeading}</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {data.outcomes.map((outcome, index) => {
                const OutcomeIcon: LucideIcon = outcomeIcons[index] ?? Headset
                return (
                  <div key={outcome} className="rounded-xl border border-forge-ember/20 bg-forge-dark/60 p-5">
                    <OutcomeIcon className="mb-4 text-forge-gold" size={24} />
                    <p className="text-sm leading-6 text-gray-300">{outcome}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-forge-ember/30 bg-forge-stone p-8">
            <div className="mb-6 text-sm leading-7 text-gray-400">
              {data.bottomIntro}{' '}
              <Link href={localePath('/about')} className="text-forge-gold hover:text-forge-ember transition-colors underline underline-offset-4">
                Meet us
              </Link>
              .
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-forge-gold/70">ForgingApps</p>
                <h2 className="mb-3 font-cinzel text-3xl font-bold text-forge-gold">{data.bottomHeading}</h2>
                <p className="max-w-2xl text-sm leading-7 text-gray-300">
                  These demos are built by ForgingApps to show what polished AI-assisted product experiences can look like in practice, from storefront UX to embedded support flows.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-xl border border-forge-ember/20 bg-forge-dark/60 p-4">
                  <p className="text-sm font-semibold text-white">{data.bottomProof1Title}</p>
                  <p className="mt-1 text-xs leading-6 text-gray-400">{data.bottomProof1Desc}
                  </p>
                </div>
                <div className="rounded-xl border border-forge-ember/20 bg-forge-dark/60 p-4">
                  <p className="text-sm font-semibold text-white">{data.bottomProof2Title}</p>
                  <p className="mt-1 text-xs leading-6 text-gray-400">{data.bottomProof2Desc}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-forge-ember/20 pt-6 sm:flex-row sm:items-center">
              <p className="text-sm text-gray-400">{data.ctaPrompt}</p>
              <Link href={localePath('/contact')} className="btn-primary">{data.bottomCta}</Link>
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
    { name: 'Heavyweight Hoodie', price: '€89', swatch: 'from-[#2c2b31] to-[#4a4852]' },
    { name: 'Relaxed Tee', price: '€34', swatch: 'from-[#cab08b] to-[#8c6b45]' },
    { name: 'Canvas Tote', price: '€29', swatch: 'from-[#b85b34] to-[#6a2f1b]' },
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
