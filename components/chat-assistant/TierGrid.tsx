'use client'

import Link from 'next/link'
import TierCard from './TierCard'

interface TierGridProps {
  locale: 'en' | 'bg'
  starterCopy: TierCardProps['copy']
  completeCopy: TierCardProps['copy']
  advancedCopy: TierCardProps['copy']
  customCopy: {
    name: string
    description: string
    cta: string
  }
}

interface TierCardProps {
  copy: {
    name: string
    price: string
    delivery: string
    tagline: string
    description: string
    includes: string[]
    afterBundle?: string
    cta: string
    popularLabel?: string
  }
}

export default function TierGrid({ locale, starterCopy, completeCopy, advancedCopy, customCopy }: TierGridProps) {
  return (
    <section className="mt-16 grid gap-6 min-[840px]:grid-cols-3">
      <TierCard tier="starter" locale={locale} copy={starterCopy} />
      <TierCard tier="complete" locale={locale} copy={completeCopy} popular />
      <TierCard tier="advanced" locale={locale} copy={advancedCopy} />

      {/* Custom card */}
      <article className="flex flex-col justify-between rounded-xl border border-dashed border-forge-stone/60 bg-forge-dark/50 p-6">
        <div>
          <h3 className="text-lg font-bold text-white">{customCopy.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">{customCopy.description}</p>
        </div>
        <Link
          href={`/${locale}/contact?product=ai-chat-assistant-custom`}
          className="mt-4 block w-full rounded-lg border border-forge-gold/40 py-3 text-center text-sm font-semibold text-forge-gold transition hover:border-forge-gold hover:text-white"
        >
          {customCopy.cta}
        </Link>
      </article>
    </section>
  )
}
