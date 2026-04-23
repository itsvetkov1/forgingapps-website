'use client'

import Link from 'next/link'

interface TierCardProps {
  tier: 'starter' | 'complete' | 'advanced'
  popular?: boolean
  locale: 'en' | 'bg'
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

export default function TierCard({ tier, popular, locale, copy }: TierCardProps) {
  return (
    <article className="relative flex flex-col rounded-xl border border-forge-stone/40 bg-forge-dark p-6 shadow-xl">
      {popular && copy.popularLabel && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-forge-ember px-3 py-1 text-xs font-semibold text-white">
          {copy.popularLabel}
        </span>
      )}

      <header className="mb-4">
        <h3 className="text-xl font-bold text-white">{copy.name}</h3>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-forge-gold">{copy.price}</span>
        </div>
        <p className="mt-1 text-sm text-forge-gold/70">{copy.delivery}</p>
        <p className="mt-1 text-sm font-medium text-forge-gold/60">{copy.tagline}</p>
      </header>

      <p className="mb-4 text-sm leading-relaxed text-gray-300">{copy.description}</p>

      <ul className="mb-6 flex-1 space-y-2 text-sm text-gray-300">
        {copy.includes.map((item, i) => {
          const isPlusItem = item.startsWith('Everything in')
          return (
            <li key={i} className={isPlusItem ? 'font-semibold text-white' : ''}>
              {isPlusItem ? (
                <span className="text-forge-ember">{item}</span>
              ) : (
                <>
                  <span className="mr-2 text-forge-gold">—</span>
                  {item}
                </>
              )}
            </li>
          )
        })}
      </ul>

      {copy.afterBundle && (
        <p className="mb-4 border-t border-forge-stone/40 pt-4 text-xs leading-relaxed text-gray-400">
          {copy.afterBundle}
        </p>
      )}

      <Link
        href={`/${locale}/contact?product=ai-chat-assistant&tier=${tier}`}
        className="mt-auto block w-full rounded-lg bg-forge-ember py-3 text-center text-sm font-semibold text-white transition hover:bg-forge-ember/90"
      >
        {copy.cta}
      </Link>
    </article>
  )
}
