'use client'

import Link from 'next/link'
import TierGrid from '@/components/chat-assistant/TierGrid'
import ModulesTable from '@/components/chat-assistant/ModulesTable'
import CareTiers from '@/components/chat-assistant/CareTiers'
import InfraTrust from '@/components/chat-assistant/InfraTrust'
import ChatFAQ from '@/components/chat-assistant/ChatFAQ'
import { useLanguage } from '@/lib/i18n/useTranslation'

interface AiChatAssistantContentProps {
  locale: 'en' | 'bg'
  copy: any
}

export default function AiChatAssistantContent({ locale, copy }: AiChatAssistantContentProps) {
  const { language } = useLanguage()
  const hero = copy.hero
  const cta = copy.cta

  return (
    <main className="min-h-screen bg-forge-dark pb-24">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-12 text-center">
        <h1 className="text-4xl font-bold text-white lg:text-5xl">{hero.headline}</h1>
        <p className="mt-6 text-lg text-gray-300">{hero.subhead}</p>

        <div className="mt-10 grid gap-6 min-[640px]:grid-cols-3">
          {hero.pillars.map((pillar: any, i: number) => (
            <div key={i} className="rounded-xl border border-forge-stone/40 bg-forge-stone/20 p-5 text-left">
              <h3 className="font-semibold text-white">{pillar.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tier Grid */}
      <section className="mx-auto max-w-5xl px-6">
        <TierGrid
          locale={locale}
          starterCopy={copy.tiers.starter}
          completeCopy={copy.tiers.complete}
          advancedCopy={copy.tiers.advanced}
          customCopy={copy.tiers.custom}
        />
      </section>

      {/* Modules Table */}
      <section className="mx-auto max-w-5xl px-6">
        <ModulesTable copy={copy.modules} />
      </section>

      {/* Care Tiers */}
      <section className="mx-auto max-w-5xl px-6">
        <CareTiers copy={copy.care} />
      </section>

      {/* Infra Trust */}
      <section className="mx-auto max-w-5xl px-6">
        <InfraTrust copy={copy.infra} />
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6">
        <ChatFAQ copy={copy.faq} />
      </section>

      {/* CTA */}
      <section className="mx-auto mt-16 max-w-2xl px-6 text-center">
        <h2 className="text-2xl font-bold text-white">{cta.headline}</h2>
        <p className="mt-4 text-gray-300">{cta.body}</p>
        <Link
          href={`/${locale}/contact?product=ai-chat-assistant`}
          className="mt-8 inline-block rounded-xl bg-forge-ember px-8 py-4 text-lg font-semibold text-white transition hover:bg-forge-ember/90"
        >
          {cta.button}
        </Link>
      </section>
    </main>
  )
}
