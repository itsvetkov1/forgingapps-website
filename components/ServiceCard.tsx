'use client'

import Link from 'next/link'
import React from 'react'

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  tier?: string
  description: string
  outcome?: string
  regularPrice?: string
  launchPrice: string
  badge?: string
  href?: string
  ctaLabel?: string
}

export default function ServiceCard({
  icon,
  title,
  tier,
  description,
  outcome,
  regularPrice,
  launchPrice,
  badge,
  href = '/services',
  ctaLabel = 'Learn More →',
}: ServiceCardProps) {
  const hasRegularPrice = Boolean(regularPrice && regularPrice.trim())

  return (
    <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-6 hover:border-forge-ember/60 card-hover transition-all">
      {badge && (
        <div className="mb-3 inline-block">
          <span className="price-discount bg-forge-ember/20 text-forge-ember px-2 py-1 rounded text-xs font-semibold">
            {badge}
          </span>
        </div>
      )}

      <div className="mb-4 text-forge-gold">{icon}</div>

      <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-1">{title}</h3>

      {tier && <p className="text-xs text-gray-400 mb-3">{tier}</p>}
      {outcome && <p className="text-sm text-forge-ember font-semibold mb-3">{outcome}</p>}

      <p className="text-gray-400 text-sm mb-4">{description}</p>

      <div className="mb-6">
        {hasRegularPrice ? <div className="price-regular text-sm">{regularPrice}</div> : null}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="price-current">{launchPrice}</span>
          {hasRegularPrice ? <span className="price-discount text-forge-ember">Launch Discount</span> : null}
        </div>
      </div>

      <Link href={href} className="inline-block text-forge-gold hover:text-forge-ember transition font-semibold text-sm">
        {ctaLabel}
      </Link>
    </div>
  )
}
