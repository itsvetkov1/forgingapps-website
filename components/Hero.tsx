'use client'

import Link from 'next/link'

interface HeroProps {
  headline: string
  subheadline: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  size?: 'full' | 'small'
  badge?: string
}

export default function Hero({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  size = 'full',
  badge,
}: HeroProps) {
  const heightClass = size === 'full' ? 'min-h-screen' : 'min-h-80'

  return (
    <section className={`hero-gradient section-fluent-merge ${heightClass} flex items-center justify-center relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-80 h-80 bg-forge-ember rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-forge-gold rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10 text-center">
        {badge && (
          <div className="mb-4 inline-block">
            <span className="price-discount text-forge-gold bg-forge-gold/10 px-3 py-1">
              {badge}
            </span>
          </div>
        )}

        <h1 className="font-cinzel text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {headline}
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
          {subheadline}
        </p>

        {(primaryCTA || secondaryCTA) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCTA && (
              <Link href={primaryCTA.href} className="btn-primary">
                {primaryCTA.text}
              </Link>
            )}
            {secondaryCTA && (
              <Link href={secondaryCTA.href} className="btn-secondary">
                {secondaryCTA.text}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
